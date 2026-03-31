"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Star, Loader2, CheckCircle2, Sparkles, ArrowLeft, Video, Upload, Square, Play, Trash2, PenLine } from "lucide-react";

interface CollectFormProps {
  formId: string;
  accentColor: string;
  thankYouMessage?: string | null;
  autoApprove?: boolean;
  companyName?: string | null;
  allowVideo?: boolean;
}

interface FollowUpQuestion {
  question: string;
  why: string;
}

type FormStep = "write" | "questions" | "enhanced" | "submitted";
type ReviewMode = "text" | "video";
type VideoState = "idle" | "requesting" | "ready" | "recording" | "recorded" | "uploading" | "uploaded" | "error";

export function CollectForm({ formId, accentColor, thankYouMessage, autoApprove, companyName, allowVideo = true }: CollectFormProps) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // AI enhancement state
  const [step, setStep] = useState<FormStep>("write");
  const [enhancing, setEnhancing] = useState(false);
  const [questions, setQuestions] = useState<FollowUpQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [enhancedReview, setEnhancedReview] = useState("");
  const [improvements, setImprovements] = useState<string[]>([]);
  const [useEnhanced, setUseEnhanced] = useState(false);

  // Review mode (text vs video)
  const [reviewMode, setReviewMode] = useState<ReviewMode>("text");

  // Video state
  const [videoState, setVideoState] = useState<VideoState>("idle");
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_RECORDING_SECONDS = 120; // 2 minutes
  const MAX_FILE_SIZE_MB = 100;

  // Cleanup camera on unmount or mode switch
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [stopCamera, videoUrl]);

  // Start camera
  const startCamera = async () => {
    setVideoState("requesting");
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setVideoState("ready");
    } catch {
      setError("Could not access camera. Please check your permissions.");
      setVideoState("error");
    }
  };

  // Start recording
  const startRecording = () => {
    if (!streamRef.current) return;
    chunksRef.current = [];
    setRecordingTime(0);

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
      ? "video/webm;codecs=vp9,opus"
      : MediaRecorder.isTypeSupported("video/webm")
        ? "video/webm"
        : "video/mp4";

    const recorder = new MediaRecorder(streamRef.current, { mimeType });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      setVideoBlob(blob);
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setVideoState("recorded");
      stopCamera();
    };

    recorder.start(1000);
    setVideoState("recording");

    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= MAX_RECORDING_SECONDS - 1) {
          stopRecording();
          return MAX_RECORDING_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Handle file upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`Video must be under ${MAX_FILE_SIZE_MB}MB. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.`);
      return;
    }

    setError("");
    setVideoBlob(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setVideoState("recorded");
  };

  // Discard video
  const discardVideo = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoBlob(null);
    setVideoUrl(null);
    setUploadedVideoUrl(null);
    setVideoState("idle");
    setRecordingTime(0);
    setUploadProgress(0);
  };

  // Upload video to Supabase
  const uploadVideo = async (): Promise<string | null> => {
    if (!videoBlob) return null;
    if (uploadedVideoUrl) return uploadedVideoUrl;

    setVideoState("uploading");
    setUploadProgress(0);

    try {
      const formData = new FormData();
      const extension = videoBlob.type.includes("webm") ? "webm" : "mp4";
      formData.append("video", videoBlob, `testimonial.${extension}`);
      formData.append("formId", formId);

      // Simulate progress (since fetch doesn't support upload progress natively)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 8, 90));
      }, 200);

      const res = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      setUploadProgress(100);
      setUploadedVideoUrl(data.url);
      setVideoState("uploaded");
      return data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Video upload failed.");
      setVideoState("recorded");
      setUploadProgress(0);
      return null;
    }
  };

  // Format timer
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleEnhance = async () => {
    if (review.trim().length < 10) {
      setError("Please write at least 10 characters before enhancing.");
      return;
    }
    setError("");
    setEnhancing(true);
    try {
      const res = await fetch("/api/enhance-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "questions", reviewText: review }),
      });
      if (!res.ok) throw new Error("Failed to analyze review");
      const data = await res.json();
      setQuestions(data.questions || []);
      setStep("questions");
    } catch {
      setError("AI enhancement is temporarily unavailable. You can still submit your review.");
    } finally {
      setEnhancing(false);
    }
  };

  const handleGetEnhanced = async () => {
    const answeredQuestions = questions.map((q, i) => ({
      question: q.question,
      answer: answers[i] || "",
    })).filter((a) => a.answer.trim());

    if (answeredQuestions.length === 0) {
      setError("Please answer at least one question.");
      return;
    }

    setError("");
    setEnhancing(true);
    try {
      const res = await fetch("/api/enhance-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "enhance",
          reviewText: review,
          answers: answeredQuestions,
        }),
      });
      if (!res.ok) throw new Error("Failed to enhance review");
      const data = await res.json();
      setEnhancedReview(data.enhanced);
      setImprovements(data.improvements || []);
      setUseEnhanced(true);
      setStep("enhanced");
    } catch {
      setError("Enhancement failed. You can still submit your original review.");
      setStep("write");
    } finally {
      setEnhancing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (reviewMode === "text" && !review.trim()) {
      setError("Review text is required.");
      return;
    }

    if (reviewMode === "video" && !videoBlob) {
      setError("Please record or upload a video.");
      return;
    }

    setLoading(true);

    try {
      let finalVideoUrl: string | null = null;

      // Upload video if in video mode
      if (reviewMode === "video" && videoBlob) {
        finalVideoUrl = await uploadVideo();
        if (!finalVideoUrl) {
          setLoading(false);
          return;
        }
      }

      const finalReview = reviewMode === "video"
        ? (review.trim() || "Video testimonial")
        : (useEnhanced && enhancedReview ? enhancedReview : review);

      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          reviewerName: name.trim(),
          reviewerTitle: title.trim() || null,
          reviewerCompany: company.trim() || null,
          reviewText: finalReview.trim(),
          rating,
          videoUrl: finalVideoUrl,
          submissionType: reviewMode,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit");
      }

      setStep("submitted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "submitted") {
    return (
      <div className="rounded-xl bg-white border border-slate-200 p-8 text-center">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: accentColor }} />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Thank you!</h2>
        <p className="text-sm text-slate-500">
          {thankYouMessage || (
            autoApprove
              ? "Your review is now live! Thank you for sharing your experience."
              : "Your review has been submitted and is pending approval. We appreciate your feedback!"
          )}
        </p>
        {companyName && (
          <p className="text-xs text-slate-400 mt-3">
            — The {companyName} team
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-slate-200 p-6 space-y-5">
      {/* Rating */}
      <div className="text-center">
        <p className="text-sm font-medium text-slate-700 mb-2">How would you rate your experience?</p>
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              onMouseEnter={() => setHoveredStar(s)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className="w-7 h-7"
                fill={(hoveredStar || rating) >= s ? "#FBBF24" : "none"}
                stroke={(hoveredStar || rating) >= s ? "#FBBF24" : "#CBD5E1"}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mode tabs */}
      {allowVideo && (
        <div className="flex rounded-lg border border-slate-200 p-1 bg-slate-50">
          <button
            type="button"
            onClick={() => setReviewMode("text")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              reviewMode === "text"
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <PenLine className="w-4 h-4" />
            Written Review
          </button>
          <button
            type="button"
            onClick={() => setReviewMode("video")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              reviewMode === "video"
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Video className="w-4 h-4" />
            Video Review
          </button>
        </div>
      )}

      {/* TEXT MODE */}
      {reviewMode === "text" && (
        <>
          {/* Review text */}
          {step === "write" && (
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-slate-700 mb-1.5">
                Your review <span className="text-red-400">*</span>
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
              />
              {review.trim().length >= 10 && (
                <button
                  type="button"
                  onClick={handleEnhance}
                  disabled={enhancing}
                  className="mt-2 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    color: accentColor,
                    backgroundColor: `${accentColor}10`,
                    border: `1px solid ${accentColor}30`,
                  }}
                >
                  {enhancing ? (
                    <><Loader2 className="w-3 h-3 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Sparkles className="w-3 h-3" /> Enhance with AI</>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Follow-up questions */}
          {step === "questions" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-sm font-semibold text-slate-900">Help us make your review even better</span>
              </div>
              <p className="text-xs text-slate-500">
                Answer these quick questions so AI can enhance your review with more detail.
              </p>
              {questions.map((q, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{q.question}</label>
                  <input
                    type="text"
                    value={answers[i] || ""}
                    onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                    placeholder="Your answer..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent"
                  />
                </div>
              ))}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("write")}
                  className="flex items-center gap-1 px-3 py-2 text-xs text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleGetEnhanced}
                  disabled={enhancing}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white rounded-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  {enhancing ? (
                    <><Loader2 className="w-3 h-3 animate-spin" /> Enhancing...</>
                  ) : (
                    <><Sparkles className="w-3 h-3" /> Enhance my review</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Enhanced review comparison */}
          {step === "enhanced" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-sm font-semibold text-slate-900">AI-Enhanced Version</span>
              </div>

              {improvements.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {improvements.map((imp, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      + {imp}
                    </span>
                  ))}
                </div>
              )}

              <div className="rounded-lg border-2 p-3 text-sm text-slate-700 leading-relaxed" style={{ borderColor: accentColor, backgroundColor: `${accentColor}05` }}>
                {enhancedReview}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setUseEnhanced(false); setStep("write"); }}
                  className="flex items-center gap-1 px-3 py-2 text-xs text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Use original instead
                </button>
                <button
                  type="button"
                  onClick={() => setUseEnhanced(true)}
                  className="flex-1 px-3 py-2 text-xs font-medium text-white rounded-lg"
                  style={{ backgroundColor: accentColor, opacity: useEnhanced ? 1 : 0.7 }}
                >
                  {useEnhanced ? "Using enhanced version" : "Use this version"}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* VIDEO MODE */}
      {reviewMode === "video" && (
        <div className="space-y-3">
          {/* Idle state - show record and upload options */}
          {videoState === "idle" && (
            <div className="space-y-3">
              <p className="text-sm text-slate-500 text-center">
                Record a video testimonial or upload an existing one.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex-1 flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}15` }}
                  >
                    <Video className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Record Video</span>
                  <span className="text-xs text-slate-400">Max 2 minutes</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-slate-500" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Upload Video</span>
                  <span className="text-xs text-slate-400">MP4, WebM, MOV</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {/* Requesting camera */}
          {videoState === "requesting" && (
            <div className="flex flex-col items-center gap-3 py-8">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
              <p className="text-sm text-slate-500">Requesting camera access...</p>
            </div>
          )}

          {/* Camera ready / recording */}
          {(videoState === "ready" || videoState === "recording") && (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover mirror"
                  style={{ transform: "scaleX(-1)" }}
                />
                {/* Recording indicator */}
                {videoState === "recording" && (
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-500/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    REC {formatTime(recordingTime)}
                  </div>
                )}
                {/* Time remaining */}
                {videoState === "recording" && (
                  <div className="absolute top-3 right-3 text-white/80 text-xs bg-black/50 px-2 py-1 rounded-full">
                    {formatTime(MAX_RECORDING_SECONDS - recordingTime)} left
                  </div>
                )}
              </div>

              {/* Recording progress bar */}
              {videoState === "recording" && (
                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-1000 ease-linear"
                    style={{ width: `${(recordingTime / MAX_RECORDING_SECONDS) * 100}%` }}
                  />
                </div>
              )}

              <div className="flex justify-center gap-3">
                {videoState === "ready" && (
                  <>
                    <button
                      type="button"
                      onClick={() => { stopCamera(); setVideoState("idle"); }}
                      className="px-4 py-2 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={startRecording}
                      className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white rounded-lg"
                      style={{ backgroundColor: "#EF4444" }}
                    >
                      <span className="w-3 h-3 rounded-full bg-white" />
                      Start Recording
                    </button>
                  </>
                )}
                {videoState === "recording" && (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    <Square className="w-3 h-3 fill-white" />
                    Stop Recording
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Video recorded / preview */}
          {(videoState === "recorded" || videoState === "uploaded") && videoUrl && (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                <video
                  ref={previewRef}
                  src={videoUrl}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={discardVideo}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs text-red-500 border border-red-200 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                  Re-record
                </button>
                {videoState === "uploaded" && (
                  <div className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Video ready
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Uploading state */}
          {videoState === "uploading" && (
            <div className="space-y-3 py-4">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: accentColor }} />
                <p className="text-sm text-slate-600 font-medium">Uploading video...</p>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%`, backgroundColor: accentColor }}
                />
              </div>
              <p className="text-xs text-slate-400 text-center">{uploadProgress}%</p>
            </div>
          )}

          {/* Error state */}
          {videoState === "error" && (
            <div className="text-center py-6 space-y-3">
              <p className="text-sm text-red-500">Camera access denied or not available.</p>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setVideoState("idle")}
                  className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Try Again
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Instead
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {/* Optional text note for video */}
          {(videoState === "recorded" || videoState === "uploaded") && (
            <div>
              <label htmlFor="video-note" className="block text-sm font-medium text-slate-700 mb-1.5">
                Add a written note <span className="text-slate-400">(optional)</span>
              </label>
              <textarea
                id="video-note"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Anything you'd like to add in writing..."
                rows={2}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
              />
            </div>
          )}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
          Your name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Smith"
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent"
        />
      </div>

      {/* Title & Company */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="jobtitle" className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
          <input
            id="jobtitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="VP Marketing"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Inc."
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading || videoState === "uploading" || videoState === "recording"}
        className="w-full py-3 rounded-lg text-white text-sm font-semibold transition-opacity disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> {reviewMode === "video" ? "Uploading & Submitting..." : "Submitting..."}
          </span>
        ) : (
          reviewMode === "video" ? "Submit Video Review" : "Submit Review"
        )}
      </button>
    </form>
  );
}
