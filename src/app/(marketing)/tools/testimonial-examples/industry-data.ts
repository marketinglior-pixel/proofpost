export interface IndustryConfig {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  relatedIndustries: string[];
  collectingTips: string[];
  whyMatters: string;
  faq: { question: string; answer: string }[];
}

export interface IndustryTestimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export const industries: IndustryConfig[] = [
  {
    slug: "saas",
    name: "SaaS",
    description:
      "Browse real-world SaaS testimonial examples from software companies. These customer testimonials highlight product adoption, ROI, and team productivity gains.",
    keywords: [
      "saas testimonial examples",
      "software testimonial examples",
      "b2b saas testimonials",
      "software company reviews",
    ],
    relatedIndustries: ["technology", "consulting", "agency", "education"],
    collectingTips: [
      "Ask after a successful onboarding or feature adoption milestone",
      "Time your request after a positive support interaction or product update",
      "Include specific metrics — ask about time saved, revenue gained, or efficiency improvements",
      "Use in-app prompts after users hit key milestones like 30-day active usage",
    ],
    whyMatters:
      "In SaaS, buyers rely heavily on peer reviews before committing to annual contracts. Testimonials that mention specific outcomes — like reduced churn, faster onboarding, or measurable ROI — directly influence purchase decisions. With long sales cycles and multiple stakeholders, strong testimonials can shorten the path from trial to paid conversion.",
    faq: [
      {
        question: "What should a SaaS testimonial include?",
        answer:
          "The best SaaS testimonials include the specific problem the customer faced, how your software solved it, and a measurable result (e.g., '40% faster onboarding' or 'saved 12 hours per week'). Including the customer's role and company size adds credibility for prospects in similar situations.",
      },
      {
        question: "When is the best time to ask SaaS customers for testimonials?",
        answer:
          "The ideal moments are after a successful onboarding, when a customer renews or upgrades, after a positive support interaction, or when they hit a key milestone with your product. Automating requests at these trigger points increases response rates significantly.",
      },
      {
        question: "How many testimonials should a SaaS website display?",
        answer:
          "Display 3-5 strong testimonials on your homepage, 2-3 on each pricing tier, and build a dedicated customer stories page. For landing pages targeting specific industries or use cases, show testimonials from similar customers to maximize relevance.",
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    description:
      "Explore e-commerce testimonial examples from online stores and retail brands. These reviews cover product quality, shipping, customer service, and shopping experience.",
    keywords: [
      "ecommerce testimonial examples",
      "online store testimonials",
      "product review examples",
      "ecommerce customer reviews",
    ],
    relatedIndustries: ["retail", "manufacturing", "technology", "restaurant"],
    collectingTips: [
      "Send a follow-up email 7-14 days after delivery when customers have used the product",
      "Offer a small discount on the next purchase in exchange for an honest review",
      "Use post-purchase email sequences with photo upload options",
      "Include a QR code in packaging that links directly to a review form",
    ],
    whyMatters:
      "E-commerce testimonials are the digital equivalent of word-of-mouth. With no ability to physically touch or try products, shoppers depend on reviews to evaluate quality, fit, and value. Products with reviews convert up to 270% better than those without, and detailed testimonials with photos are the most trusted form of social proof in online retail.",
    faq: [
      {
        question: "What makes an effective e-commerce testimonial?",
        answer:
          "Effective e-commerce testimonials describe the product experience in detail — mentioning quality, fit, shipping speed, and how the product solved a specific need. Photo and video reviews are especially powerful as they show real-world product usage.",
      },
      {
        question: "How do product reviews impact e-commerce conversion rates?",
        answer:
          "Products with reviews see conversion rates 3-4x higher than those without. Even a single review can boost conversions by 10%, and products with 50+ reviews see an additional 4.6% lift. Negative reviews actually help too — they build trust by showing authenticity.",
      },
      {
        question: "Should e-commerce stores display negative reviews?",
        answer:
          "Yes. A mix of ratings appears more authentic than all 5-star reviews. Research shows that purchase likelihood peaks at ratings between 4.0-4.7 stars. Responding professionally to negative reviews also demonstrates strong customer service.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "Find healthcare testimonial examples from clinics, practices, and health tech companies. These patient testimonials focus on care quality, outcomes, and patient experience.",
    keywords: [
      "healthcare testimonial examples",
      "patient testimonial examples",
      "medical practice reviews",
      "healthcare customer reviews",
    ],
    relatedIndustries: ["fitness", "insurance", "professional-services", "nonprofit"],
    collectingTips: [
      "Ask after a successful treatment outcome or recovery milestone",
      "Ensure HIPAA compliance — get explicit written consent before publishing",
      "Focus on the experience and care quality, not specific medical details",
      "Use anonymous or first-name-only formats when patients prefer privacy",
    ],
    whyMatters:
      "Healthcare decisions carry high emotional weight. Patients choosing a provider need reassurance that they will receive compassionate, competent care. Testimonials from real patients who share positive outcomes and experiences help reduce anxiety and build trust — especially for elective procedures, new patient acquisition, and health tech adoption.",
    faq: [
      {
        question: "Are healthcare testimonials HIPAA compliant?",
        answer:
          "Patient testimonials can be HIPAA compliant when you obtain written authorization from the patient before using their testimonial. The authorization should specify how and where the testimonial will be used. Never disclose protected health information without explicit consent.",
      },
      {
        question: "What should healthcare testimonials focus on?",
        answer:
          "Focus on the patient experience — the care received, communication quality, staff friendliness, facility cleanliness, and overall satisfaction. Patients can share their own health outcomes voluntarily, but the practice should never prompt specific medical details.",
      },
      {
        question: "How can medical practices encourage patient reviews?",
        answer:
          "Send a follow-up email or text after appointments with a direct link to leave a review. Train front desk staff to mention reviews during checkout. Display signage with QR codes in waiting rooms. Respond to every review to show you value patient feedback.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Browse real estate testimonial examples from agents, brokers, and property companies. These client testimonials highlight market expertise, negotiation skills, and home buying experiences.",
    keywords: [
      "real estate testimonial examples",
      "realtor testimonial examples",
      "real estate agent reviews",
      "home buying testimonials",
    ],
    relatedIndustries: ["construction", "financial-services", "insurance", "legal"],
    collectingTips: [
      "Ask at closing or shortly after — emotions are positive and the experience is fresh",
      "Send a handwritten thank-you card with a link to leave a review",
      "Request testimonials that mention specific neighborhoods or property types",
      "Follow up at the 6-month or 1-year anniversary in the new home",
    ],
    whyMatters:
      "Real estate is the largest financial transaction most people will ever make. Trust in an agent or brokerage is paramount. Testimonials from past clients who share their buying or selling journey — especially mentioning the agent's responsiveness, market knowledge, and negotiation skills — are the most influential factor in agent selection after referrals.",
    faq: [
      {
        question: "What makes a great real estate testimonial?",
        answer:
          "A great real estate testimonial mentions the specific type of transaction (first-time buyer, luxury sale, relocation), the agent's key strengths (market knowledge, negotiation, communication), and a concrete outcome (sold above asking, found a home in a competitive market, smooth closing process).",
      },
      {
        question: "Where should real estate agents display testimonials?",
        answer:
          "Display testimonials on your personal website, Zillow/Realtor.com profiles, Google Business Profile, social media, listing presentations, and email signatures. Location-specific testimonials work well on neighborhood landing pages.",
      },
      {
        question: "How many testimonials does a real estate agent need?",
        answer:
          "Aim for at least 20-30 testimonials across platforms. Fresh reviews matter — agents with reviews from the last 3-6 months appear more active and trustworthy. Ask for reviews after every successful transaction to build a steady stream.",
      },
    ],
  },
  {
    slug: "fitness",
    name: "Fitness",
    description:
      "Explore fitness and wellness testimonial examples from gyms, trainers, and wellness brands. These testimonials showcase transformation stories, coaching quality, and community impact.",
    keywords: [
      "fitness testimonial examples",
      "gym testimonial examples",
      "personal trainer testimonials",
      "wellness testimonial examples",
    ],
    relatedIndustries: ["healthcare", "ecommerce", "education", "restaurant"],
    collectingTips: [
      "Capture testimonials at transformation milestones — 30 days, 90 days, 6 months",
      "Ask for before-and-after photos with permission to share",
      "Record short video testimonials after a great class or training session",
      "Feature member spotlights on social media to encourage participation",
    ],
    whyMatters:
      "Fitness purchases are emotionally driven and often represent a commitment to personal change. Prospective members want to see people like them who achieved results. Transformation stories, community testimonials, and coaching endorsements help overcome the fear of starting and reduce gym intimidation — directly boosting membership conversions.",
    faq: [
      {
        question: "What makes a compelling fitness testimonial?",
        answer:
          "The most compelling fitness testimonials include specific results (weight lost, strength gained, race completed), the timeline for achieving those results, and the emotional journey. Mentioning what was different about this gym or trainer compared to past experiences adds powerful context.",
      },
      {
        question: "Should fitness testimonials include before-and-after photos?",
        answer:
          "Yes, with the member's explicit consent. Visual transformation stories are the most powerful form of fitness social proof. However, also include testimonials about non-physical benefits like confidence, energy, community, and mental health improvements.",
      },
      {
        question: "How can gyms collect more member testimonials?",
        answer:
          "Create a monthly member spotlight program, offer small incentives like free merchandise, set up a simple photo/video station at the gym, and ask members to share their stories on social media with a branded hashtag. Follow up personally after members hit milestones.",
      },
    ],
  },
  {
    slug: "restaurant",
    name: "Restaurant",
    description:
      "Find restaurant testimonial examples from dining establishments and food service businesses. These reviews cover food quality, ambiance, service, and dining experiences.",
    keywords: [
      "restaurant testimonial examples",
      "restaurant review examples",
      "food service testimonials",
      "dining review examples",
    ],
    relatedIndustries: ["hospitality", "ecommerce", "retail", "fitness"],
    collectingTips: [
      "Place table cards with QR codes linking to your review page",
      "Train servers to mention reviews during positive interactions",
      "Follow up with diners who made reservations via email",
      "Respond to every review — positive or negative — to show you care",
    ],
    whyMatters:
      "Restaurant choices are made quickly and heavily influenced by reviews. Over 90% of diners read reviews before choosing a restaurant. Testimonials that describe specific dishes, the atmosphere, and service quality help potential customers visualize their experience. High review counts and recent reviews signal a thriving, consistent establishment.",
    faq: [
      {
        question: "What should restaurant testimonials mention?",
        answer:
          "The best restaurant testimonials mention specific dishes by name, describe the ambiance and service quality, and note the occasion (date night, family dinner, business lunch). Reviews that highlight what makes the restaurant unique — like a signature dish or exceptional hospitality — are most valuable.",
      },
      {
        question: "How important are online reviews for restaurants?",
        answer:
          "Extremely important. A one-star increase on Yelp can lead to a 5-9% increase in revenue. Restaurants with 4+ stars and 50+ reviews significantly outperform competitors. Most diners won't consider a restaurant with fewer than 10 reviews or below 3.5 stars.",
      },
      {
        question: "How should restaurants respond to negative reviews?",
        answer:
          "Respond promptly, professionally, and empathetically. Acknowledge the issue, apologize, and offer to make it right (e.g., a complimentary meal). Never argue or get defensive. Future customers will judge you by how you handle complaints as much as by the complaint itself.",
      },
    ],
  },
  {
    slug: "agency",
    name: "Agency",
    description:
      "Browse marketing and creative agency testimonial examples. These client testimonials highlight campaign results, creative quality, strategic thinking, and client partnership.",
    keywords: [
      "agency testimonial examples",
      "marketing agency testimonials",
      "creative agency reviews",
      "digital agency testimonials",
    ],
    relatedIndustries: ["saas", "consulting", "technology", "ecommerce"],
    collectingTips: [
      "Request testimonials after delivering a successful campaign with strong results",
      "Ask clients to speak about the collaboration process, not just outcomes",
      "Include specific metrics — traffic growth, lead generation, or revenue impact",
      "Time requests around contract renewals when satisfaction is fresh",
    ],
    whyMatters:
      "Agencies compete heavily on reputation and past work. Prospective clients want evidence that an agency can deliver results for businesses like theirs. Testimonials that include specific campaign metrics, describe the working relationship, and mention the strategic thinking behind results are far more persuasive than generic praise in winning new retainers.",
    faq: [
      {
        question: "What metrics should agency testimonials include?",
        answer:
          "The most credible agency testimonials mention specific KPIs like traffic growth percentages, lead generation numbers, conversion rate improvements, ROAS, or revenue attribution. Including the timeframe (e.g., '300% traffic growth in 6 months') adds even more credibility.",
      },
      {
        question: "How can agencies encourage clients to give testimonials?",
        answer:
          "Build testimonial requests into your project workflow — ask during quarterly reviews or after delivering a milestone report. Make it easy by offering to draft a testimonial based on results data for the client to approve and personalize.",
      },
      {
        question: "Should agencies show testimonials from recognizable brands?",
        answer:
          "Yes, well-known logos and testimonials carry significant weight. However, also include testimonials from businesses similar in size and industry to your target clients. Prospects need to see themselves reflected in your success stories.",
      },
    ],
  },
  {
    slug: "education",
    name: "Education",
    description:
      "Explore education testimonial examples from schools, online courses, and EdTech platforms. These student and parent testimonials cover learning outcomes, teaching quality, and program value.",
    keywords: [
      "education testimonial examples",
      "online course testimonials",
      "student testimonial examples",
      "edtech testimonial examples",
    ],
    relatedIndustries: ["saas", "consulting", "nonprofit", "healthcare"],
    collectingTips: [
      "Ask graduates or completers to share their success stories",
      "Collect testimonials at course milestones — midpoint and completion",
      "Request testimonials from parents for K-12 programs",
      "Showcase career outcomes and job placements from alumni",
    ],
    whyMatters:
      "Education is a high-consideration purchase with long-term implications. Students and parents invest significant time and money into educational programs. Testimonials from successful graduates, satisfied parents, and employers who hire alumni provide the social proof needed to overcome hesitation and justify the investment in education.",
    faq: [
      {
        question: "What makes an effective education testimonial?",
        answer:
          "Effective education testimonials describe the student's starting point, the learning experience, and the tangible outcome — whether that's a new job, a skill gained, improved grades, or personal growth. Including the student's background helps prospects relate to the story.",
      },
      {
        question: "Should online courses display completion rates in testimonials?",
        answer:
          "If your completion rates are above industry average (which hovers around 5-15% for MOOCs), absolutely. Combining completion rates with outcome data — like '92% completion rate with 78% of graduates employed within 6 months' — creates powerful social proof.",
      },
      {
        question: "How can EdTech platforms collect more student testimonials?",
        answer:
          "Trigger testimonial requests at achievement moments — certificate earned, project completed, or course finished. Use in-platform prompts, offer a brief survey with an open-ended feedback field, and create a student success story spotlight program.",
      },
    ],
  },
  {
    slug: "consulting",
    name: "Consulting",
    description:
      "Find consulting testimonial examples from management, strategy, and business consulting firms. These client testimonials showcase strategic impact, expertise, and engagement outcomes.",
    keywords: [
      "consulting testimonial examples",
      "management consulting testimonials",
      "business consulting reviews",
      "consulting firm testimonials",
    ],
    relatedIndustries: ["agency", "professional-services", "financial-services", "saas"],
    collectingTips: [
      "Request testimonials at the end of a successful engagement or project",
      "Ask clients to speak about the business impact and strategic value",
      "Include testimonials from senior decision-makers for maximum credibility",
      "Follow up 3-6 months after the engagement to capture long-term results",
    ],
    whyMatters:
      "Consulting is an intangible service sold on trust and expertise. Without a physical product to evaluate, prospects rely almost entirely on the consultant's track record and reputation. Testimonials from senior executives at recognizable companies that describe specific business outcomes are the most effective way to demonstrate value and win new engagements.",
    faq: [
      {
        question: "What should consulting testimonials emphasize?",
        answer:
          "Consulting testimonials should emphasize the strategic impact — revenue growth, cost reduction, operational improvements, or transformation outcomes. They should also highlight the consultant's approach, expertise, and ability to work with senior leadership effectively.",
      },
      {
        question:
          "How do consulting firms handle confidentiality in testimonials?",
        answer:
          "Many clients have NDAs or prefer anonymity. Options include using the client's title and industry without naming the company, obtaining specific permission for a named testimonial, or creating anonymized case studies with the client's approval.",
      },
      {
        question: "Where should consulting firms display testimonials?",
        answer:
          "Feature testimonials on your homepage, service-specific landing pages, proposals and pitch decks, LinkedIn company page, and in email signatures. For consulting, LinkedIn recommendations from senior clients carry exceptional weight.",
      },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    description:
      "Browse professional services testimonial examples from accounting, HR, and business service firms. These client testimonials focus on expertise, reliability, and service quality.",
    keywords: [
      "professional services testimonial examples",
      "accounting firm testimonials",
      "business services reviews",
      "professional services reviews",
    ],
    relatedIndustries: ["consulting", "legal", "financial-services", "insurance"],
    collectingTips: [
      "Ask after completing a successful project or annual engagement",
      "Request testimonials that highlight your firm's reliability and responsiveness",
      "Collect industry-specific testimonials for targeted marketing",
      "Encourage referral-style language that prospects can relate to",
    ],
    whyMatters:
      "Professional services are built on long-term relationships and trust. Clients are essentially hiring expertise they cannot easily evaluate themselves. Testimonials that demonstrate competence, reliability, and a genuine understanding of the client's business help differentiate your firm in a market where services often appear commoditized.",
    faq: [
      {
        question: "How are professional services testimonials different from product reviews?",
        answer:
          "Professional services testimonials focus on the relationship and expertise rather than a tangible product. They emphasize responsiveness, strategic guidance, attention to detail, and the professional's ability to understand and solve complex business problems.",
      },
      {
        question: "Should professional services firms use video testimonials?",
        answer:
          "Video testimonials are highly effective for professional services because they convey genuine emotion and build personal connection. A 60-90 second video from a satisfied client is often more persuasive than a lengthy written case study.",
      },
      {
        question: "How often should professional services firms update their testimonials?",
        answer:
          "Aim to add 2-3 new testimonials per quarter. Recent testimonials signal that your firm is actively delivering great results. Rotate featured testimonials on your homepage seasonally and archive older ones on a dedicated testimonials page.",
      },
    ],
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    description:
      "Explore financial services testimonial examples from banks, advisors, and fintech companies. These client testimonials highlight trust, performance, and financial guidance quality.",
    keywords: [
      "financial services testimonial examples",
      "financial advisor testimonials",
      "fintech testimonial examples",
      "wealth management testimonials",
    ],
    relatedIndustries: ["insurance", "real-estate", "consulting", "professional-services"],
    collectingTips: [
      "Ask after a significant financial milestone — retirement planning completion, portfolio growth",
      "Ensure testimonials comply with SEC and FINRA regulations",
      "Focus on the advisory relationship and peace of mind, not specific returns",
      "Request testimonials from long-term clients who can speak to consistency",
    ],
    whyMatters:
      "Financial decisions involve deep trust — people are sharing their most sensitive information and relying on your guidance for their future. Testimonials from clients who describe feeling secure, well-advised, and confident in their financial decisions are powerful. Regulatory compliance is essential, so focus on the experience and relationship rather than promising specific returns.",
    faq: [
      {
        question: "Can financial advisors use client testimonials?",
        answer:
          "Yes, since the SEC's updated marketing rule (effective November 2022), investment advisors can use client testimonials in their marketing. However, testimonials must not be misleading, must include appropriate disclosures, and cannot promise or guarantee specific investment results.",
      },
      {
        question: "What disclosures are required for financial services testimonials?",
        answer:
          "Disclosures should state whether the testimonial was from a current client, whether compensation was provided, and that the testimonial may not be representative of all clients' experiences. Consult your compliance team for specific requirements under SEC and FINRA rules.",
      },
      {
        question: "What should financial services testimonials focus on?",
        answer:
          "Focus on the client relationship — communication quality, responsiveness, peace of mind, financial planning process, and long-term trust. Avoid specific performance numbers or guarantees. Testimonials about the advisor's educational approach and proactive guidance resonate strongly.",
      },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    description:
      "Find insurance testimonial examples from agencies, brokers, and insurtech companies. These policyholder testimonials focus on claims experience, coverage guidance, and service quality.",
    keywords: [
      "insurance testimonial examples",
      "insurance agent testimonials",
      "insurance company reviews",
      "policyholder testimonial examples",
    ],
    relatedIndustries: ["financial-services", "real-estate", "healthcare", "legal"],
    collectingTips: [
      "Ask after a positive claims experience — this is when gratitude peaks",
      "Request testimonials from clients who recently renewed their policies",
      "Encourage testimonials about the advisory process, not just pricing",
      "Collect testimonials from both personal and commercial lines clients",
    ],
    whyMatters:
      "Insurance is a product people buy hoping they never need — but when they do, the experience defines everything. Testimonials from policyholders who had seamless claims experiences or received exceptional guidance during stressful moments carry enormous weight. Trust and reliability are the core differentiators in insurance, and testimonials demonstrate both.",
    faq: [
      {
        question: "When is the best time to ask for insurance testimonials?",
        answer:
          "The best time is immediately after a positive claims experience — the client is grateful and the emotions are fresh. Also effective: after helping a client save money on premiums, after a thorough coverage review that uncovered gaps, or at annual renewal if the client expresses satisfaction.",
      },
      {
        question: "What should insurance testimonials highlight?",
        answer:
          "The most impactful insurance testimonials describe claims experiences ('They processed my claim in 48 hours'), the agent's expertise in finding the right coverage, and the feeling of security and trust. Speed, transparency, and personal attention are key themes.",
      },
      {
        question: "How can insurance agencies stand out with testimonials?",
        answer:
          "Focus on stories that show your human side — helping families after disasters, guiding businesses through complex coverage decisions, or going above and beyond during a crisis. These emotional stories differentiate you from faceless insurance companies.",
      },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    description:
      "Browse retail testimonial examples from brick-and-mortar and omnichannel retailers. These customer testimonials cover shopping experience, product selection, staff helpfulness, and store atmosphere.",
    keywords: [
      "retail testimonial examples",
      "retail store reviews",
      "customer review examples retail",
      "shopping experience testimonials",
    ],
    relatedIndustries: ["ecommerce", "restaurant", "hospitality", "manufacturing"],
    collectingTips: [
      "Include review request cards in shopping bags at checkout",
      "Send SMS or email follow-ups after in-store purchases",
      "Use loyalty program touchpoints to request feedback",
      "Display a review station or QR code near the store exit",
    ],
    whyMatters:
      "Retail testimonials bridge the gap between online research and in-store experience. Modern shoppers research stores online before visiting in person. Reviews that highlight product selection, staff knowledge, store atmosphere, and customer service help drive foot traffic. For retailers competing with e-commerce, testimonials about the in-store experience are a critical differentiator.",
    faq: [
      {
        question: "How do retail testimonials differ from e-commerce reviews?",
        answer:
          "Retail testimonials often emphasize the in-store experience — staff helpfulness, store atmosphere, product discovery, and personal service. E-commerce reviews tend to focus on the product itself, shipping, and the online shopping process.",
      },
      {
        question: "Should retail stores respond to online reviews?",
        answer:
          "Absolutely. Responding to reviews shows potential customers that you value feedback and are engaged with your community. Thank positive reviewers by name, address negative reviews with empathy and solutions, and invite unhappy customers to reach out directly.",
      },
      {
        question: "How can retail stores get more customer reviews?",
        answer:
          "Train staff to ask happy customers to leave a review, include a QR code on receipts, create a simple feedback station near the exit, offer loyalty points for leaving a review, and follow up with email or SMS after purchases that include a direct review link.",
      },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    description:
      "Explore hospitality testimonial examples from hotels, resorts, and vacation rentals. These guest testimonials cover accommodation quality, service excellence, and memorable experiences.",
    keywords: [
      "hospitality testimonial examples",
      "hotel review examples",
      "hospitality customer reviews",
      "resort testimonial examples",
    ],
    relatedIndustries: ["restaurant", "retail", "real-estate", "fitness"],
    collectingTips: [
      "Send a review request email within 24 hours of checkout",
      "Train front desk staff to mention reviews at checkout for happy guests",
      "Place QR codes on room key cards or in-room materials",
      "Follow up with a personal thank-you note and a review link",
    ],
    whyMatters:
      "Hospitality is inherently experiential — guests cannot preview their stay. Reviews and testimonials are the primary research tool for travelers, with 81% reading reviews before booking. Detailed testimonials about room quality, staff friendliness, amenities, and location help guests set expectations and feel confident in their booking decisions.",
    faq: [
      {
        question: "What details should hospitality testimonials include?",
        answer:
          "Effective hospitality testimonials describe the room quality, staff interactions, dining experience, location convenience, and any special touches that made the stay memorable. Mentioning the occasion (anniversary, business trip, family vacation) helps future guests relate.",
      },
      {
        question: "How do hotel reviews impact booking decisions?",
        answer:
          "Hotel reviews are the #1 factor in booking decisions after price and location. A one-point increase in review scores can boost revenue per room by up to 11%. Hotels with 40+ reviews and 4.0+ ratings significantly outperform competitors in booking volume.",
      },
      {
        question: "Should hotels respond to every guest review?",
        answer:
          "Yes. Hotels that respond to reviews see 12% more reviews and higher overall ratings. Personalized responses show future guests that the hotel values feedback. For negative reviews, a thoughtful response with a specific solution can actually increase booking intent.",
      },
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    description:
      "Find technology testimonial examples from IT companies, tech startups, and hardware providers. These customer testimonials highlight innovation, reliability, performance, and technical support.",
    keywords: [
      "technology testimonial examples",
      "tech company testimonials",
      "IT company reviews",
      "tech product testimonials",
    ],
    relatedIndustries: ["saas", "manufacturing", "consulting", "education"],
    collectingTips: [
      "Collect testimonials after successful implementation or deployment",
      "Ask about uptime, performance improvements, and technical support quality",
      "Request testimonials from IT decision-makers and end users separately",
      "Time requests after major upgrades or product milestones",
    ],
    whyMatters:
      "Technology purchases involve significant investment and risk. Decision-makers need proof that a solution works reliably, scales well, and comes with strong support. Testimonials from technical peers — CTOs, IT directors, and engineers — who can speak to implementation experience, performance metrics, and vendor responsiveness are critical in the evaluation process.",
    faq: [
      {
        question: "What should technology testimonials focus on?",
        answer:
          "Technology testimonials should focus on reliability (uptime, performance), implementation experience (ease of deployment, documentation quality), support quality (response times, expertise), and measurable business impact (efficiency gains, cost savings, or revenue growth).",
      },
      {
        question: "How do B2B tech companies use testimonials effectively?",
        answer:
          "B2B tech companies place testimonials on product pages, near pricing sections, in sales decks, and on landing pages targeted at specific industries. Pairing testimonials with case studies and customer logos creates a comprehensive social proof strategy.",
      },
      {
        question: "Should tech companies collect testimonials from different stakeholders?",
        answer:
          "Yes. Collect from decision-makers (ROI, business impact), technical implementers (ease of use, documentation), and end users (daily experience, productivity gains). Different prospects will relate to different perspectives during the buying process.",
      },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    description:
      "Browse automotive testimonial examples from dealerships, repair shops, and auto service businesses. These customer testimonials cover sales experience, service quality, and vehicle satisfaction.",
    keywords: [
      "automotive testimonial examples",
      "car dealership testimonials",
      "auto repair reviews",
      "car buying testimonials",
    ],
    relatedIndustries: ["retail", "insurance", "financial-services", "manufacturing"],
    collectingTips: [
      "Send a follow-up message 48 hours after vehicle purchase or service completion",
      "Ask about the sales or service experience, not just the vehicle",
      "Collect video testimonials on the showroom floor after delivery",
      "Follow up at the first service appointment to reinforce the positive relationship",
    ],
    whyMatters:
      "Car buying is one of the most researched purchase decisions consumers make. Automotive testimonials that describe the buying experience — transparency, no-pressure sales, fair pricing, and attentive service — help dealerships overcome the widespread distrust of car sales. For service shops, testimonials about honest diagnoses and fair pricing build the trust needed for repeat business.",
    faq: [
      {
        question: "What makes a great car dealership testimonial?",
        answer:
          "The best dealership testimonials mention the sales process (transparent pricing, no pressure), the specific vehicle purchased, the salesperson by name, and any exceptional service (trade-in handling, financing assistance, after-sale follow-up). Personal touches that went above expectations stand out.",
      },
      {
        question: "How important are online reviews for auto repair shops?",
        answer:
          "Extremely important. Auto repair is an industry plagued by trust issues. Reviews mentioning honest diagnoses, fair pricing, clear communication, and quality work are the primary way consumers choose a mechanic. Shops with 4.5+ stars and 50+ reviews dominate local search.",
      },
      {
        question: "Should automotive businesses ask for reviews on specific platforms?",
        answer:
          "Focus on Google (most visible in local search), then platform-specific sites like Cars.com, DealerRater, or CarGurus for dealerships, and Yelp for service shops. Having a strong presence on multiple platforms covers different customer search behaviors.",
      },
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    description:
      "Explore legal testimonial examples from law firms, attorneys, and legal service providers. These client testimonials focus on expertise, communication, outcomes, and the client experience.",
    keywords: [
      "legal testimonial examples",
      "law firm testimonials",
      "attorney review examples",
      "lawyer testimonial examples",
    ],
    relatedIndustries: ["professional-services", "real-estate", "insurance", "consulting"],
    collectingTips: [
      "Ask after a successful case resolution or transaction completion",
      "Ensure testimonials comply with your state bar's advertising rules",
      "Focus on the client experience — communication, empathy, and guidance",
      "Collect testimonials across practice areas for targeted marketing",
    ],
    whyMatters:
      "Legal matters are high-stakes and deeply personal. Clients seeking an attorney need reassurance about both competence and compassion. Testimonials from past clients who describe feeling heard, well-represented, and confident in their legal counsel help prospective clients overcome the intimidation factor. Bar rules vary by state, so compliance is essential.",
    faq: [
      {
        question: "Can law firms use client testimonials in advertising?",
        answer:
          "Most states allow attorney testimonials but with specific restrictions. Many require disclaimers that results may vary and that the testimonial is not a guarantee of future outcomes. Check your state bar's advertising rules before publishing testimonials — requirements vary significantly by jurisdiction.",
      },
      {
        question: "What should law firm testimonials focus on?",
        answer:
          "Focus on the client experience — the attorney's communication style, responsiveness, empathy, thoroughness, and ability to explain complex legal matters clearly. Clients should describe feeling supported and well-informed throughout the legal process.",
      },
      {
        question: "How can attorneys collect more client testimonials?",
        answer:
          "Ask at the conclusion of a successful matter while gratitude is high. Send a brief email with a direct link to your Google or Avvo profile. For clients who prefer privacy, offer anonymous or initials-only options. Make the request personal — a direct ask from the attorney carries more weight.",
      },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    description:
      "Find construction testimonial examples from contractors, builders, and home renovation companies. These client testimonials highlight craftsmanship, project management, communication, and results.",
    keywords: [
      "construction testimonial examples",
      "contractor testimonials",
      "builder review examples",
      "home renovation testimonials",
    ],
    relatedIndustries: ["real-estate", "manufacturing", "professional-services", "retail"],
    collectingTips: [
      "Take before-and-after photos and ask clients to review at project completion",
      "Send a review request at the final walkthrough when satisfaction is highest",
      "Ask clients to mention specific aspects — timeline adherence, budget accuracy, quality",
      "Follow up at the 6-month mark to capture long-term satisfaction",
    ],
    whyMatters:
      "Construction and home improvement are among the most trust-sensitive industries. Homeowners invite contractors into their homes and invest significant money in projects with long-lasting impact. Testimonials with before-and-after visuals, mentions of on-time and on-budget delivery, and descriptions of clear communication help overcome the widespread fear of contractor horror stories.",
    faq: [
      {
        question: "What makes a strong construction testimonial?",
        answer:
          "Strong construction testimonials mention the project type and scope, adherence to budget and timeline, quality of craftsmanship, communication throughout the project, and how the crew treated the home or worksite. Before-and-after photos make these testimonials significantly more impactful.",
      },
      {
        question: "Where should contractors display testimonials?",
        answer:
          "Display testimonials on your website (especially near your contact form), Google Business Profile, Houzz, HomeAdvisor, and social media. Include them in proposals and estimates — seeing recent client praise at the decision point significantly increases conversion.",
      },
      {
        question: "How can contractors encourage clients to leave reviews?",
        answer:
          "Ask at the final walkthrough when the client sees the finished project and is most impressed. Send a follow-up email or text with a direct link to leave a review. Offer a simple referral card they can share with neighbors. Respond to every review to show you value feedback.",
      },
    ],
  },
  {
    slug: "nonprofit",
    name: "Nonprofit",
    description:
      "Browse nonprofit testimonial examples from charities, foundations, and social impact organizations. These testimonials from donors, volunteers, and beneficiaries highlight mission impact and community change.",
    keywords: [
      "nonprofit testimonial examples",
      "charity testimonials",
      "donor testimonial examples",
      "nonprofit impact testimonials",
    ],
    relatedIndustries: ["education", "healthcare", "consulting", "professional-services"],
    collectingTips: [
      "Collect impact stories from program beneficiaries with their consent",
      "Ask donors to share why they support your mission",
      "Gather volunteer testimonials about their experience",
      "Document stories at program milestones and annual events",
    ],
    whyMatters:
      "Nonprofits depend on trust and emotional connection to attract donors, volunteers, and supporters. Testimonials from beneficiaries who share their transformation stories, donors who explain their giving motivation, and volunteers who describe their experience bring the mission to life. These stories are far more compelling than statistics alone in fundraising campaigns.",
    faq: [
      {
        question: "What types of testimonials should nonprofits collect?",
        answer:
          "Collect three types: beneficiary testimonials (impact stories from those you serve), donor testimonials (why they support your mission and how giving makes them feel), and volunteer testimonials (the experience of contributing time and skills). Together, these cover all your audience segments.",
      },
      {
        question: "How should nonprofits handle sensitive beneficiary stories?",
        answer:
          "Always obtain informed consent, offer anonymity options, let beneficiaries review and approve their stories before publication, and never pressure anyone to share. For vulnerable populations, consider using composite stories or first-name-only formats. Dignity and respect should guide every interaction.",
      },
      {
        question: "Where should nonprofits use testimonials?",
        answer:
          "Feature testimonials prominently on donation pages (they can increase giving by 30%+), annual reports, email campaigns, grant applications, social media, and event materials. Impact stories from beneficiaries work best on donation pages, while donor testimonials are ideal for peer-to-peer fundraising.",
      },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description:
      "Explore manufacturing testimonial examples from industrial suppliers, OEMs, and custom fabrication companies. These B2B testimonials highlight product quality, delivery reliability, and technical partnership.",
    keywords: [
      "manufacturing testimonial examples",
      "industrial supplier testimonials",
      "b2b manufacturing reviews",
      "manufacturing company testimonials",
    ],
    relatedIndustries: ["construction", "technology", "automotive", "retail"],
    collectingTips: [
      "Request testimonials after on-time delivery of a large or complex order",
      "Ask about quality consistency, technical support, and lead times",
      "Collect testimonials from procurement managers and engineers separately",
      "Time requests around contract renewals or order milestones",
    ],
    whyMatters:
      "Manufacturing decisions are driven by reliability, quality, and cost efficiency. B2B buyers need evidence that a supplier can deliver consistently at scale. Testimonials from procurement managers and engineers who speak to quality control, on-time delivery rates, technical support, and long-term partnership value are critical in winning large supply agreements.",
    faq: [
      {
        question: "What should manufacturing testimonials emphasize?",
        answer:
          "Manufacturing testimonials should emphasize product quality and consistency, on-time delivery performance, technical support and engineering collaboration, pricing competitiveness, and the supplier's ability to handle custom or complex requirements. Include specific metrics when possible.",
      },
      {
        question: "How do B2B manufacturers collect testimonials?",
        answer:
          "Leverage existing relationships — ask key accounts during quarterly business reviews, at trade shows, or after successful project completions. Offer to write a draft testimonial based on known results for the client to review and approve. Include testimonial requests in your customer satisfaction survey process.",
      },
      {
        question: "Where are manufacturing testimonials most effective?",
        answer:
          "Place testimonials on product pages, capability pages, and near RFQ forms on your website. Include them in sales presentations, trade show materials, and proposals. Industry-specific testimonials on targeted landing pages perform significantly better than generic ones.",
      },
    ],
  },
];

// ---- Testimonials by industry ----

export const industryTestimonials: Record<string, IndustryTestimonial[]> = {
  saas: [
    { id: 1, quote: "We migrated our entire team to this platform in under a week. The onboarding flow was so intuitive that we didn't need a single training session. Productivity jumped 30% in the first month.", author: "Sarah Chen", role: "VP of Engineering", company: "TechFlow", rating: 5 },
    { id: 2, quote: "We replaced three separate tools with this one solution. Saved $2,400/month and the workflow is actually smoother now. Best consolidation decision we've made.", author: "Marcus Rivera", role: "CTO", company: "DataSync", rating: 5 },
    { id: 3, quote: "The API documentation is the best I've seen. Our developers had the integration running in under an hour, and the sandbox environment made testing painless.", author: "Priya Patel", role: "Lead Developer", company: "BuildKit", rating: 5 },
    { id: 4, quote: "Support response time went from 4 hours to 15 minutes after implementing this. Our CSAT scores jumped from 72% to 94%. The automation handles 60% of tickets without human intervention.", author: "James Liu", role: "Head of Support", company: "CloudBase", rating: 5 },
    { id: 5, quote: "We tried five different project management tools before this one. The difference is night and day — everything just works, and our team actually enjoys using it.", author: "Emily Thornton", role: "Product Manager", company: "Launchpad", rating: 5 },
    { id: 6, quote: "After integrating this into our sales workflow, our team closed 22% more deals in Q3. The analytics dashboards gave us visibility we never had before.", author: "David Okonkwo", role: "VP of Sales", company: "RevenueStack", rating: 5 },
    { id: 7, quote: "The security features alone justified the switch. SOC 2 compliance, role-based access, audit logs — everything our enterprise clients require was built in from day one.", author: "Rachel Kim", role: "CISO", company: "ShieldNet", rating: 5 },
    { id: 8, quote: "Honest review: the learning curve exists for power users, but the support team walked us through every step. Within two weeks, our team was fully autonomous.", author: "Tom Bradley", role: "Operations Manager", company: "ScaleOps", rating: 4 },
    { id: 9, quote: "This platform reduced our customer churn by 18% in just one quarter. The automated engagement features and health scores are game changers for customer success teams.", author: "Nina Vasquez", role: "VP of Customer Success", company: "RetainIQ", rating: 5 },
    { id: 10, quote: "We're a 12-person startup and this tool makes us feel like a 50-person team. The automation handles repetitive tasks so we can focus on building product.", author: "Alex Petrov", role: "Co-Founder", company: "NovaBuild", rating: 5 },
  ],
  ecommerce: [
    { id: 11, quote: "The quality exceeded my expectations. The fabric is soft, the stitching is perfect, and it fits exactly as described. Already ordered two more in different colors.", author: "Jessica Moore", role: "Customer", company: "StyleHaven", rating: 5 },
    { id: 12, quote: "I was hesitant to order skincare online, but the ingredient transparency and detailed reviews convinced me. My skin has never looked better after 4 weeks of use.", author: "Amanda Torres", role: "Customer", company: "GlowNaturals", rating: 5 },
    { id: 13, quote: "Ordered on Monday, arrived Wednesday. The packaging was beautiful and the product quality matched the photos exactly. This is how online shopping should work.", author: "Ryan Mitchell", role: "Customer", company: "CraftedGoods", rating: 5 },
    { id: 14, quote: "I've been buying from this store for three years now. The quality hasn't dipped once, and their customer service team has resolved every issue within hours.", author: "Karen Phillips", role: "Repeat Customer", company: "EverWear", rating: 5 },
    { id: 15, quote: "The personalization options are incredible. I designed a custom gift for my wife's birthday and the final product was even better than the preview. She absolutely loved it.", author: "Brian Walsh", role: "Customer", company: "PersonalTouch", rating: 5 },
    { id: 16, quote: "Found a defect in my order and the support team shipped a replacement before I even sent the original back. That kind of trust in your customers builds serious loyalty.", author: "Diana Chen", role: "Customer", company: "HomeEssentials", rating: 5 },
    { id: 17, quote: "Great product for the price. Not luxury quality, but solid construction and exactly what I needed. The size guide was accurate and shipping was on time.", author: "Mike Johnson", role: "Customer", company: "UrbanBasics", rating: 4 },
    { id: 18, quote: "I've been searching for sustainable packaging and ethical sourcing in this category for years. Finally found a brand that delivers on both without compromising quality.", author: "Sophie Laurent", role: "Customer", company: "EarthFirst", rating: 5 },
    { id: 19, quote: "The subscription model is perfect for replenishable products. I never run out, the price is better than one-time purchases, and I can skip or cancel anytime.", author: "Chris Huang", role: "Subscriber", company: "FreshCycle", rating: 5 },
    { id: 20, quote: "Returned an item that didn't fit — no questions asked, full refund within 3 days. The hassle-free return policy is what keeps me coming back.", author: "Lisa Brennan", role: "Customer", company: "FitStyle", rating: 4 },
  ],
  healthcare: [
    { id: 21, quote: "Dr. Martinez and her team made my knee replacement recovery smooth and reassuring. Every question was answered patiently, and the follow-up care was exceptional.", author: "Robert Daniels", role: "Patient", company: "OrthoCare Clinic", rating: 5 },
    { id: 22, quote: "As a parent, finding a pediatrician who listens is everything. Dr. Kim takes the time to explain every diagnosis and never rushes us out of the office.", author: "Michelle Adams", role: "Parent", company: "Bright Pediatrics", rating: 5 },
    { id: 23, quote: "The telehealth platform is seamless. I connected with a specialist within 15 minutes, got a clear diagnosis, and had my prescription sent to my pharmacy — all from my couch.", author: "Daniel Foster", role: "Patient", company: "MediConnect", rating: 5 },
    { id: 24, quote: "After years of chronic pain, the treatment plan Dr. Patel developed has given me my life back. I went from daily pain medication to exercising three times a week.", author: "Nancy Williams", role: "Patient", company: "Integrative Wellness Center", rating: 5 },
    { id: 25, quote: "The staff at this clinic treat every patient with genuine care. From the front desk to the nurses to the physicians, you feel like a person, not a number.", author: "James Harper", role: "Patient", company: "Community Health Partners", rating: 5 },
    { id: 26, quote: "Implementing their EHR system across our 12-location practice took just 6 weeks. The training was thorough and our providers actually prefer it to our old system.", author: "Dr. Lisa Wong", role: "Medical Director", company: "Pacific Medical Group", rating: 5 },
    { id: 27, quote: "The wait times are reasonable and the appointment scheduling app is excellent. Being able to see my lab results online before my follow-up saves so much time.", author: "Thomas Gray", role: "Patient", company: "HealthFirst Medical", rating: 4 },
    { id: 28, quote: "My dental anxiety is real, and Dr. Chen's office is the first place where I've felt completely comfortable. The sedation options and gentle approach changed everything.", author: "Maria Santos", role: "Patient", company: "Gentle Dental Care", rating: 5 },
    { id: 29, quote: "The patient portal reduced our no-show rate by 35% and phone call volume by 40%. It's been a game-changer for both patient satisfaction and operational efficiency.", author: "Sarah Mitchell", role: "Practice Manager", company: "Valley Medical Associates", rating: 5 },
    { id: 30, quote: "What I appreciate most is the preventive care approach. My doctor doesn't just treat symptoms — she works with me on nutrition, exercise, and long-term wellness goals.", author: "Kevin Brooks", role: "Patient", company: "Preventive Health Center", rating: 5 },
  ],
  "real-estate": [
    { id: 31, quote: "Jennifer found us our dream home in a market where houses were selling in 48 hours. Her strategy of scheduling viewings the moment listings went live was brilliant.", author: "Michael Thompson", role: "Home Buyer", company: "Premier Realty Group", rating: 5 },
    { id: 32, quote: "We sold our house $40K over asking price in just 5 days. Sarah's staging advice and marketing strategy made all the difference. She earned every penny of her commission.", author: "David Nguyen", role: "Home Seller", company: "Skyline Real Estate", rating: 5 },
    { id: 33, quote: "As first-time buyers, we had a million questions. Mark was patient, explained every step of the process, and never pressured us. He genuinely had our best interests at heart.", author: "Emma Richardson", role: "First-Time Buyer", company: "Hometown Realty", rating: 5 },
    { id: 34, quote: "The investment property analysis was incredibly detailed. Jason identified cash flow opportunities we would have missed. Our rental portfolio has grown 40% under his guidance.", author: "Robert Chen", role: "Real Estate Investor", company: "Capital Property Group", rating: 5 },
    { id: 35, quote: "Relocating from out of state was stressful, but Lisa handled everything — virtual tours, neighborhood research, school district analysis. We moved into the perfect home sight unseen.", author: "Catherine Walsh", role: "Relocation Buyer", company: "NextHome Partners", rating: 5 },
    { id: 36, quote: "Our condo sat on the market for 3 months with another agent. After switching to this team, they repriced, restaged, and sold it in 2 weeks. Fresh perspective made all the difference.", author: "Steven Park", role: "Condo Seller", company: "Metro Property Advisors", rating: 5 },
    { id: 37, quote: "Good communication throughout the process. The only hiccup was during the inspection negotiation, but the team handled it professionally and we closed on time.", author: "Andrea Simmons", role: "Home Buyer", company: "Trusted Home Realty", rating: 4 },
    { id: 38, quote: "We've bought and sold four properties with this agent over 8 years. That kind of consistency and trust is rare. She's our realtor for life.", author: "Patricia Morales", role: "Repeat Client", company: "Landmark Real Estate", rating: 5 },
    { id: 39, quote: "The property management service has been flawless. Tenant screening, maintenance coordination, and monthly reporting — all handled so I can truly be a passive investor.", author: "Andrew Kim", role: "Property Owner", company: "Cascade Property Management", rating: 5 },
    { id: 40, quote: "Working with a luxury real estate specialist changed everything. The marketing materials, private showings, and negotiation skills are on a completely different level.", author: "Victoria Sterling", role: "Luxury Home Seller", company: "Prestige Properties", rating: 5 },
  ],
  fitness: [
    { id: 41, quote: "I lost 35 pounds in 6 months with Coach Mike's program. It wasn't just the workouts — the nutrition guidance and accountability check-ins kept me on track.", author: "Rachel Torres", role: "Member", company: "FitForge Gym", rating: 5 },
    { id: 42, quote: "I've tried every gym in town. This one is different because the trainers actually care about your form and progress. I finally feel safe lifting heavy weights.", author: "Derek Washington", role: "Member", company: "IronWorks Fitness", rating: 5 },
    { id: 43, quote: "The group classes are addictive. The energy, the music, the instructors — I went from dreading the gym to looking forward to my 6 AM workout. That's a first for me.", author: "Katie Sullivan", role: "Member", company: "Pulse Studio", rating: 5 },
    { id: 44, quote: "As a 62-year-old with bad knees, I was nervous about starting. The senior fitness program is perfectly adapted — I'm stronger and more flexible than I've been in a decade.", author: "Harold Peterson", role: "Member", company: "VitalFit Center", rating: 5 },
    { id: 45, quote: "The online training platform made it possible to work out while traveling for work. My trainer adjusts my program based on what equipment is available at hotel gyms.", author: "Sam Brooks", role: "Online Client", company: "FlexCoach", rating: 5 },
    { id: 46, quote: "I trained for my first marathon with Coach Lisa. She built a program that fit my schedule and gradually built my endurance. Crossed the finish line in 4:12 — a dream come true.", author: "Megan Clark", role: "Client", company: "RunFit Coaching", rating: 5 },
    { id: 47, quote: "Good gym, solid equipment, and the classes are well-structured. My only wish is for longer operating hours on weekends. Otherwise, great value for the membership price.", author: "Jason Miller", role: "Member", company: "Peak Performance Gym", rating: 4 },
    { id: 48, quote: "The yoga program helped me manage my chronic back pain better than any treatment I've tried. The instructors modify poses for every ability level. Truly inclusive.", author: "Priya Sharma", role: "Member", company: "Balance Yoga Studio", rating: 5 },
    { id: 49, quote: "My 16-year-old son gained confidence along with strength through the teen training program. The coaches are positive role models and the environment is supportive, never intimidating.", author: "Laura Hendricks", role: "Parent", company: "NextGen Athletics", rating: 5 },
    { id: 50, quote: "After physical therapy for my shoulder, the personal trainers here created a rehabilitation-focused program that got me back to full strength. They coordinated with my PT the entire time.", author: "Chris Romano", role: "Member", company: "RestoreFit", rating: 5 },
  ],
  restaurant: [
    { id: 51, quote: "The tasting menu was a culinary experience from start to finish. Every course surprised us, and the wine pairings were spot-on. We've already made our reservation to come back.", author: "Nicole Dupont", role: "Diner", company: "Maison Blanche", rating: 5 },
    { id: 52, quote: "Best brunch in the city. The eggs Benedict with house-made hollandaise is worth the 20-minute wait on weekends. The coffee is exceptional too.", author: "Jordan Ellis", role: "Regular Customer", company: "The Morning Table", rating: 5 },
    { id: 53, quote: "We hosted our company holiday dinner here for 45 guests. The private dining room, custom menu, and attentive service made it our best corporate event yet.", author: "Patricia Wells", role: "Event Planner", company: "Amaro Restaurant", rating: 5 },
    { id: 54, quote: "As someone with severe food allergies, dining out is stressful. This restaurant took my allergies seriously, the chef came to our table, and the meal was incredible and safe.", author: "Tom Richards", role: "Diner", company: "Green Kitchen", rating: 5 },
    { id: 55, quote: "The farm-to-table menu changes with the seasons and every visit feels new. The quality of ingredients shines through in every dish. This is what local dining should be.", author: "Sarah Olsen", role: "Diner", company: "Harvest & Vine", rating: 5 },
    { id: 56, quote: "Fast, friendly, and consistently delicious. We order takeout from here at least twice a week. The online ordering system is seamless and our food always arrives hot.", author: "Kevin Chang", role: "Regular Customer", company: "Noodle House", rating: 5 },
    { id: 57, quote: "Great food and atmosphere. Service was a little slow on a Saturday night, but the waiter was apologetic and the manager brought us complimentary dessert. Classy move.", author: "Amanda Foster", role: "Diner", company: "Bistro 42", rating: 4 },
    { id: 58, quote: "My daughter's birthday dinner was magical. The staff surprised her with a personalized dessert and the whole team sang. She still talks about it weeks later.", author: "Michael Reyes", role: "Diner", company: "Bella Cucina", rating: 5 },
    { id: 59, quote: "The catering for our wedding of 150 guests was flawless. Every dietary restriction was accommodated, the presentation was beautiful, and guests raved about the food all night.", author: "Emily Watson", role: "Client", company: "Savour Catering", rating: 5 },
    { id: 60, quote: "We've been coming here every Friday for two years. The bartender knows our names and our orders. That kind of personal touch is what turns a restaurant into a second home.", author: "Greg Hoffman", role: "Regular", company: "The Corner Pub", rating: 5 },
  ],
  agency: [
    { id: 61, quote: "Our organic traffic grew 340% in 8 months. The SEO strategy they developed wasn't just keyword stuffing — it was genuine content that our customers actually want to read.", author: "Rachel Summers", role: "CMO", company: "GrowthPath", rating: 5 },
    { id: 62, quote: "The rebrand transformed our market perception. We went from looking like a startup to being taken seriously by enterprise buyers. Pipeline quality improved overnight.", author: "Nathan Cole", role: "CEO", company: "Apex Solutions", rating: 5 },
    { id: 63, quote: "We've worked with three agencies in 5 years. This is the first one that truly understands our business. They don't just execute tasks — they challenge our thinking and improve our strategy.", author: "Sophia Chen", role: "VP of Marketing", company: "TrueNorth Analytics", rating: 5 },
    { id: 64, quote: "Our paid media ROAS went from 2.1x to 5.8x in one quarter. The team audited our campaigns, restructured our targeting, and optimized creative with A/B testing that actually moved the needle.", author: "Daniel Park", role: "Growth Lead", company: "LaunchPad SaaS", rating: 5 },
    { id: 65, quote: "The social media management has been outstanding. Our LinkedIn engagement tripled and we're generating 15-20 qualified leads per month directly from organic social content.", author: "Maria Gonzalez", role: "Marketing Director", company: "Precision Manufacturing", rating: 5 },
    { id: 66, quote: "They built our entire demand gen engine from scratch — email nurture sequences, landing pages, lead scoring, and attribution reporting. We went from zero to 200 MQLs per month.", author: "Jason Wright", role: "Head of Growth", company: "ScaleUp Ventures", rating: 5 },
    { id: 67, quote: "Solid execution on the website redesign. The project came in on budget and close to the original timeline. Communication was good, though we wished for more proactive updates.", author: "Karen Liu", role: "Marketing Manager", company: "Vertex Technologies", rating: 4 },
    { id: 68, quote: "The content strategy they developed generates $180K in monthly attributed revenue through our blog alone. That ROI is unlike anything we've seen from previous content investments.", author: "Chris Morton", role: "VP of Revenue", company: "DataBridge", rating: 5 },
    { id: 69, quote: "Their creative team produced a brand video that's been viewed 2 million times. But beyond the views, the brand awareness lift measurably increased our direct traffic by 60%.", author: "Amanda Reynolds", role: "Brand Director", company: "EcoVenture", rating: 5 },
    { id: 70, quote: "As a B2B company with a niche audience, we needed an agency that understood complex sales cycles. Their ABM strategy helped us close 3 enterprise accounts worth $1.2M combined.", author: "Peter Hoffman", role: "CEO", company: "InfraCore", rating: 5 },
  ],
  education: [
    { id: 71, quote: "The data science bootcamp was worth every penny. Within 3 months of graduating, I landed a data analyst role with a 45% salary increase. The career services team was incredible.", author: "Michael Nguyen", role: "Graduate", company: "DataCamp Academy", rating: 5 },
    { id: 72, quote: "My son went from struggling in math to being top of his class. The tutors don't just help with homework — they teach learning strategies that transfer to every subject.", author: "Sandra Williams", role: "Parent", company: "BrightMinds Tutoring", rating: 5 },
    { id: 73, quote: "The online MBA program fit perfectly around my full-time job. The coursework was rigorous, the professors were accessible, and the networking opportunities were comparable to in-person programs.", author: "James Mitchell", role: "Graduate", company: "Global Business School Online", rating: 5 },
    { id: 74, quote: "We rolled out their corporate training platform to 500 employees. Completion rates are 78% — compared to 20% with our previous LMS. The gamification and microlearning format works.", author: "Lisa Harper", role: "L&D Director", company: "Atlas Corporation", rating: 5 },
    { id: 75, quote: "The coding curriculum for kids is brilliant. My 10-year-old built her first game in 4 weeks and now talks about becoming a programmer. The instructors make complex concepts fun and accessible.", author: "David Patel", role: "Parent", company: "CodeKids Academy", rating: 5 },
    { id: 76, quote: "As a career changer at 42, I was nervous about going back to school. The UX design program's supportive community and portfolio-focused approach gave me confidence — and a new career.", author: "Christine Taylor", role: "Graduate", company: "DesignShift School", rating: 5 },
    { id: 77, quote: "The language immersion program exceeded expectations. After 8 weeks, I was conversational in Spanish. The combination of live tutoring and AI practice tools is incredibly effective.", author: "Andrew Kim", role: "Student", company: "LinguaLive", rating: 5 },
    { id: 78, quote: "Good content and structure, but the platform had some technical issues during live sessions. The instructors were knowledgeable and the course material was up-to-date and practical.", author: "Samantha Brown", role: "Student", company: "TechLearn Institute", rating: 4 },
    { id: 79, quote: "Our school district adopted their reading comprehension platform for 3,000 students. Reading scores improved an average of 23% within one semester. The data dashboards help teachers personalize instruction.", author: "Dr. Karen Mitchell", role: "Superintendent", company: "Oakdale School District", rating: 5 },
    { id: 80, quote: "The professional certification prep course had a 94% pass rate in our cohort. The practice exams were spot-on and the study schedule kept me accountable without feeling overwhelmed.", author: "Robert Chen", role: "Certified Professional", company: "CertPrep Academy", rating: 5 },
  ],
  consulting: [
    { id: 81, quote: "Their operational efficiency audit identified $3.2M in annual savings we didn't know existed. The recommendations were practical and our team could implement most of them within 90 days.", author: "Victoria Hayes", role: "COO", company: "Pacific Manufacturing", rating: 5 },
    { id: 82, quote: "The digital transformation strategy they developed gave us a clear 18-month roadmap. We went from manual processes to 80% automation, and employee satisfaction actually increased.", author: "Richard Park", role: "CEO", company: "Heritage Financial Group", rating: 5 },
    { id: 83, quote: "We engaged them for M&A due diligence and their thoroughness was exceptional. They identified integration risks that saved us from a $15M acquisition mistake.", author: "Thomas Whitfield", role: "CFO", company: "Nexus Capital", rating: 5 },
    { id: 84, quote: "Their change management approach made our ERP migration actually succeed — which is saying something. Staff adoption hit 92% within the first month. Previous attempts with other firms had failed twice.", author: "Sandra Lee", role: "VP of Operations", company: "Global Logistics Inc.", rating: 5 },
    { id: 85, quote: "The market entry strategy for Southeast Asia was thorough and actionable. Within 12 months, we established operations in three countries and exceeded revenue targets by 20%.", author: "William Zhang", role: "President", company: "TechBridge International", rating: 5 },
    { id: 86, quote: "As a nonprofit, we couldn't afford the big firms. This boutique consultancy delivered Fortune 500-level strategy at a price we could handle, and they genuinely cared about our mission.", author: "Maria Fernandez", role: "Executive Director", company: "Hope Foundation", rating: 5 },
    { id: 87, quote: "The leadership development program transformed our management team. We've seen measurable improvements in employee retention, team velocity, and internal promotion rates.", author: "Christopher Evans", role: "CHRO", company: "Pinnacle Technologies", rating: 5 },
    { id: 88, quote: "Professional team with strong analytical skills. The final deliverable was comprehensive. We needed a bit more hand-holding during implementation, but the strategy itself was sound.", author: "Jennifer Walsh", role: "Director of Strategy", company: "Meridian Health Systems", rating: 4 },
    { id: 89, quote: "Their pricing strategy engagement increased our average deal size by 30% without losing a single customer. The value-based pricing framework they built is now core to how we sell.", author: "David Armstrong", role: "VP of Sales", company: "Enterprise Software Co.", rating: 5 },
    { id: 90, quote: "We've worked with their team for 3 years across multiple engagements. They know our business almost as well as we do, and each project builds on the last. That continuity is invaluable.", author: "Angela Foster", role: "CEO", company: "Riverstone Group", rating: 5 },
  ],
  "professional-services": [
    { id: 91, quote: "Our new accounting firm saved us $67,000 in the first year through tax optimization strategies our previous firm missed entirely. The proactive approach to tax planning made the difference.", author: "Steven Roberts", role: "CEO", company: "Cascade Ventures", rating: 5 },
    { id: 92, quote: "The HR consulting engagement overhauled our entire hiring process. Time-to-hire dropped from 45 to 18 days, and the quality of candidates improved dramatically. Our retention rate is up 25%.", author: "Michelle Thompson", role: "VP of People", company: "TechScale Inc.", rating: 5 },
    { id: 93, quote: "They handled our company's audit with precision and professionalism. Everything was on time, the communication was clear, and they proactively flagged potential compliance issues.", author: "Robert Chang", role: "CFO", company: "Pacific Industries", rating: 5 },
    { id: 94, quote: "The IT managed services team has maintained 99.97% uptime for our systems over 2 years. When issues arise, they're resolved before we even notice. That's the kind of support every business needs.", author: "Laura Anderson", role: "Operations Director", company: "Keystone Financial", rating: 5 },
    { id: 95, quote: "As a small business owner, I needed a bookkeeper who could also think strategically. They set up our financial systems, automated our invoicing, and gave me a clear picture of profitability by service line.", author: "Daniel Flores", role: "Owner", company: "Flores Design Studio", rating: 5 },
    { id: 96, quote: "The payroll migration was seamless. 200 employees transitioned without a single missed paycheck. Their team handled every edge case — multi-state taxes, equity compensation, the works.", author: "Karen Mitchell", role: "HR Director", company: "Summit Health Group", rating: 5 },
    { id: 97, quote: "Solid firm with responsive partners. The advisory work has been good, and they're always available when urgent questions come up. I'd recommend them for mid-market businesses.", author: "Greg Watson", role: "VP of Finance", company: "Horizon Manufacturing", rating: 4 },
    { id: 98, quote: "Their compliance consulting saved us from what could have been a costly regulatory issue. They identified the gap during a routine review and helped us remediate before our next audit.", author: "Patricia Kim", role: "General Counsel", company: "DataVault Technologies", rating: 5 },
    { id: 99, quote: "The business valuation they prepared for our Series B was thorough and credible. Investors cited it as one of the most professional valuations they'd seen from a company our size.", author: "Nathan Brooks", role: "Founder", company: "GreenTech Solutions", rating: 5 },
    { id: 100, quote: "We've been with this firm for 7 years and they've scaled their services alongside our growth — from basic bookkeeping to full CFO advisory. That adaptability is what keeps us loyal.", author: "Jennifer Lee", role: "CEO", company: "Riverdale Group", rating: 5 },
  ],
  "financial-services": [
    { id: 101, quote: "My financial advisor built a retirement plan that accounts for every scenario — early retirement, market downturns, healthcare costs. For the first time in my life, I feel financially secure.", author: "Robert Harrison", role: "Client", company: "Pinnacle Wealth Advisors", rating: 5 },
    { id: 102, quote: "The wealth management team grew our family's portfolio by 28% over 3 years while maintaining conservative risk levels. Their diversification strategy weathered the market volatility perfectly.", author: "Elizabeth Sterling", role: "Client", company: "Sterling & Associates", rating: 5 },
    { id: 103, quote: "Switching banks was the best financial decision I've made. The online platform is intuitive, there are no hidden fees, and the customer service team actually answers the phone.", author: "Maria Rodriguez", role: "Customer", company: "Horizon Bank", rating: 5 },
    { id: 104, quote: "The mortgage team made our home purchase stress-free. Clear communication on rates, upfront about costs, and they closed 5 days ahead of schedule. That efficiency was remarkable.", author: "David Kim", role: "Homebuyer", company: "Capital Lending Group", rating: 5 },
    { id: 105, quote: "Their small business lending team understood our industry and structured a loan that matched our cash flow cycles. No other bank took the time to understand our seasonal revenue patterns.", author: "Andrew Mitchell", role: "Business Owner", company: "First Commerce Bank", rating: 5 },
    { id: 106, quote: "The robo-advisory platform combined with access to a human advisor is the perfect hybrid. I get algorithmic efficiency with the comfort of calling someone when markets get volatile.", author: "Jessica Wong", role: "Client", company: "ModernWealth", rating: 5 },
    { id: 107, quote: "The estate planning services were thorough and compassionate. They helped us navigate a complex multi-generational wealth transfer with sensitivity and deep technical expertise.", author: "William Foster", role: "Client", company: "Legacy Financial Planning", rating: 5 },
    { id: 108, quote: "Good rates and solid service. The mobile app could use some UX improvements, but the banking fundamentals — security, reliability, and customer support — are all top-notch.", author: "Sarah Thompson", role: "Customer", company: "Pacific Trust Bank", rating: 4 },
    { id: 109, quote: "Their fintech platform processes our business payments 3x faster than our previous provider, with lower fees and better fraud protection. The integration with our accounting software was seamless.", author: "Chris Patterson", role: "Controller", company: "Metro Commerce", rating: 5 },
    { id: 110, quote: "I was skeptical about working with a financial advisor, but within one year, they helped me pay off $47,000 in debt and start building an emergency fund. Life-changing guidance.", author: "Tamara Nelson", role: "Client", company: "ClearPath Financial", rating: 5 },
  ],
  insurance: [
    { id: 111, quote: "When a tree fell on our house, our agent was on the phone within an hour. The claim was processed in 5 days and we were back to normal in 3 weeks. Exactly what you need in a crisis.", author: "Barbara Collins", role: "Policyholder", company: "Safeguard Insurance", rating: 5 },
    { id: 112, quote: "Our business insurance agent found gaps in our coverage that could have cost us millions. She restructured our policy to provide better protection at $4,000 less per year.", author: "Richard Torres", role: "Business Owner", company: "Shield Commercial Insurance", rating: 5 },
    { id: 113, quote: "The online quoting tool was easy to use, and the agent who followed up was knowledgeable without being pushy. We got the exact coverage we needed at a competitive price.", author: "Jennifer Adams", role: "Policyholder", company: "BrightPath Insurance", rating: 5 },
    { id: 114, quote: "After a car accident, I was anxious about the claims process. My agent walked me through every step, coordinated with the other party's insurer, and fought for fair compensation.", author: "Kevin Washington", role: "Policyholder", company: "TrustPoint Insurance", rating: 5 },
    { id: 115, quote: "We insure our fleet of 50 vehicles with them. The account manager does an annual review, proactively adjusts coverage as our fleet changes, and their claims handling is consistently fast.", author: "Michael Chen", role: "Fleet Manager", company: "National Fleet Insurance", rating: 5 },
    { id: 116, quote: "Switching to this agency saved our family $2,200 per year on combined home and auto coverage — with better coverage limits. The annual policy review keeps our protection up to date.", author: "Amy Foster", role: "Policyholder", company: "Community Insurance Group", rating: 5 },
    { id: 117, quote: "Decent coverage options and competitive pricing. The mobile app for filing claims is convenient. I just wish the automated phone system was easier to navigate to reach a real person.", author: "James Rodriguez", role: "Policyholder", company: "SecureChoice Insurance", rating: 4 },
    { id: 118, quote: "The life insurance advisor made a complex topic simple. He assessed our family's needs, explained the options clearly, and helped us choose a policy that gives us peace of mind.", author: "Laura Peterson", role: "Policyholder", company: "Guardian Life Partners", rating: 5 },
    { id: 119, quote: "Their cyber insurance policy saved our company after a ransomware attack. The incident response team was deployed within hours, and the coverage handled over $300K in recovery costs.", author: "David Hoffman", role: "CTO", company: "CyberShield Insurance", rating: 5 },
    { id: 120, quote: "As a contractor, getting the right liability insurance is critical. This agency specializes in construction insurance and understood every nuance of my coverage needs from day one.", author: "Patrick O'Brien", role: "Contractor", company: "BuildSafe Insurance", rating: 5 },
  ],
  retail: [
    { id: 121, quote: "The staff went above and beyond to help me find the perfect anniversary gift. They spent 30 minutes showing me options, wrapped it beautifully, and even included a handwritten card.", author: "Daniel Morris", role: "Customer", company: "Artisan Gallery", rating: 5 },
    { id: 122, quote: "This is our go-to hardware store. The team knows their products inside and out. I described my plumbing issue and they had the exact parts and installation advice within 5 minutes.", author: "Thomas Burke", role: "Customer", company: "Neighborhood Hardware", rating: 5 },
    { id: 123, quote: "The kids' clothing selection is curated perfectly — stylish, durable, and affordable. The loyalty program rewards are generous and the seasonal sales are worth waiting for.", author: "Jessica Palmer", role: "Customer", company: "Little Ones Boutique", rating: 5 },
    { id: 124, quote: "The personal styling service transformed my wardrobe. My stylist understood my lifestyle and budget, pulled pieces I'd never pick myself, and every outfit gets compliments.", author: "Rachel Kim", role: "Client", company: "Curated Style", rating: 5 },
    { id: 125, quote: "We've been buying our office supplies here for 10 years. They match online prices, deliver same-day, and our account manager remembers our preferences. Hard to beat that combination.", author: "Mark Thompson", role: "Office Manager", company: "Business Supply Co.", rating: 5 },
    { id: 126, quote: "The plant shop staff are genuine experts. They assessed my apartment's light conditions, recommended the perfect plants, and gave me a care guide for each one. Everything is thriving.", author: "Emma Larsen", role: "Customer", company: "Green Thumb Garden Center", rating: 5 },
    { id: 127, quote: "Wide selection and fair prices. The store layout could be better organized, but the staff is always willing to help locate items. Return process is easy and no-hassle.", author: "Robert Davis", role: "Customer", company: "ValueMart", rating: 4 },
    { id: 128, quote: "The custom framing service was excellent. They took time to help me choose the right mat and frame for my artwork, and the final result was museum quality.", author: "Sophie Grant", role: "Customer", company: "Frame & Art Studio", rating: 5 },
    { id: 129, quote: "Their wine selection is carefully curated and the staff can recommend the perfect bottle for any occasion or meal. They host tastings every Saturday that are educational and fun.", author: "Philip Rossi", role: "Regular Customer", company: "Vine & Barrel", rating: 5 },
    { id: 130, quote: "The buy-online-pickup-in-store option saves me so much time. Orders are always ready when promised, and the curbside pickup team is friendly and efficient.", author: "Amanda Chen", role: "Customer", company: "HomeStyle Retail", rating: 5 },
  ],
  hospitality: [
    { id: 131, quote: "Our 25th anniversary trip was flawless. The hotel upgraded our room, had champagne waiting, and the concierge arranged a private dinner on the beach. Truly once-in-a-lifetime service.", author: "William Sterling", role: "Guest", company: "Azure Shores Resort", rating: 5 },
    { id: 132, quote: "The boutique hotel has more charm and character than any chain I've stayed at. Each room is unique, breakfast is locally sourced, and the staff remembers your name by the second day.", author: "Claire Beaumont", role: "Guest", company: "The Linden Hotel", rating: 5 },
    { id: 133, quote: "We hosted a 200-person corporate retreat and the events team handled every detail — AV setup, breakout rooms, team dinners, and activities. Not a single hiccup in three days.", author: "Jason Miller", role: "Event Director", company: "Grandview Conference Resort", rating: 5 },
    { id: 134, quote: "The vacation rental was exactly as pictured. Spotlessly clean, fully stocked kitchen, and the host's local restaurant and activity recommendations were spot-on. We're already rebooking.", author: "Sarah Thornton", role: "Guest", company: "Coastal Retreats", rating: 5 },
    { id: 135, quote: "For a family-friendly resort, this place nails it. Kids' club kept our children entertained, the pool complex is fantastic, and the all-inclusive dining had options for even our pickiest eater.", author: "Michael Torres", role: "Family Guest", company: "Sunview Family Resort", rating: 5 },
    { id: 136, quote: "As a frequent business traveler, consistency matters. This hotel chain delivers the same high standard at every location — fast WiFi, quiet rooms, and an excellent breakfast.", author: "David Park", role: "Business Traveler", company: "ExecutiveStay Hotels", rating: 5 },
    { id: 137, quote: "Nice property with a great location. The room was comfortable and clean. The pool area was a bit crowded during peak hours, but overall a very pleasant stay for the price.", author: "Amanda Foster", role: "Guest", company: "Harborview Inn", rating: 4 },
    { id: 138, quote: "The spa experience was transformative. From the moment we arrived, every detail was designed for relaxation — the aromatherapy, the heated pools, the skilled therapists. Pure bliss.", author: "Victoria Lane", role: "Guest", company: "Serenity Spa Resort", rating: 5 },
    { id: 139, quote: "The eco-lodge exceeded all expectations. Solar-powered, zero-waste dining, and nature-immersive experiences — all without sacrificing comfort. Proof that luxury and sustainability can coexist.", author: "James Green", role: "Guest", company: "Verdant Eco-Lodge", rating: 5 },
    { id: 140, quote: "We've held our annual family reunion here for 5 years running. They accommodate 30 guests across multiple room types, handle group dining, and always make us feel like VIPs.", author: "Patricia Reyes", role: "Group Guest", company: "Mountain Lodge & Spa", rating: 5 },
  ],
  technology: [
    { id: 141, quote: "The server migration was completed with zero downtime. Their team worked through the weekend to ensure our 50,000 daily users experienced no disruption. That's the kind of dedication we needed.", author: "Michael Zhang", role: "VP of Infrastructure", company: "CloudFirst Systems", rating: 5 },
    { id: 142, quote: "Their cybersecurity assessment uncovered 14 critical vulnerabilities our internal team missed. The remediation plan was prioritized by risk level and we closed every gap within 60 days.", author: "Sarah Mitchell", role: "CISO", company: "SecureNet Corp", rating: 5 },
    { id: 143, quote: "We replaced our legacy CRM with their platform and sales productivity increased 35% in the first quarter. The data migration was clean and the training program got our team up to speed fast.", author: "David Kowalski", role: "VP of Sales", company: "Apex Technologies", rating: 5 },
    { id: 144, quote: "The managed IT services have been rock-solid. 99.99% uptime, proactive monitoring that catches issues before they impact us, and a help desk that actually resolves tickets on the first call.", author: "Jennifer Adams", role: "Operations Director", company: "Meridian Financial", rating: 5 },
    { id: 145, quote: "Their AI implementation helped us process customer inquiries 5x faster. The natural language model they trained on our data understands industry-specific terminology better than any off-the-shelf solution.", author: "Tom Richards", role: "CTO", company: "InsureTech Solutions", rating: 5 },
    { id: 146, quote: "The custom software development team delivered a complex inventory management system in 4 months. It integrates with our existing ERP and has already reduced inventory carrying costs by 22%.", author: "Laura Chen", role: "Supply Chain Director", company: "Pacific Distributors", rating: 5 },
    { id: 147, quote: "Good technical team with deep cloud expertise. The infrastructure redesign has improved our performance significantly. Would appreciate faster turnaround on change requests.", author: "Robert Kim", role: "IT Director", company: "National Services Group", rating: 4 },
    { id: 148, quote: "Their IoT platform connects all 200 of our manufacturing sensors into a single dashboard. Predictive maintenance alerts have reduced our unplanned downtime by 45% and saved us $800K annually.", author: "Steven Hoffman", role: "Plant Manager", company: "Precision Manufacturing", rating: 5 },
    { id: 149, quote: "The DevOps consulting engagement transformed our release cycle from monthly to daily deployments. Our development team is more productive and our customers get features faster.", author: "Priya Patel", role: "Engineering Manager", company: "FinanceHub", rating: 5 },
    { id: 150, quote: "We needed a technology partner who could scale with us from 10 to 10,000 users. Their architecture decisions two years ago still hold up perfectly today. That foresight saved us millions in refactoring.", author: "Chris Anderson", role: "CEO", company: "RapidGrowth", rating: 5 },
  ],
  automotive: [
    { id: 151, quote: "Best car-buying experience I've ever had. No pressure, transparent pricing, and the salesperson (Jake) was genuinely focused on finding the right vehicle for my family's needs.", author: "Brian Donovan", role: "Buyer", company: "Premier Auto Group", rating: 5 },
    { id: 152, quote: "The service department is honest and efficient. They quoted me $600 less than the dealer for the same brake job and completed it in half the time. I'll never go anywhere else.", author: "Melissa Turner", role: "Customer", company: "Integrity Auto Care", rating: 5 },
    { id: 153, quote: "Bought my first electric vehicle here. The team's knowledge about EV technology, charging infrastructure, and incentives was impressive. They answered every question without rushing me.", author: "David Kim", role: "Buyer", company: "GreenDrive Motors", rating: 5 },
    { id: 154, quote: "I brought in my classic 1967 Mustang for a full restoration. The attention to detail was incredible — every chrome piece polished, the interior perfectly reupholstered. It looks better than new.", author: "James Harper", role: "Customer", company: "Classic Auto Restoration", rating: 5 },
    { id: 155, quote: "The fleet management service handles 75 company vehicles for us. Scheduled maintenance, tire rotations, emergency repairs — all coordinated seamlessly. Our vehicle downtime dropped 60%.", author: "Patricia Wells", role: "Fleet Director", company: "National Fleet Services", rating: 5 },
    { id: 156, quote: "The collision repair after my accident was seamless. They worked directly with my insurance, provided a loaner car, and the repair quality was indistinguishable from factory condition.", author: "Karen Mitchell", role: "Customer", company: "ProFinish Body Shop", rating: 5 },
    { id: 157, quote: "Good dealership with fair trade-in values. The financing options were competitive and the process was straightforward. The only improvement would be faster paperwork processing.", author: "Steven Rodriguez", role: "Buyer", company: "Valley Auto Mall", rating: 4 },
    { id: 158, quote: "My teenager's first car purchase was a big deal. The dealership helped us find a reliable, safe vehicle within budget and walked us through insurance considerations. Thoughtful service.", author: "Nancy Clark", role: "Parent", company: "Trusted Motors", rating: 5 },
    { id: 159, quote: "The detailing service transformed my 5-year-old car. Interior deep clean, paint correction, ceramic coating — it genuinely looks like it just rolled off the showroom floor.", author: "Chris Evans", role: "Customer", company: "Elite Auto Detailing", rating: 5 },
    { id: 160, quote: "They diagnosed an intermittent electrical issue that two other shops couldn't figure out. Turned out to be a loose ground wire. Fixed in 20 minutes and charged me fairly. Trust earned.", author: "Michael Santos", role: "Customer", company: "TechAuto Diagnostics", rating: 5 },
  ],
  legal: [
    { id: 161, quote: "Attorney Davis handled our company's contract dispute with expertise and composure. Her negotiation skills saved us from a costly lawsuit and preserved a critical business relationship.", author: "Richard Thompson", role: "CEO", company: "Thompson & Associates", rating: 5 },
    { id: 162, quote: "Going through a divorce is devastating, but my attorney made the process as painless as possible. She was empathetic, strategic, and always kept my children's wellbeing as the priority.", author: "Sarah Mitchell", role: "Client", company: "Family First Law Group", rating: 5 },
    { id: 163, quote: "The IP legal team protected our software patents across 12 countries. Their global reach and technical understanding of our product made them the perfect choice for a SaaS company like ours.", author: "James Liu", role: "CTO", company: "InnoTech IP Law", rating: 5 },
    { id: 164, quote: "After a workplace injury, I didn't know my rights. This firm took my case on contingency, fought the insurance company, and secured a settlement that covered all my medical costs and lost wages.", author: "Mark Anderson", role: "Client", company: "Workers' Rights Law Firm", rating: 5 },
    { id: 165, quote: "The corporate formation and governance work was impeccable. They structured our entity for optimal tax efficiency and future fundraising. When we raised our Series A, investors praised our legal foundation.", author: "Emily Chen", role: "Founder", company: "StartUp Legal Partners", rating: 5 },
    { id: 166, quote: "We've used this firm for commercial real estate transactions for 15 years. Their attention to detail in due diligence and closing has saved us from problematic properties multiple times.", author: "William Foster", role: "Managing Partner", company: "Foster Real Estate Law", rating: 5 },
    { id: 167, quote: "Competent legal team with good communication. The estate planning documents were thorough and they explained every clause in plain language. Response times could be slightly faster.", author: "Barbara Nelson", role: "Client", company: "Legacy Legal Advisors", rating: 4 },
    { id: 168, quote: "The immigration attorney navigated my H-1B to green card process flawlessly. She anticipated every requirement, met every deadline, and kept me informed at every step. Now I'm a permanent resident.", author: "Arun Patel", role: "Client", company: "Global Immigration Law", rating: 5 },
    { id: 169, quote: "Their employment law guidance helped us create compliant hiring practices, employee handbooks, and termination procedures. We've had zero employment disputes since engaging them.", author: "Lisa Harper", role: "HR Director", company: "Employment Law Group", rating: 5 },
    { id: 170, quote: "After a data breach, their cybersecurity litigation team handled the regulatory notifications, class action defense, and settlement negotiations. They turned a crisis into a manageable situation.", author: "Daniel Park", role: "General Counsel", company: "DataShield Legal", rating: 5 },
  ],
  construction: [
    { id: 171, quote: "Our kitchen renovation came in on budget and two weeks ahead of schedule. The crew was respectful of our home, cleaned up daily, and the craftsmanship is stunning.", author: "Jennifer Walsh", role: "Homeowner", company: "Craftsman Builders", rating: 5 },
    { id: 172, quote: "They built our custom home from the ground up. The project management was exceptional — weekly progress meetings, transparent budgeting, and they handled every permit and inspection.", author: "Michael Brown", role: "Homeowner", company: "Pinnacle Custom Homes", rating: 5 },
    { id: 173, quote: "The commercial build-out for our new office was completed in 10 weeks — exactly on schedule. The space is functional, modern, and the electrical and HVAC systems are flawlessly installed.", author: "Amanda Torres", role: "Office Manager", company: "TechSpace Construction", rating: 5 },
    { id: 174, quote: "We hired them for a complete bathroom remodel and the tile work alone is worth the investment. Every line is straight, every corner is perfect. True artisans who take pride in their work.", author: "David Nguyen", role: "Homeowner", company: "Precision Tile & Bath", rating: 5 },
    { id: 175, quote: "After getting 5 quotes for our roof replacement, we chose them for their transparency and references. They showed up on time, completed in 2 days, and the cleanup was spotless.", author: "Robert Johnson", role: "Homeowner", company: "Summit Roofing", rating: 5 },
    { id: 176, quote: "The general contractor managed 8 subcontractors on our whole-home renovation without a single scheduling conflict. Communication was constant and they solved problems before they became issues.", author: "Catherine Sterling", role: "Homeowner", company: "Cornerstone Construction", rating: 5 },
    { id: 177, quote: "Solid work on our deck and patio project. The materials are high quality and the design was creative. There was one delay due to weather, but the team was transparent about the timeline change.", author: "Steven Miller", role: "Homeowner", company: "OutdoorLiving Builders", rating: 4 },
    { id: 178, quote: "The foundation repair saved our home. They identified the exact cause of our settlement issue, explained the engineering solution clearly, and backed it with a 25-year transferable warranty.", author: "Nancy Williams", role: "Homeowner", company: "StrongBase Foundation Repair", rating: 5 },
    { id: 179, quote: "We hired them for a full ADU construction in our backyard. Navigating the permits, design, and construction in 5 months was impressive. Our new rental unit was worth every penny.", author: "Kevin Park", role: "Property Owner", company: "ADU Specialists", rating: 5 },
    { id: 180, quote: "The solar panel installation was professional from consultation to activation. They handled all the utility paperwork, the installation was clean, and our electricity bill dropped 80%.", author: "Emily Chen", role: "Homeowner", company: "SunCraft Solar", rating: 5 },
  ],
  nonprofit: [
    { id: 181, quote: "This organization changed my daughter's life. The after-school STEM program gave her confidence, skills, and a community of peers. She's now applying to engineering programs.", author: "Maria Santos", role: "Parent", company: "FutureMakers Foundation", rating: 5 },
    { id: 182, quote: "I've been a monthly donor for 4 years and the transparency is what keeps me giving. Quarterly impact reports show exactly where my money goes and the lives it touches.", author: "William Chen", role: "Donor", company: "GlobalHope Fund", rating: 5 },
    { id: 183, quote: "Volunteering with this organization was one of the most meaningful experiences of my life. The team is well-organized, the mission is clear, and you can see the impact firsthand.", author: "Stephanie Clark", role: "Volunteer", company: "Habitat for Change", rating: 5 },
    { id: 184, quote: "The job training program helped me transition from unemployment to a career in IT. They covered certifications, provided a mentor, and connected me with employers. I'm now earning $65K.", author: "Marcus Robinson", role: "Program Graduate", company: "CareerBridge", rating: 5 },
    { id: 185, quote: "As a corporate sponsor, we appreciate how professionally this nonprofit operates. The event coordination, donor communication, and impact measurement rival any for-profit business.", author: "Jennifer Foster", role: "CSR Director", company: "United Way Chapter", rating: 5 },
    { id: 186, quote: "The food bank served our family during the hardest year of our lives. The volunteers treated us with dignity and the quality of food was far better than we expected. We're grateful beyond words.", author: "Linda Patterson", role: "Community Member", company: "Community Harvest Food Bank", rating: 5 },
    { id: 187, quote: "The mental health support group this organization runs saved me during a very dark time. Knowing I wasn't alone, having professional facilitation, and the peer support network changed everything.", author: "Anonymous", role: "Program Participant", company: "MindBridge Foundation", rating: 5 },
    { id: 188, quote: "Good organization with a clear mission. The events are well-run and the team is passionate. I'd like to see more frequent communication about long-term impact and program outcomes.", author: "Thomas Gray", role: "Donor", company: "Youth Empowerment Network", rating: 4 },
    { id: 189, quote: "The scholarship covered my entire first year of college. Without this foundation's support, I wouldn't have been able to attend. I graduated last May and I'm now giving back as a mentor.", author: "Rosa Fernandez", role: "Scholarship Recipient", company: "Opportunity Scholars Fund", rating: 5 },
    { id: 190, quote: "Our company's volunteer day with this nonprofit was transformative for our team. Building homes together created bonds that improved collaboration back at the office. We're signed up again next quarter.", author: "Chris Anderson", role: "Team Lead", company: "BuildHope Foundation", rating: 5 },
  ],
  manufacturing: [
    { id: 191, quote: "They've supplied our precision components for 8 years with a defect rate below 0.02%. When we needed a custom tolerance for a new product line, their engineering team delivered within 3 weeks.", author: "Robert Tanaka", role: "Procurement Director", company: "Precision Parts Co.", rating: 5 },
    { id: 192, quote: "Our lead times dropped from 12 weeks to 4 weeks after switching suppliers. Their just-in-time delivery model aligns perfectly with our lean manufacturing process.", author: "David Mueller", role: "Supply Chain Manager", company: "AutoTech Components", rating: 5 },
    { id: 193, quote: "The quality control is second to none. Every shipment comes with detailed inspection reports and certificates of conformance. In 5 years, we've never had a quality issue.", author: "Jennifer Park", role: "Quality Manager", company: "MedDevice Manufacturing", rating: 5 },
    { id: 194, quote: "When we needed to scale production from 10,000 to 100,000 units, they ramped up capacity without any drop in quality. Their investment in automation paid dividends for both of us.", author: "Thomas Wright", role: "VP of Operations", company: "ConsumerTech Products", rating: 5 },
    { id: 195, quote: "The custom CNC machining capabilities are impressive. They worked from our CAD files, produced prototypes in 5 days, and the production parts were identical to the prototypes.", author: "Michael Chen", role: "Design Engineer", company: "Aerospace Dynamics", rating: 5 },
    { id: 196, quote: "Their material sourcing team found a cost-effective alternative that met all our specifications and saved us 15% on raw materials. That kind of proactive partnership adds real value.", author: "Laura Anderson", role: "Purchasing Manager", company: "Industrial Solutions Inc.", rating: 5 },
    { id: 197, quote: "Reliable supplier with consistent quality. On-time delivery has been around 95%, which is strong for the industry. Would like to see more flexibility on smaller minimum order quantities.", author: "Steven Kim", role: "Buyer", company: "Pacific Electronics", rating: 4 },
    { id: 198, quote: "The ISO 9001 and AS9100 certifications gave us confidence in their quality management system. The audit we conducted on-site confirmed that their processes match their certifications.", author: "Angela Harris", role: "Quality Director", company: "DefenseTech Systems", rating: 5 },
    { id: 199, quote: "We needed a manufacturing partner who could handle both low-volume prototyping and high-volume production. They're one of the few that do both well, which simplifies our entire supply chain.", author: "Chris Patterson", role: "Product Manager", company: "InnoVentures", rating: 5 },
    { id: 200, quote: "Their sustainable manufacturing practices aligned with our ESG goals. They helped us reduce packaging waste by 40% and switched to recycled materials without affecting product durability.", author: "Katherine Chen", role: "Sustainability Director", company: "GreenBuild Products", rating: 5 },
  ],
};

export function getIndustryBySlug(slug: string): IndustryConfig | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getTestimonialsForIndustry(slug: string): IndustryTestimonial[] {
  return industryTestimonials[slug] || [];
}

export function getRelatedIndustries(slugs: string[]): IndustryConfig[] {
  return slugs
    .map((s) => industries.find((i) => i.slug === s))
    .filter((i): i is IndustryConfig => i !== undefined);
}
