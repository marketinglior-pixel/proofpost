export interface EmailTemplate {
  id: number;
  category:
    | "initial-request"
    | "follow-up"
    | "post-purchase"
    | "post-project"
    | "video-testimonial"
    | "review-platform";
  industry: string;
  tone: string;
  subject: string;
  body: string;
}

export const categories = [
  "All Categories",
  "Initial Request",
  "Follow-Up",
  "Post-Purchase",
  "Post-Project",
  "Video Testimonial Request",
  "Review Platform (Google/G2)",
] as const;

export const categoryMap: Record<string, EmailTemplate["category"]> = {
  "Initial Request": "initial-request",
  "Follow-Up": "follow-up",
  "Post-Purchase": "post-purchase",
  "Post-Project": "post-project",
  "Video Testimonial Request": "video-testimonial",
  "Review Platform (Google/G2)": "review-platform",
};

export const industries = [
  "All Industries",
  "SaaS",
  "E-commerce",
  "Agency",
  "Healthcare",
  "Real Estate",
  "Fitness",
  "Restaurant",
  "Professional Services",
  "Education",
  "Consulting",
] as const;

export const tones = [
  "All Tones",
  "Professional",
  "Friendly",
  "Casual",
  "Grateful",
] as const;

export const categoryColors: Record<EmailTemplate["category"], string> = {
  "initial-request": "bg-blue-50 text-blue-600",
  "follow-up": "bg-amber-50 text-amber-600",
  "post-purchase": "bg-emerald-50 text-emerald-700",
  "post-project": "bg-purple-50 text-purple-600",
  "video-testimonial": "bg-rose-50 text-rose-600",
  "review-platform": "bg-indigo-50 text-indigo-600",
};

export const categoryLabels: Record<EmailTemplate["category"], string> = {
  "initial-request": "Initial Request",
  "follow-up": "Follow-Up",
  "post-purchase": "Post-Purchase",
  "post-project": "Post-Project",
  "video-testimonial": "Video Testimonial",
  "review-platform": "Review Platform",
};

