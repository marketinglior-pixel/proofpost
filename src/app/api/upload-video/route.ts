import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const video = formData.get("video") as File | null;
    const formId = formData.get("formId") as string | null;

    if (!video) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 });
    }

    if (!formId) {
      return NextResponse.json({ error: "Form ID is required" }, { status: 400 });
    }

    if (video.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Validate MIME type
    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];
    if (!allowedTypes.includes(video.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Accepted: MP4, WebM, MOV" },
        { status: 400 }
      );
    }

    // Verify the form exists
    const { data: form } = await supabaseAdmin
      .from("collection_forms")
      .select("id, user_id")
      .eq("id", formId)
      .single();

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    // Generate unique file path
    const extension = video.name.split(".").pop() || (video.type.includes("webm") ? "webm" : "mp4");
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 10);
    const filePath = `${form.user_id}/${formId}/${timestamp}-${randomId}.${extension}`;

    // Read file into buffer
    const arrayBuffer = await video.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from("videos")
      .upload(filePath, buffer, {
        contentType: video.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload video" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("videos")
      .getPublicUrl(filePath);

    return NextResponse.json({
      url: urlData.publicUrl,
      path: filePath,
    });
  } catch (err) {
    console.error("Video upload error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