export const emails: EmailTemplate[] = [
  // ===== INITIAL REQUEST =====
  {
    id: 1,
    category: "initial-request",
    industry: "SaaS",
    tone: "Professional",
    subject: "Would you share your experience with [PRODUCT_NAME]?",
    body: `Hi [CUSTOMER_NAME],

I hope this message finds you well. I noticed you've been using [PRODUCT_NAME] for [TIME_PERIOD] now, and I'd love to hear about your experience.

Would you be willing to share a brief testimonial about how [PRODUCT_NAME] has helped [COMPANY_NAME]? It can be as simple as a few sentences about what you like most and any results you've seen.

Your feedback would mean a lot to our team and help other businesses discover how we can help them too.

No pressure at all — but if you're open to it, just reply to this email with your thoughts.

Thank you for being a valued customer.

Best regards,
[YOUR_NAME]
[YOUR_TITLE] at [YOUR_COMPANY]`,
  },
  {
    id: 2,
    category: "initial-request",
    industry: "SaaS",
    tone: "Friendly",
    subject: "Quick favor? We'd love your feedback!",
    body: `Hey [CUSTOMER_NAME]!

Hope you're doing great! We've loved working with [COMPANY_NAME] and wanted to ask — would you be up for sharing a quick testimonial about your experience with [PRODUCT_NAME]?

Nothing fancy — just a few sentences about what's been working well for you. It really helps us spread the word and helps other teams like yours find us.

If you're up for it, just hit reply and share your thoughts. Takes about 2 minutes!

Thanks a ton,
[YOUR_NAME]`,
  },
  {
    id: 3,
    category: "initial-request",
    industry: "E-commerce",
    tone: "Grateful",
    subject: "Your opinion means the world to us",
    body: `Dear [CUSTOMER_NAME],

Thank you so much for your recent purchase from [STORE_NAME]. We truly appreciate your support and trust in our products.

We'd be incredibly grateful if you could share a few words about your experience. Your testimonial helps other shoppers make confident decisions and means the world to our small team.

Here are a few things you might mention:
- What made you choose [PRODUCT_NAME]?
- How has the product met your expectations?
- Would you recommend it to a friend?

Simply reply to this email with your thoughts. Thank you for being part of the [STORE_NAME] family.

With gratitude,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 4,
    category: "initial-request",
    industry: "Agency",
    tone: "Professional",
    subject: "Request for testimonial — [PROJECT_NAME] collaboration",
    body: `Hi [CUSTOMER_NAME],

It was a pleasure working with [COMPANY_NAME] on [PROJECT_NAME]. Now that the project is live, I wanted to reach out and ask if you'd be willing to share a testimonial about our work together.

A brief quote about your experience — the process, communication, and results — would be incredibly valuable for our portfolio. We'd feature it on our website with your name and company (with your approval, of course).

If you're open to it, here are a few prompts to get started:
- What challenge were you looking to solve?
- How was the experience working with our team?
- What results have you seen since launch?

Thank you for considering this, and thank you again for the opportunity to work with [COMPANY_NAME].

Best,
[YOUR_NAME]
[YOUR_TITLE] at [YOUR_COMPANY]`,
  },
  {
    id: 5,
    category: "initial-request",
    industry: "Healthcare",
    tone: "Professional",
    subject: "We value your feedback, [CUSTOMER_NAME]",
    body: `Dear [CUSTOMER_NAME],

Thank you for choosing [PRACTICE_NAME] for your care. We strive to provide the best possible experience for every patient, and your feedback helps us continue to improve.

Would you be willing to share a brief testimonial about your experience? Your words could help other patients feel more comfortable choosing our practice.

You might consider sharing:
- What stood out about your visit
- How our team made you feel
- Whether you'd recommend us to others

Simply reply to this email with your thoughts. We respect your privacy and will never share any personal health information.

Thank you for trusting us with your care.

Warm regards,
[YOUR_NAME]
[PRACTICE_NAME]`,
  },
  {
    id: 6,
    category: "initial-request",
    industry: "Real Estate",
    tone: "Friendly",
    subject: "Congrats on the new home! Quick favor?",
    body: `Hi [CUSTOMER_NAME],

Congratulations again on closing on [PROPERTY_ADDRESS]! I hope you're settling in nicely.

I'd love to ask a small favor — would you be willing to share a few words about your experience working with me? A quick testimonial from happy clients like you goes a long way in helping other buyers and sellers feel confident reaching out.

You could mention anything that stood out — the home search process, negotiations, communication, or anything else that made the experience positive.

Just reply to this email with your thoughts whenever you have a moment. No rush at all!

Thanks so much,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 7,
    category: "initial-request",
    industry: "Fitness",
    tone: "Casual",
    subject: "Loving your progress! Can we share your story?",
    body: `Hey [CUSTOMER_NAME]!

I've been watching your progress and it's been amazing to see how far you've come since [START_DATE]. Seriously impressive work!

Would you be cool with sharing a quick testimonial about your experience at [GYM_NAME]? Nothing formal — just a few sentences about your journey. It could inspire others who are thinking about taking the first step.

Just reply here or text me — whatever's easier. Thanks for being such an awesome member!

Cheers,
[YOUR_NAME]`,
  },
  {
    id: 8,
    category: "initial-request",
    industry: "Consulting",
    tone: "Professional",
    subject: "Testimonial request — our engagement with [COMPANY_NAME]",
    body: `Dear [CUSTOMER_NAME],

I wanted to follow up on our recent engagement and express how much we enjoyed working with [COMPANY_NAME]. The progress your team has made on [INITIATIVE] has been remarkable.

I'd like to ask if you'd be comfortable providing a brief testimonial about our consulting work together. A quote from a respected leader like yourself would carry significant weight with prospective clients evaluating our services.

You might address:
- The business challenge you were facing
- The quality of our strategic recommendations
- The impact on your team or business outcomes

I'm happy to draft something for your review if that would save you time. Just let me know your preference.

Thank you for your consideration.

Best regards,
[YOUR_NAME]
[YOUR_TITLE] at [YOUR_COMPANY]`,
  },
  {
    id: 9,
    category: "initial-request",
    industry: "Education",
    tone: "Grateful",
    subject: "Your story could inspire other students",
    body: `Dear [CUSTOMER_NAME],

Thank you for being part of [PROGRAM_NAME]. Watching you grow and achieve [SPECIFIC_ACHIEVEMENT] has been one of the highlights of this program.

I'd be so grateful if you could share a few words about your experience. Your testimonial could inspire other students who are considering [PROGRAM_NAME] but aren't sure if it's right for them.

You might share:
- What motivated you to join
- What surprised you most about the experience
- How the program has impacted your career or skills

Reply to this email with your thoughts whenever it's convenient. Thank you for allowing us to be part of your journey.

With appreciation,
[YOUR_NAME]
[INSTITUTION_NAME]`,
  },
  {
    id: 10,
    category: "initial-request",
    industry: "Restaurant",
    tone: "Friendly",
    subject: "Thanks for dining with us! Quick request?",
    body: `Hi [CUSTOMER_NAME]!

Thank you so much for visiting [RESTAURANT_NAME] recently. We hope you had a wonderful dining experience!

We'd love it if you could share a few words about your visit. Whether it was a favorite dish, the ambiance, or our team's hospitality — your kind words help us grow and help new guests discover what makes [RESTAURANT_NAME] special.

Just reply with your thoughts. It takes less than a minute and means the world to us!

Thanks so much,
[YOUR_NAME]
[RESTAURANT_NAME]`,
  },
  // ===== FOLLOW-UP =====
  {
    id: 11,
    category: "follow-up",
    industry: "SaaS",
    tone: "Friendly",
    subject: "Just circling back — still love your feedback!",
    body: `Hey [CUSTOMER_NAME],

I sent a note last week about sharing a quick testimonial and totally understand if it slipped through the cracks — we all have packed inboxes!

Just wanted to gently bump this up. If you have 2 minutes, we'd love to hear what you think about [PRODUCT_NAME]. Even a sentence or two would be amazing.

No worries at all if the timing isn't right. Just reply whenever works for you!

Thanks again,
[YOUR_NAME]`,
  },
  {
    id: 12,
    category: "follow-up",
    industry: "Agency",
    tone: "Professional",
    subject: "Following up — testimonial for [PROJECT_NAME]",
    body: `Hi [CUSTOMER_NAME],

I wanted to follow up on my earlier request for a testimonial about our work on [PROJECT_NAME]. I understand you're busy, so I've drafted a short quote based on our conversations that you could edit or approve:

"[YOUR_COMPANY] delivered exceptional work on [PROJECT_NAME]. Their team was communicative, strategic, and delivered results that exceeded our expectations. I'd recommend them to any business looking for [SERVICE_TYPE]."

Feel free to modify this in any way, or if you'd prefer to write your own, that works great too. I'm happy to make this as easy as possible for you.

Thank you for your time,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 13,
    category: "follow-up",
    industry: "E-commerce",
    tone: "Casual",
    subject: "Hey! Still hoping to hear from you",
    body: `Hey [CUSTOMER_NAME]!

Quick follow-up on my earlier email — we'd still love to hear your thoughts on [PRODUCT_NAME]. No essay needed — even a quick one-liner like "Love the quality!" or "Best purchase this year" would make our day.

If you'd rather leave a review on our website instead, here's a direct link: [REVIEW_LINK]

Either way, thanks for being an awesome customer!

[YOUR_NAME]
[STORE_NAME]`,
  },
  {
    id: 14,
    category: "follow-up",
    industry: "Healthcare",
    tone: "Professional",
    subject: "Friendly reminder — we'd value your feedback",
    body: `Dear [CUSTOMER_NAME],

I'm following up on my earlier message about sharing your experience at [PRACTICE_NAME]. We completely understand if you've been busy.

To make it easier, you could simply reply with a sentence or two about what you appreciated most about your visit. Alternatively, I've included a link to our online review page: [REVIEW_LINK]

Your feedback helps future patients make informed decisions about their care. Thank you for considering it.

Warm regards,
[YOUR_NAME]
[PRACTICE_NAME]`,
  },
  {
    id: 15,
    category: "follow-up",
    industry: "Consulting",
    tone: "Grateful",
    subject: "Would still love your kind words",
    body: `Hi [CUSTOMER_NAME],

I hope things are going well at [COMPANY_NAME]. I wanted to gently follow up on my testimonial request from a couple of weeks ago.

I know your time is valuable, so I've put together a brief draft based on the results we achieved together. Feel free to use it as-is, tweak it, or write something entirely different:

"Working with [YOUR_COMPANY] helped us [KEY_RESULT]. Their team brought strategic clarity and actionable insights that made a real impact on our [AREA]. I'd highly recommend them."

Thank you again for being such a wonderful client. It was a privilege working with your team.

Best,
[YOUR_NAME]`,
  },
  {
    id: 16,
    category: "follow-up",
    industry: "Professional Services",
    tone: "Professional",
    subject: "Gentle reminder — your testimonial request",
    body: `Dear [CUSTOMER_NAME],

I hope this finds you well. I'm following up on my earlier request for a brief testimonial about our services. I understand schedules can be demanding.

If it would help, I'd be happy to schedule a brief 5-minute call where I can capture your thoughts in conversation, and I'll draft the testimonial for your approval afterward. Many of our clients find this easier than writing from scratch.

Would that work better for you? Just let me know, and I'll send over a few time options.

Thank you for your consideration.

Best regards,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  // ===== POST-PURCHASE =====
  {
    id: 17,
    category: "post-purchase",
    industry: "E-commerce",
    tone: "Friendly",
    subject: "How's your new [PRODUCT_NAME]? We'd love to know!",
    body: `Hey [CUSTOMER_NAME]!

It's been [TIME_PERIOD] since your [PRODUCT_NAME] arrived, and we'd love to hear how it's working out for you!

Would you mind sharing a quick testimonial about your experience? It helps other shoppers decide and means the world to our team.

Here's what you could mention:
- First impressions when it arrived
- How you're using it day to day
- Whether it lived up to your expectations

Just reply to this email — takes about 2 minutes. Thank you!

Cheers,
[YOUR_NAME]
[STORE_NAME]`,
  },
  {
    id: 18,
    category: "post-purchase",
    industry: "SaaS",
    tone: "Professional",
    subject: "30 days in — how's [PRODUCT_NAME] working for you?",
    body: `Hi [CUSTOMER_NAME],

You've been using [PRODUCT_NAME] for about 30 days now, and I'd love to hear how things are going. We've noticed [COMPANY_NAME] has been [SPECIFIC_USAGE_DETAIL], which is great to see.

Would you be open to sharing a brief testimonial about your experience so far? Hearing directly from customers like you helps us build trust with other businesses evaluating [PRODUCT_NAME].

A few things you could touch on:
- What problem [PRODUCT_NAME] solved for your team
- How the onboarding process went
- Any measurable results you've seen

No pressure — just reply with your thoughts if you're up for it.

Thank you,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 19,
    category: "post-purchase",
    industry: "E-commerce",
    tone: "Grateful",
    subject: "Thank you for your order! One small request",
    body: `Dear [CUSTOMER_NAME],

Thank you so much for your purchase of [PRODUCT_NAME]! We truly appreciate your trust in [STORE_NAME].

As a small business, customer testimonials are one of the most powerful ways we grow. Would you be willing to share a sentence or two about your experience? Whether it's about the product quality, our packaging, or the ordering experience — every word helps.

As a small thank-you, we'll send you a [DISCOUNT_AMOUNT] discount code for your next order once we receive your testimonial.

Simply reply to this email. Thank you for being part of our community!

With appreciation,
[YOUR_NAME]
[STORE_NAME]`,
  },
  {
    id: 20,
    category: "post-purchase",
    industry: "Fitness",
    tone: "Casual",
    subject: "How's your [PRODUCT_NAME] treating you?",
    body: `Hey [CUSTOMER_NAME]!

Just checking in — how's the [PRODUCT_NAME] working out for your workouts? We love hearing how our gear holds up in action.

If you've got a sec, drop us a quick review. Something like what you use it for, how it's held up, or even just "love it!" — it all helps.

Bonus points if you tag us on Instagram @[HANDLE] wearing it!

Thanks for choosing [STORE_NAME],
[YOUR_NAME]`,
  },
  {
    id: 21,
    category: "post-purchase",
    industry: "Education",
    tone: "Professional",
    subject: "Course complete! How was your experience?",
    body: `Dear [CUSTOMER_NAME],

Congratulations on completing [COURSE_NAME]! We hope the material was valuable and applicable to your work.

Now that you've had time to absorb and apply what you've learned, we'd love to hear your feedback. A brief testimonial about your experience would help prospective students understand the value of the program.

Consider sharing:
- What attracted you to the course
- Your favorite module or insight
- How you've applied what you learned

Your feedback directly shapes how we improve our curriculum. Thank you for investing in your growth with us.

Best regards,
[YOUR_NAME]
[INSTITUTION_NAME]`,
  },
  // ===== POST-PROJECT =====
  {
    id: 22,
    category: "post-project",
    industry: "Agency",
    tone: "Professional",
    subject: "Project wrap-up — would you share your experience?",
    body: `Hi [CUSTOMER_NAME],

Now that [PROJECT_NAME] is live and generating results, I wanted to reach out about capturing your experience in a brief testimonial.

We're proud of the work we delivered for [COMPANY_NAME], and a quote from you would be incredibly valuable for our portfolio and case studies.

You could address:
- The challenge [COMPANY_NAME] was facing before the project
- Your experience working with our team
- The outcomes or results since launch

If you're open to it, I can share a few draft options for your review, or you're welcome to write your own. Whichever is easier for you.

Thank you for the partnership,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 23,
    category: "post-project",
    industry: "Consulting",
    tone: "Professional",
    subject: "Reflecting on our engagement — testimonial request",
    body: `Dear [CUSTOMER_NAME],

As we close out our engagement with [COMPANY_NAME], I wanted to express how much we valued the partnership. The work your team put into implementing our recommendations was exemplary.

I'd like to ask if you'd be willing to provide a brief testimonial about our work together. Your perspective as [CUSTOMER_TITLE] at [COMPANY_NAME] would carry significant weight with prospective clients.

Key areas you might address:
- The strategic challenge we helped address
- The quality of our analysis and recommendations
- The business impact of the engagement

I'm happy to draft something for your approval if that saves time. Just let me know your preference.

Best regards,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 24,
    category: "post-project",
    industry: "Real Estate",
    tone: "Grateful",
    subject: "It was a joy helping you — would you share your experience?",
    body: `Dear [CUSTOMER_NAME],

Now that you've settled into [PROPERTY_ADDRESS], I wanted to reach out and say it was truly a joy helping you through the [buying/selling] process.

I'd be deeply grateful if you could share a few words about your experience working with me. Your testimonial would help other [buyers/sellers] in [AREA] feel confident about reaching out.

You could mention:
- How the process went overall
- What you felt I did well
- Whether you'd recommend me to friends or family

A quick reply to this email is all it takes. Thank you for trusting me with such an important decision.

With heartfelt thanks,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 25,
    category: "post-project",
    industry: "Professional Services",
    tone: "Professional",
    subject: "Engagement complete — feedback request",
    body: `Dear [CUSTOMER_NAME],

Thank you for choosing [YOUR_COMPANY] for your [SERVICE_TYPE] needs. We were pleased to deliver [DELIVERABLE] for [COMPANY_NAME] and hope it meets your expectations.

As we wrap up, I'd appreciate if you could share a short testimonial about our service. Your endorsement helps us build credibility with prospective clients and demonstrates the value we deliver.

A few sentences about your experience — the quality of work, our professionalism, and the outcome — would be very helpful.

Thank you for the opportunity to serve [COMPANY_NAME]. We look forward to working together again.

Sincerely,
[YOUR_NAME]
[YOUR_TITLE] at [YOUR_COMPANY]`,
  },
  {
    id: 26,
    category: "post-project",
    industry: "Agency",
    tone: "Friendly",
    subject: "We had a blast working together! Quick favor?",
    body: `Hey [CUSTOMER_NAME]!

Working on [PROJECT_NAME] with your team was honestly one of the highlights of our quarter. The results speak for themselves — [SPECIFIC_RESULT].

Would you be up for sharing a quick testimonial about the experience? Even just a couple of sentences would be amazing. Something like what the collaboration was like and what the project meant for [COMPANY_NAME].

We'd feature it on our website (with your approval, of course).

Thanks for being such an awesome client!

[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 27,
    category: "post-project",
    industry: "Education",
    tone: "Grateful",
    subject: "Program complete — your words could inspire the next cohort",
    body: `Dear [CUSTOMER_NAME],

Congratulations on completing [PROGRAM_NAME]! It's been wonderful watching your progress throughout the program, and I'm so proud of what you've accomplished.

I'd be incredibly grateful if you could share a testimonial about your experience. Your story could be the encouragement that helps the next cohort take the leap.

You might share:
- Why you chose [PROGRAM_NAME]
- A highlight or breakthrough moment
- How the program has impacted your career

Reply anytime — there's no rush. Thank you for being part of this journey.

Warmly,
[YOUR_NAME]
[INSTITUTION_NAME]`,
  },
  // ===== VIDEO TESTIMONIAL =====
  {
    id: 28,
    category: "video-testimonial",
    industry: "SaaS",
    tone: "Professional",
    subject: "Invitation: share your [PRODUCT_NAME] story on video",
    body: `Hi [CUSTOMER_NAME],

The results [COMPANY_NAME] has achieved with [PRODUCT_NAME] are impressive, and we'd love to feature your story in a short video testimonial.

Here's what it would involve:
- A 15-20 minute recorded video call (we handle all the production)
- We'll send you 3-4 questions in advance so you can prepare
- Final edit is shared for your approval before publishing
- We'll feature [COMPANY_NAME] prominently with a link back to your site

We've found that video testimonials are incredibly powerful for both parties — they showcase your team's success while helping others learn from your approach.

Would you be open to scheduling a session? I'll send over available times and the questions in advance.

Best,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 29,
    category: "video-testimonial",
    industry: "Agency",
    tone: "Friendly",
    subject: "Want to be featured in a case study video?",
    body: `Hey [CUSTOMER_NAME]!

We've been putting together some video case studies to showcase our best work, and [PROJECT_NAME] is at the top of our list!

Would you be interested in doing a short video testimonial? Here's the deal:
- Quick 15-minute Zoom call
- We send you the questions ahead of time (no surprises!)
- Our team handles all the editing
- You get final approval before anything goes live
- We'll promote [COMPANY_NAME] across our channels

It's a great way to show off what [COMPANY_NAME] has accomplished while helping other businesses learn from your success.

Let me know if you're in, and I'll send over a few time slots!

[YOUR_NAME]`,
  },
  {
    id: 30,
    category: "video-testimonial",
    industry: "Fitness",
    tone: "Casual",
    subject: "Your transformation is inspiring — want to share it?",
    body: `Hey [CUSTOMER_NAME]!

Your progress has been absolutely incredible, and I think your story could really motivate others who are just starting their fitness journey.

Would you be down to do a quick video testimonial? Nothing fancy — just you talking about your experience. We can film it at the gym or you can record a quick selfie video on your phone.

A few things you could talk about:
- Where you started and where you are now
- What kept you going
- Your favorite thing about [GYM_NAME]

We'd share it on our social media and website (with your ok, obviously). Let me know!

[YOUR_NAME]
[GYM_NAME]`,
  },
  {
    id: 31,
    category: "video-testimonial",
    industry: "E-commerce",
    tone: "Friendly",
    subject: "We'd love to see you using [PRODUCT_NAME]!",
    body: `Hey [CUSTOMER_NAME]!

We've been getting incredible feedback about [PRODUCT_NAME], and customers like you are the reason we do what we do!

Would you be open to creating a short video review? It can be super casual — just 30-60 seconds on your phone showing the product and sharing your experience.

Ideas for what to include:
- Unboxing or showing the product
- How you use it in your daily life
- What you love most about it

In return, we'd love to send you [INCENTIVE] as a thank-you. Just reply to this email if you're interested, and I'll share a few tips for making a great video.

Thanks!
[YOUR_NAME]
[STORE_NAME]`,
  },
  {
    id: 32,
    category: "video-testimonial",
    industry: "Consulting",
    tone: "Professional",
    subject: "Video case study invitation — [COMPANY_NAME] success story",
    body: `Dear [CUSTOMER_NAME],

The outcomes from our engagement with [COMPANY_NAME] represent exactly the kind of success story that resonates with prospective clients. I'd like to invite you to participate in a brief video case study.

The format is straightforward:
- 20-minute guided interview via video call
- Questions provided in advance for your review
- Professional editing by our team
- Your final approval before any publication
- Cross-promotion on both our channels

This is an excellent opportunity to position [COMPANY_NAME] as a thought leader while showcasing the strategic results your team has achieved.

Would you be available for a brief call to discuss the details?

Best regards,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 33,
    category: "video-testimonial",
    industry: "Healthcare",
    tone: "Professional",
    subject: "Invitation to share your patient experience on video",
    body: `Dear [CUSTOMER_NAME],

Thank you for trusting [PRACTICE_NAME] with your care. We're reaching out to select patients to participate in video testimonials that help others feel comfortable choosing our practice.

The process is simple and respectful of your time:
- 10-minute recorded conversation at our office or via video call
- We'll guide you through a few simple questions
- You'll review and approve the final video before publication
- No personal health information will be discussed or disclosed

Your comfort and privacy are our top priority. If you're interested, I'd be happy to share more details and answer any questions.

Thank you for considering this opportunity.

Warm regards,
[YOUR_NAME]
[PRACTICE_NAME]`,
  },
  // ===== REVIEW PLATFORM =====
  {
    id: 34,
    category: "review-platform",
    industry: "SaaS",
    tone: "Professional",
    subject: "Would you leave us a review on G2?",
    body: `Hi [CUSTOMER_NAME],

I hope [PRODUCT_NAME] continues to deliver value for [COMPANY_NAME]. I have a quick request — would you consider leaving us a review on G2?

G2 is where many software buyers go to research tools, and authentic reviews from customers like you make a real difference. It takes about 5 minutes.

Here's a direct link: [G2_REVIEW_LINK]

A few things you might mention:
- How [PRODUCT_NAME] fits into your workflow
- Key features you rely on
- How our support team has helped

Thank you in advance. Your voice helps other teams discover solutions that work.

Best,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 35,
    category: "review-platform",
    industry: "Restaurant",
    tone: "Friendly",
    subject: "Enjoyed your visit? We'd love a Google review!",
    body: `Hey [CUSTOMER_NAME]!

Thanks for dining at [RESTAURANT_NAME]! We hope you had an amazing experience.

If you have a quick moment, we'd really appreciate a Google review. It helps other food lovers find us and supports our small team.

Here's the direct link (takes 2 minutes): [GOOGLE_REVIEW_LINK]

You could mention your favorite dish, the service, the vibe — anything that stood out. Every review truly makes a difference for us.

Thank you so much!
[YOUR_NAME]
[RESTAURANT_NAME]`,
  },
  {
    id: 36,
    category: "review-platform",
    industry: "Healthcare",
    tone: "Professional",
    subject: "Would you share your experience on Google?",
    body: `Dear [CUSTOMER_NAME],

Thank you for choosing [PRACTICE_NAME] for your care. We hope your experience was positive and that you're doing well.

If you're comfortable, we'd appreciate a review on our Google Business profile. Patient reviews help others in the community find quality care.

Here's the direct link: [GOOGLE_REVIEW_LINK]

Please feel free to share anything about your experience — our team, the office environment, or the quality of care you received. Please do not include any private health details in your review.

Thank you for your time and trust.

Warm regards,
[YOUR_NAME]
[PRACTICE_NAME]`,
  },
  {
    id: 37,
    category: "review-platform",
    industry: "Real Estate",
    tone: "Grateful",
    subject: "Would you leave a Google review about our work together?",
    body: `Dear [CUSTOMER_NAME],

I hope you're loving your new home at [PROPERTY_ADDRESS]! It was such a pleasure helping you through the process.

I'd be incredibly grateful if you could share your experience in a Google review. It helps other [buyers/sellers] in [AREA] feel confident about working with me.

Here's the direct link: [GOOGLE_REVIEW_LINK]

Even a few sentences about the process — what went well, how I communicated, and the overall experience — would mean the world.

Thank you for your trust, and congratulations again!

Warmly,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 38,
    category: "review-platform",
    industry: "Professional Services",
    tone: "Professional",
    subject: "Your review would mean a lot to us",
    body: `Dear [CUSTOMER_NAME],

Thank you for choosing [YOUR_COMPANY] for your [SERVICE_TYPE] needs. We were pleased to work with [COMPANY_NAME] and deliver results that met your expectations.

I have a brief request — would you consider leaving a review on Google? Reviews from respected professionals like yourself help other businesses feel confident choosing our services.

Direct link: [GOOGLE_REVIEW_LINK]

A few sentences about the quality of our work, professionalism, and results would be greatly appreciated. Thank you for your time.

Best regards,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 39,
    category: "review-platform",
    industry: "Fitness",
    tone: "Casual",
    subject: "Mind leaving us a Google review? It'd mean a lot!",
    body: `Hey [CUSTOMER_NAME]!

You've been crushing it at [GYM_NAME] and we'd love if you could share the love on Google. A quick review helps other people find our gym and see what our community is all about.

Here's the link: [GOOGLE_REVIEW_LINK]

You could mention your favorite classes, the trainers, the vibe — whatever stands out to you. Even something short like "Best gym in [AREA]!" helps a ton.

Thanks for being part of the [GYM_NAME] family!

[YOUR_NAME]`,
  },
  {
    id: 40,
    category: "review-platform",
    industry: "SaaS",
    tone: "Friendly",
    subject: "Quick ask — leave us a review on Capterra?",
    body: `Hey [CUSTOMER_NAME]!

Hope all is going great with [PRODUCT_NAME]! Quick ask — would you be willing to drop us a review on Capterra?

It takes about 5 minutes and helps other teams like yours discover [PRODUCT_NAME]. Plus, Capterra sometimes sends gift cards to reviewers (we don't control that, but it's a nice bonus!).

Here's the direct link: [CAPTERRA_REVIEW_LINK]

Thanks a million!
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 41,
    category: "review-platform",
    industry: "E-commerce",
    tone: "Grateful",
    subject: "Love your order? Share the love on Google!",
    body: `Dear [CUSTOMER_NAME],

Thank you so much for your recent purchase from [STORE_NAME]. We hope [PRODUCT_NAME] has been everything you expected and more.

If you have a moment, we'd be incredibly grateful for a Google review. As a small business, every review helps us reach more customers who would love our products.

Here's the link: [GOOGLE_REVIEW_LINK]

Thank you for supporting [STORE_NAME]. You're truly part of what makes our brand special.

With gratitude,
[YOUR_NAME]
[STORE_NAME]`,
  },
  // ===== ADDITIONAL INITIAL REQUESTS =====
  {
    id: 42,
    category: "initial-request",
    industry: "Professional Services",
    tone: "Grateful",
    subject: "Working with [COMPANY_NAME] has been a highlight",
    body: `Dear [CUSTOMER_NAME],

I wanted to personally reach out and say how much we've enjoyed working with [COMPANY_NAME]. Your trust in [YOUR_COMPANY] means more than you know.

I'd be deeply grateful if you'd consider sharing a brief testimonial about our partnership. A few honest words from you would help other businesses understand the value we bring.

No script, no requirements — just your genuine experience in your own words. Reply whenever you have a quiet moment.

Thank you for being such a wonderful client.

With sincere gratitude,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 43,
    category: "initial-request",
    industry: "E-commerce",
    tone: "Casual",
    subject: "Hey! How's the [PRODUCT_NAME] treating you?",
    body: `Hey [CUSTOMER_NAME]!

Just wanted to check in — how's the [PRODUCT_NAME] working out? We'd love to hear your honest take!

If you're feeling the love, would you mind dropping us a quick testimonial? Something as simple as "Love it, great quality!" or a few sentences about what you dig about it.

Just reply to this email or leave a review on our site: [REVIEW_LINK]

Thanks for being awesome!
[YOUR_NAME]
[STORE_NAME]`,
  },
  // ===== ADDITIONAL FOLLOW-UPS =====
  {
    id: 44,
    category: "follow-up",
    industry: "Real Estate",
    tone: "Friendly",
    subject: "Checking in — still hoping to hear from you!",
    body: `Hi [CUSTOMER_NAME]!

Hope you're loving life at [PROPERTY_ADDRESS]! I sent a note a little while ago about sharing your experience, and wanted to gently follow up.

I know life gets busy (especially with a new home!), so no pressure at all. If you have literally 60 seconds, even a short reply like "Great agent, made the process easy" would mean so much.

Thanks again for everything!
[YOUR_NAME]`,
  },
  {
    id: 45,
    category: "follow-up",
    industry: "Fitness",
    tone: "Casual",
    subject: "Hey! Still love to hear your story",
    body: `Hey [CUSTOMER_NAME]!

Just bumping my earlier message — would still love to hear about your experience at [GYM_NAME]. I know you're busy between workouts and life, so here's an idea:

Just text me or reply with one sentence. Literally that's it. Something like:
- "[GYM_NAME] helped me get back in shape after [LIFE_EVENT]"
- "Best trainers I've ever worked with"
- "Finally found a gym I actually enjoy going to"

That's all we need! Thanks for being awesome.

[YOUR_NAME]`,
  },
  {
    id: 46,
    category: "follow-up",
    industry: "Education",
    tone: "Professional",
    subject: "Following up — your feedback is valued",
    body: `Dear [CUSTOMER_NAME],

I'm following up on my earlier request for a testimonial about your experience with [PROGRAM_NAME]. We understand your schedule is demanding.

To simplify the process, here are three options:
1. Reply to this email with a few sentences
2. Complete a short form here: [TESTIMONIAL_FORM_LINK]
3. Schedule a 5-minute call and I'll capture your thoughts: [CALENDAR_LINK]

Your feedback helps shape the future of [PROGRAM_NAME] and inspires prospective students. Thank you for considering it.

Best regards,
[YOUR_NAME]
[INSTITUTION_NAME]`,
  },
  // ===== ADDITIONAL POST-PURCHASE =====
  {
    id: 47,
    category: "post-purchase",
    industry: "Restaurant",
    tone: "Grateful",
    subject: "Thank you for your catering order! One small ask",
    body: `Dear [CUSTOMER_NAME],

Thank you so much for choosing [RESTAURANT_NAME] for your [EVENT_TYPE] catering! We hope the food was a hit and your guests enjoyed every bite.

We'd be truly grateful for a brief testimonial about your catering experience. Event planning is stressful, and your kind words help other hosts feel confident choosing us.

You could mention:
- The quality and presentation of the food
- Our reliability and communication
- Whether your guests enjoyed the meal

Just reply with a few sentences. Thank you for making us part of your special event!

Warmly,
[YOUR_NAME]
[RESTAURANT_NAME]`,
  },
  {
    id: 48,
    category: "post-purchase",
    industry: "Consulting",
    tone: "Professional",
    subject: "Implementation complete — how are results looking?",
    body: `Dear [CUSTOMER_NAME],

It's been [TIME_PERIOD] since we completed the implementation of our recommendations at [COMPANY_NAME]. I hope the new processes are delivering the expected outcomes.

Now that you've had time to measure results, would you be willing to share a testimonial that speaks to the impact of our work? Data-driven testimonials are particularly valuable — if you're comfortable sharing any metrics or improvements, that would be excellent.

For example:
- "Since implementing [YOUR_COMPANY]'s recommendations, we've seen [X]% improvement in [METRIC]"
- "The ROI on our engagement with [YOUR_COMPANY] has been [X]x"

I'm happy to help craft something based on the numbers you share. Thank you for considering this.

Best regards,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  // ===== ADDITIONAL VIDEO TESTIMONIAL =====
  {
    id: 49,
    category: "video-testimonial",
    industry: "Real Estate",
    tone: "Friendly",
    subject: "Would you share your homebuying story on video?",
    body: `Hi [CUSTOMER_NAME]!

I love sharing success stories, and your journey to finding [PROPERTY_ADDRESS] is one of my favorites. Would you be open to a short video testimonial?

Here's the plan:
- A casual 10-minute video call (we keep it conversational, not scripted)
- I'll share 3-4 easy questions in advance
- I handle all the editing
- You approve everything before it goes live

Your story could help other [buyers/sellers] feel more comfortable starting their real estate journey. Plus, it's a great way to document this exciting chapter!

Let me know if you're interested — I'll send over some time options.

[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 50,
    category: "video-testimonial",
    industry: "Education",
    tone: "Grateful",
    subject: "Your journey inspires us — share it on video?",
    body: `Dear [CUSTOMER_NAME],

Your journey through [PROGRAM_NAME] has been truly inspiring. From where you started to [SPECIFIC_ACHIEVEMENT], you've shown exactly what's possible with dedication and the right support.

I'd be honored if you'd consider sharing your story in a short video testimonial. Your experience could be the spark that encourages someone else to take the leap.

The process is simple:
- 15-minute guided conversation (questions sent in advance)
- Record via Zoom or in-person
- We handle all production and editing
- Your approval is required before publishing

We'd feature your story prominently on our website and social channels, including a link to your [LinkedIn/portfolio] if you'd like.

Would you be interested? I'm happy to share more details.

With deep gratitude,
[YOUR_NAME]
[INSTITUTION_NAME]`,
  },
  // ===== ADDITIONAL REVIEW PLATFORM =====
  {
    id: 51,
    category: "review-platform",
    industry: "Agency",
    tone: "Professional",
    subject: "Would you review us on Clutch?",
    body: `Hi [CUSTOMER_NAME],

I hope [PROJECT_NAME] continues to deliver great results for [COMPANY_NAME]. We have a quick request — would you consider leaving a review of our work on Clutch?

Clutch is the leading platform for agency reviews, and feedback from clients like you directly impacts our ranking and visibility. The review takes about 10-15 minutes and is conducted via a brief phone interview with a Clutch analyst.

Here's the link to get started: [CLUTCH_REVIEW_LINK]

Alternatively, I can have the Clutch team reach out to you directly at a convenient time. Just let me know your preference.

Thank you for considering this.

Best,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 52,
    category: "review-platform",
    industry: "Consulting",
    tone: "Professional",
    subject: "LinkedIn recommendation request",
    body: `Dear [CUSTOMER_NAME],

I hope this message finds you well. I wanted to reach out with a professional request — would you consider writing a brief LinkedIn recommendation based on our work together?

A recommendation from [CUSTOMER_TITLE] at [COMPANY_NAME] would be meaningful and help build credibility in our shared professional network.

Here's a direct link to my profile: [LINKEDIN_PROFILE_LINK]

If you prefer, I'm happy to write a draft recommendation for your review and approval. I've also written a recommendation for your profile, which you should see in your notifications.

Thank you for your consideration.

Kind regards,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 53,
    category: "review-platform",
    industry: "Education",
    tone: "Friendly",
    subject: "Would you share your experience on Course Report?",
    body: `Hey [CUSTOMER_NAME]!

Hope you're doing great since completing [PROGRAM_NAME]! Quick ask — would you be willing to share your experience on Course Report?

It's one of the top platforms where prospective students research programs like ours, and your honest review could help someone make a life-changing decision.

Here's the link: [COURSE_REPORT_LINK]

Even a few sentences about what you learned, the quality of instruction, and your career outcomes would be incredibly helpful. Thank you!

Best,
[YOUR_NAME]
[INSTITUTION_NAME]`,
  },
  {
    id: 54,
    category: "initial-request",
    industry: "Consulting",
    tone: "Casual",
    subject: "Working together was awesome — mind sharing that?",
    body: `Hey [CUSTOMER_NAME]!

Hope things are going well at [COMPANY_NAME]! I've been thinking about our work together and honestly, it was one of the most rewarding engagements we've done.

Would you mind sharing a quick testimonial about the experience? Nothing formal — just how things went, what clicked, and what you got out of it. A few sentences is perfect.

Just hit reply when you've got a minute. Thanks!

[YOUR_NAME]`,
  },
  {
    id: 55,
    category: "post-project",
    industry: "SaaS",
    tone: "Professional",
    subject: "Migration complete — how is everything running?",
    body: `Hi [CUSTOMER_NAME],

Now that [COMPANY_NAME] has been fully migrated to [PRODUCT_NAME] and your team is up and running, I'd love to capture your experience.

Would you be willing to share a brief testimonial about the migration process and your early experience with the platform? Hearing about real implementation stories helps other teams feel confident about making the switch.

Key areas that would be helpful:
- How the migration process compared to your expectations
- Your team's adoption experience
- Any early wins or improvements you've noticed

A few sentences in an email reply is all we need. Thank you for being a great partner through this process.

Best,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
  {
    id: 56,
    category: "follow-up",
    industry: "SaaS",
    tone: "Grateful",
    subject: "Last ask, I promise — your feedback matters",
    body: `Hi [CUSTOMER_NAME],

I know I've reached out a couple of times about this, and I genuinely appreciate your patience. This is my last follow-up, I promise!

If you have just 60 seconds, a quick reply with your experience using [PRODUCT_NAME] would mean so much to our team. It doesn't need to be polished — raw and honest is perfect.

If the timing just isn't right, I completely understand. Either way, thank you for being a valued [PRODUCT_NAME] customer.

Gratefully,
[YOUR_NAME]
[YOUR_COMPANY]`,
  },
];
