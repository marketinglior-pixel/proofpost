export interface IndustryResponseConfig {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  relatedIndustries: string[];
  whyMatters: string;
  respondingTips: string[];
  faq: { question: string; answer: string }[];
}

export interface IndustryReviewResponse {
  id: number;
  stars: number;
  reviewText: string;
  responseText: string;
  tone: string;
}

export const industries: IndustryResponseConfig[] = [
  {
    slug: "restaurant",
    name: "Restaurant",
    description:
      "Copy-paste restaurant review response templates for 1-5 star reviews. Professional responses tailored for restaurants, cafes, and food service businesses.",
    keywords: [
      "restaurant review response examples",
      "how to respond to restaurant reviews",
      "restaurant google review reply",
      "restaurant negative review response",
    ],
    relatedIndustries: ["hotel", "salon-spa", "retail", "fitness"],
    respondingTips: [
      "Reference specific dishes or menu items mentioned in the review",
      "Thank the reviewer by name and invite them to try a new seasonal item",
      "For negative reviews about food quality, explain corrective steps without being defensive",
      "Keep responses warm and conversational — match the casual tone of dining out",
    ],
    whyMatters:
      "Restaurant reviews directly influence where people choose to eat. 94% of diners read online reviews before choosing a restaurant, and a single negative review can cost a restaurant up to 30 customers. Responding to every review — especially negative ones — shows potential diners that you care about the experience and are committed to getting it right. A thoughtful response to a bad review can be more persuasive than a dozen five-star ratings.",
    faq: [
      {
        question: "How should a restaurant respond to a negative food review?",
        answer:
          "Acknowledge the issue sincerely, apologize for the experience, and explain what you're doing to fix it. Never blame the customer or argue about taste. Offer to make it right — a return visit or direct conversation with the manager. Future diners reading your response will judge your professionalism more than the complaint itself.",
      },
      {
        question: "Should restaurants respond to every Google review?",
        answer:
          "Yes. Google has confirmed that responding to reviews improves your local search ranking. For restaurants especially, potential customers read responses to gauge how you handle both praise and complaints. Aim to respond within 24 hours, keeping positive replies warm and negative replies professional.",
      },
      {
        question: "What tone should restaurant review responses use?",
        answer:
          "Match the warmth and hospitality of your restaurant. Use a conversational, friendly tone for positive reviews. For negative reviews, stay professional but still warm — avoid corporate-sounding language. Reference specific details from the review to show you actually read it.",
      },
    ],
  },
  {
    slug: "hotel",
    name: "Hotel",
    description:
      "Copy-paste hotel review response templates for 1-5 star reviews. Professional responses tailored for hotels, resorts, and hospitality businesses.",
    keywords: [
      "hotel review response examples",
      "how to respond to hotel reviews",
      "hotel google review reply",
      "hotel negative review response",
    ],
    relatedIndustries: ["restaurant", "salon-spa", "fitness", "real-estate"],
    respondingTips: [
      "Mention specific amenities or experiences the guest enjoyed",
      "For negative reviews, address each concern individually with concrete actions",
      "Invite guests to return and mention upcoming improvements or new offerings",
      "Use the guest's name and reference their stay dates if possible",
    ],
    whyMatters:
      "Hotel reviews are the single most influential factor in booking decisions. Over 80% of travelers read reviews before booking, and they pay special attention to how hotels respond to complaints. A professional, empathetic response to a negative review reassures future guests that issues are taken seriously and resolved quickly. For positive reviews, thoughtful responses encourage repeat bookings and referrals.",
    faq: [
      {
        question: "How should hotels respond to complaints about cleanliness?",
        answer:
          "Take the complaint seriously, apologize sincerely, and describe the specific steps you're taking — such as retraining housekeeping staff, increasing room inspections, or upgrading cleaning protocols. Offer to make it right with a future stay discount or complimentary upgrade.",
      },
      {
        question: "Should hotel responses mention room rates or promotions?",
        answer:
          "Briefly mentioning a returning guest offer is acceptable, but the primary focus should be on the guest's experience. Overly promotional responses feel tone-deaf, especially on negative reviews. Save promotions for positive reviews where the guest expressed intent to return.",
      },
      {
        question: "How quickly should hotels respond to reviews?",
        answer:
          "Within 24-48 hours is ideal. For negative reviews, faster is better — it shows urgency and care. Many hotel management platforms offer review alerts so your team can respond promptly. Consistency matters: responding to every review signals that guest feedback is a priority.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "Copy-paste healthcare review response templates for 1-5 star reviews. HIPAA-conscious responses tailored for clinics, practices, and medical offices.",
    keywords: [
      "healthcare review response examples",
      "doctor review response template",
      "medical practice review reply",
      "HIPAA compliant review response",
    ],
    relatedIndustries: ["dental", "fitness", "salon-spa", "education"],
    respondingTips: [
      "Never reference specific medical details, treatments, or conditions — even if the patient did",
      "Keep responses professional and HIPAA-compliant at all times",
      "Invite patients to contact the office directly to resolve concerns",
      "Thank patients for trusting you with their care",
    ],
    whyMatters:
      "Healthcare reviews carry enormous weight because patients are trusting providers with their health and wellbeing. 72% of patients use online reviews as their first step in finding a new doctor. However, healthcare review responses require extra care due to HIPAA regulations — you cannot confirm or deny that someone is a patient, or reference any medical details. Thoughtful, compliant responses build trust while protecting patient privacy.",
    faq: [
      {
        question: "Can doctors respond to negative reviews without violating HIPAA?",
        answer:
          "Yes, but you must be careful. Never confirm or deny the reviewer is a patient, and never reference any medical details — even if the patient shared them first. Use generic language like 'We take all feedback seriously' and invite them to contact the office directly. Many healthcare attorneys recommend having response templates reviewed for HIPAA compliance.",
      },
      {
        question: "What should a medical practice include in review responses?",
        answer:
          "Focus on general statements about your commitment to patient care, your office values, and your desire to provide excellent experiences. Thank the reviewer, acknowledge their feedback, and provide a direct contact for follow-up. Avoid any specifics about the patient's visit, condition, or treatment.",
      },
      {
        question: "How do healthcare reviews impact patient acquisition?",
        answer:
          "Practices with 4+ star ratings and active review responses see significantly higher new patient inquiries. A BrightLocal study found that 72% of patients use reviews to evaluate providers. Responding to reviews — especially negative ones — demonstrates that you value patient feedback and are committed to continuous improvement.",
      },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    description:
      "Copy-paste retail review response templates for 1-5 star reviews. Professional responses tailored for retail stores, shops, and consumer brands.",
    keywords: [
      "retail review response examples",
      "store review response template",
      "retail google review reply",
      "retail negative review response",
    ],
    relatedIndustries: ["ecommerce", "restaurant", "salon-spa", "auto"],
    respondingTips: [
      "Reference specific products or shopping experiences mentioned in the review",
      "For product quality complaints, explain your return/exchange policy clearly",
      "Highlight your team by name when customers praise specific staff members",
      "Mention new arrivals or seasonal collections to encourage return visits",
    ],
    whyMatters:
      "Retail customers have more choices than ever, and reviews are often the deciding factor between your store and a competitor. Responding to reviews builds a sense of community and loyalty. For brick-and-mortar stores, review responses are especially important for local SEO — helping your store appear in 'near me' searches. Consistent, thoughtful responses signal that your store values every customer interaction.",
    faq: [
      {
        question: "How should retail stores respond to product quality complaints?",
        answer:
          "Acknowledge the issue, apologize for the inconvenience, and clearly explain your return or exchange options. Offer to resolve it directly — provide a phone number or email. Avoid being defensive about the product. Future customers will judge your willingness to make things right.",
      },
      {
        question: "Should retail stores respond to positive reviews?",
        answer:
          "Absolutely. Thanking customers for positive reviews reinforces their loyalty and encourages repeat visits. Mention the specific product or experience they highlighted, and let them know about related products or upcoming promotions they might enjoy.",
      },
      {
        question: "How do retail reviews affect local search rankings?",
        answer:
          "Google uses review quantity, quality, and recency as local ranking factors. Stores with more reviews and active responses rank higher in local search results and Google Maps. Encouraging reviews and responding to every one is one of the most effective local SEO strategies for retail businesses.",
      },
    ],
  },
  {
    slug: "saas",
    name: "SaaS",
    description:
      "Copy-paste SaaS review response templates for 1-5 star reviews. Professional responses tailored for software companies and tech products.",
    keywords: [
      "saas review response examples",
      "software review response template",
      "b2b review reply examples",
      "saas negative review response",
    ],
    relatedIndustries: ["ecommerce", "agency", "education", "legal"],
    respondingTips: [
      "Acknowledge specific feature feedback and share your product roadmap when relevant",
      "For bug reports in reviews, thank the user and confirm the issue is being investigated",
      "Reference the customer's use case to show you understand their workflow",
      "Provide direct links to support or customer success managers for complex issues",
    ],
    whyMatters:
      "SaaS reviews on platforms like G2, Capterra, and Google influence purchasing decisions for software buyers who evaluate multiple options before committing. A thoughtful response to a negative review about bugs or missing features shows that your team listens and iterates. For positive reviews, reinforcing the customer's success story helps prospects see themselves in your product.",
    faq: [
      {
        question: "How should SaaS companies respond to feature request reviews?",
        answer:
          "Thank the reviewer for their feedback, acknowledge the feature gap, and share whether it's on your roadmap. If you can't commit to a timeline, say so honestly. Users appreciate transparency about product direction more than vague promises. Direct them to your feature request board if you have one.",
      },
      {
        question: "Should SaaS companies respond to reviews on G2 and Capterra?",
        answer:
          "Yes. These platforms are major decision-making tools for B2B buyers. Responding to reviews on G2 and Capterra shows that your company is engaged and customer-focused. Many platforms also boost the visibility of listings with active response rates.",
      },
      {
        question: "How do review responses impact SaaS conversion rates?",
        answer:
          "B2B buyers read an average of 7 reviews before making a software purchase decision. Companies that respond to reviews see higher trust scores and conversion rates. A professional response to a negative review can neutralize the impact and demonstrate accountability — which is exactly what enterprise buyers want to see.",
      },
    ],
  },
  {
    slug: "agency",
    name: "Agency",
    description:
      "Copy-paste agency review response templates for 1-5 star reviews. Professional responses tailored for marketing, design, and consulting agencies.",
    keywords: [
      "agency review response examples",
      "marketing agency review reply",
      "agency google review response",
      "agency negative review response",
    ],
    relatedIndustries: ["saas", "legal", "real-estate", "education"],
    respondingTips: [
      "Reference specific project outcomes or results when the client mentions them",
      "Maintain confidentiality — don't reveal client strategies or campaign details",
      "For negative reviews, focus on your process improvements without oversharing",
      "Highlight the collaborative nature of the relationship",
    ],
    whyMatters:
      "Agency reviews carry significant weight because potential clients are evaluating whether they can trust you with their brand, budget, and business growth. The agency-client relationship is deeply personal, and reviews reflect that. Responding professionally — especially to critical feedback — demonstrates the communication skills and accountability that clients look for when hiring an agency.",
    faq: [
      {
        question: "How should agencies respond to negative reviews about results?",
        answer:
          "Acknowledge the client's frustration without being defensive. Focus on what you learned and what process changes you've made. Avoid revealing campaign details or blaming the client publicly. A brief, professional response that invites offline resolution is the best approach.",
      },
      {
        question: "Should agencies ask clients to leave Google reviews?",
        answer:
          "Yes. Most satisfied clients are happy to leave reviews but simply haven't been asked. Send a personalized request after a successful project launch, campaign milestone, or positive quarterly review. Include a direct link to your Google Business Profile.",
      },
      {
        question: "How do reviews affect agency new business development?",
        answer:
          "Reviews serve as peer validation in a trust-heavy industry. Prospective clients often research agencies on Google before booking a discovery call. Strong reviews with professional responses can shorten the sales cycle and differentiate you from competitors who lack social proof.",
      },
    ],
  },
  {
    slug: "fitness",
    name: "Fitness",
    description:
      "Copy-paste fitness review response templates for 1-5 star reviews. Professional responses tailored for gyms, studios, and personal trainers.",
    keywords: [
      "gym review response examples",
      "fitness studio review reply",
      "gym google review response",
      "personal trainer review response",
    ],
    relatedIndustries: ["salon-spa", "healthcare", "education", "restaurant"],
    respondingTips: [
      "Celebrate the member's fitness journey and achievements",
      "For cleanliness complaints, describe specific actions taken immediately",
      "Reference specific classes, trainers, or programs the member enjoyed",
      "Invite them to try new classes or programs to keep engagement high",
    ],
    whyMatters:
      "Fitness is a deeply personal investment, and potential members want reassurance that your gym or studio provides a supportive, clean, and motivating environment. Reviews from real members about trainers, equipment, atmosphere, and community are the strongest form of social proof for fitness businesses. Responding to reviews shows that you value your members and creates a sense of community that attracts new sign-ups.",
    faq: [
      {
        question: "How should gyms respond to complaints about equipment or cleanliness?",
        answer:
          "Take the feedback seriously, thank the member for flagging it, and describe the specific steps you've taken — such as equipment maintenance schedules, cleaning protocols, or new equipment orders. A fast, action-oriented response reassures both the reviewer and future members.",
      },
      {
        question: "Should personal trainers respond to Google reviews?",
        answer:
          "Yes. Personal training is a relationship-driven business, and responding to reviews humanizes your brand. Thank clients for their trust, celebrate their progress (without sharing private health details), and show potential clients what working with you looks like.",
      },
      {
        question: "How do reviews impact gym membership sign-ups?",
        answer:
          "Gyms with strong review profiles and active responses see significantly higher inquiry-to-membership conversion rates. Potential members often compare nearby gyms using Google reviews before visiting. A consistent stream of positive reviews with thoughtful responses is one of the most cost-effective marketing tools for fitness businesses.",
      },
    ],
  },
  {
    slug: "salon-spa",
    name: "Salon & Spa",
    description:
      "Copy-paste salon and spa review response templates for 1-5 star reviews. Professional responses tailored for salons, spas, and beauty businesses.",
    keywords: [
      "salon review response examples",
      "spa review response template",
      "hair salon review reply",
      "beauty salon negative review response",
    ],
    relatedIndustries: ["fitness", "healthcare", "dental", "restaurant"],
    respondingTips: [
      "Reference the specific service or stylist mentioned in the review",
      "For negative reviews about results, offer a complimentary correction visit",
      "Maintain a warm, luxury tone that matches the spa or salon experience",
      "Share your stylist's excitement when clients praise them by name",
    ],
    whyMatters:
      "Salon and spa services are personal and visible — a bad haircut or skin treatment affects how someone feels about themselves. This makes reviews extremely influential. 82% of consumers read reviews for local businesses like salons, and many choose their stylist based entirely on review feedback. Responding to reviews shows professionalism and care, which are exactly the qualities salon clients are looking for.",
    faq: [
      {
        question: "How should salons respond to reviews about bad haircuts?",
        answer:
          "Apologize sincerely, express concern, and immediately offer a complimentary correction appointment. Avoid being defensive or suggesting the client didn't communicate clearly. The public response should focus on making it right — potential clients will see how you handle problems.",
      },
      {
        question: "Should salons respond to every single review?",
        answer:
          "Yes. Salon services are personal, and every review is an opportunity to strengthen the relationship. Thank clients for positive reviews and address concerns in negative ones. Consistent responses also improve your local search ranking and show potential clients that you're engaged.",
      },
      {
        question: "How can spa businesses encourage more reviews?",
        answer:
          "Ask clients at checkout while the experience is fresh. Send a follow-up text or email with a direct review link within 24 hours. Display a small card at the reception desk with a QR code. Train staff to mention reviews naturally — 'If you enjoyed your visit, we'd love a review!'",
      },
    ],
  },
  {
    slug: "auto",
    name: "Automotive",
    description:
      "Copy-paste automotive review response templates for 1-5 star reviews. Professional responses tailored for auto shops, dealerships, and car service businesses.",
    keywords: [
      "auto shop review response examples",
      "car dealership review reply",
      "mechanic review response template",
      "automotive negative review response",
    ],
    relatedIndustries: ["home-services", "retail", "restaurant", "dental"],
    respondingTips: [
      "Reference the specific service performed to show attention to detail",
      "For pricing complaints, explain your transparent pricing process without being defensive",
      "Highlight certifications, warranties, or guarantees that build trust",
      "For negative reviews, offer to review the service with the lead technician",
    ],
    whyMatters:
      "Trust is the currency of the automotive industry. Customers worry about being overcharged or receiving unnecessary repairs, and reviews are how they vet service providers. A strong review response strategy builds the transparency and trustworthiness that car owners are looking for. Responding to negative reviews about pricing or service quality with professionalism can turn skeptics into loyal customers.",
    faq: [
      {
        question: "How should auto shops respond to overcharging complaints?",
        answer:
          "Never dismiss the concern. Acknowledge that pricing transparency is important to you, briefly explain your pricing process (upfront estimates, approval before work begins), and invite the customer to discuss their invoice in detail. Offer a direct phone number. Future customers will see your commitment to fair pricing.",
      },
      {
        question: "Should car dealerships respond to sales experience reviews?",
        answer:
          "Absolutely. Dealership reviews often focus on the sales experience — pressure tactics, wait times, and transparency. Responding to positive reviews reinforces that your dealership provides a no-pressure experience. For negative reviews, acknowledge the feedback and describe process improvements.",
      },
      {
        question: "How do automotive reviews impact local search visibility?",
        answer:
          "Auto shops depend heavily on local search. 'Mechanic near me' and 'auto repair near me' searches prioritize businesses with strong review profiles. Google considers review quantity, average rating, and response rate when ranking local results. Consistently responding to reviews is one of the best investments an auto business can make in local SEO.",
      },
    ],
  },
  {
    slug: "home-services",
    name: "Home Services",
    description:
      "Copy-paste home services review response templates for 1-5 star reviews. Professional responses tailored for plumbers, electricians, HVAC, and contractors.",
    keywords: [
      "home services review response examples",
      "contractor review response template",
      "plumber review reply",
      "HVAC review response examples",
    ],
    relatedIndustries: ["auto", "real-estate", "retail", "dental"],
    respondingTips: [
      "Reference the specific service performed (plumbing, electrical, HVAC, etc.)",
      "For negative reviews, describe the quality assurance steps you've implemented",
      "Highlight your licensing, insurance, and warranty information",
      "Thank customers for trusting you in their home — it's a personal decision",
    ],
    whyMatters:
      "Homeowners invite service providers into their most personal space — their home. This makes trust absolutely essential. 97% of consumers read reviews for local home service businesses, and the majority won't hire a contractor with fewer than 4 stars. Responding to reviews demonstrates reliability, professionalism, and accountability — the three qualities homeowners value most when choosing a service provider.",
    faq: [
      {
        question: "How should contractors respond to reviews about project delays?",
        answer:
          "Acknowledge the inconvenience, explain the factors that contributed to the delay (supply chain, weather, unforeseen issues), and describe the steps you've taken to prevent similar delays. Avoid making excuses. Show that you take timelines seriously and have implemented better project management practices.",
      },
      {
        question: "Should home service companies respond to reviews on Yelp and Angi?",
        answer:
          "Yes. Homeowners research service providers across multiple platforms. Responding on Yelp, Angi, Google, and other platforms shows consistency and professionalism. Many of these platforms also factor response rates into their ranking algorithms.",
      },
      {
        question: "How do reviews impact home service lead generation?",
        answer:
          "Home service businesses with 4.5+ star ratings and active review responses generate significantly more leads than competitors. Reviews are the digital version of word-of-mouth referrals, which have always been the primary lead source for home service businesses. A strong review strategy can reduce your dependence on paid advertising.",
      },
    ],
  },
  {
    slug: "dental",
    name: "Dental",
    description:
      "Copy-paste dental review response templates for 1-5 star reviews. Professional, HIPAA-conscious responses tailored for dental practices and orthodontists.",
    keywords: [
      "dental review response examples",
      "dentist review response template",
      "dental practice review reply",
      "dental negative review response",
    ],
    relatedIndustries: ["healthcare", "salon-spa", "fitness", "home-services"],
    respondingTips: [
      "Never reference specific dental procedures or conditions — maintain HIPAA compliance",
      "Keep responses warm and reassuring — many patients have dental anxiety",
      "Thank patients for choosing your practice and trusting your team",
      "For negative reviews about wait times, describe scheduling improvements you've made",
    ],
    whyMatters:
      "Dental anxiety is real, and patients actively seek reassurance before choosing a dentist. Reviews that describe a comfortable, caring experience help anxious patients take the first step. Responding to reviews — especially negative ones — with warmth and professionalism demonstrates the patient-centered care that sets great dental practices apart. Like all healthcare, responses must be HIPAA-compliant.",
    faq: [
      {
        question: "Can dental practices respond to reviews about specific procedures?",
        answer:
          "No. Even if the patient mentions a specific procedure, your response must not confirm or reference any treatment details. Use general language like 'We're committed to providing comfortable, high-quality care' and invite them to contact the office for any follow-up concerns.",
      },
      {
        question: "How should dental offices handle reviews about billing or insurance?",
        answer:
          "Acknowledge the frustration, express that billing transparency is important to your practice, and invite the patient to contact your billing coordinator directly. Never discuss specific financial details in a public review response. Offer a phone number or email for resolution.",
      },
      {
        question: "How do reviews help dental practices attract new patients?",
        answer:
          "Most patients find their dentist through online search, and reviews are the top factor in their decision. Dental practices with strong review profiles and active responses rank higher in local search and attract more new patient inquiries. Reviews that mention comfort, gentle care, and friendly staff are especially effective at converting anxious patients.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Copy-paste real estate review response templates for 1-5 star reviews. Professional responses tailored for agents, brokers, and property management companies.",
    keywords: [
      "real estate review response examples",
      "realtor review response template",
      "real estate agent review reply",
      "real estate negative review response",
    ],
    relatedIndustries: ["legal", "home-services", "agency", "hotel"],
    respondingTips: [
      "Reference the specific transaction type (buying, selling, renting) when appropriate",
      "Maintain confidentiality about transaction details and financial information",
      "Highlight your local market expertise and responsiveness",
      "For negative reviews, focus on communication improvements and process changes",
    ],
    whyMatters:
      "Buying or selling a home is one of the biggest financial decisions people make, and they want an agent they can trust completely. 90% of home buyers and sellers research agents online before making contact, and reviews are the primary trust signal. Responding to reviews — especially from past clients who share their experience — reinforces your reputation and builds credibility with future clients.",
    faq: [
      {
        question: "How should real estate agents respond to reviews about communication issues?",
        answer:
          "Acknowledge that communication is critical in real estate transactions and apologize if the client felt uninformed. Describe the specific steps you've taken — such as implementing regular update schedules, dedicated client portals, or additional check-in calls. Show that you take communication feedback seriously.",
      },
      {
        question: "Should real estate agents respond to reviews on Zillow and Realtor.com?",
        answer:
          "Yes. Many home buyers start their agent search on these platforms. Responding to reviews on Zillow, Realtor.com, and Google shows consistency and professionalism. These platforms also feature agent response rates, which can influence whether clients reach out.",
      },
      {
        question: "How do reviews impact real estate lead generation?",
        answer:
          "Agents with strong review profiles receive significantly more inquiries from potential clients. In an industry built on referrals, online reviews are the digital evolution of word-of-mouth. A consistent stream of positive reviews with professional responses can be more effective than paid advertising for generating qualified leads.",
      },
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    description:
      "Copy-paste legal review response templates for 1-5 star reviews. Professional responses tailored for law firms, attorneys, and legal practices.",
    keywords: [
      "law firm review response examples",
      "attorney review response template",
      "lawyer google review reply",
      "legal practice review response",
    ],
    relatedIndustries: ["real-estate", "agency", "saas", "healthcare"],
    respondingTips: [
      "Never reference case details, outcomes, or legal strategies in public responses",
      "Maintain attorney-client privilege in every response — even for positive reviews",
      "Keep responses professional and dignified while still being warm",
      "For negative reviews, invite the client to contact the firm directly",
    ],
    whyMatters:
      "Legal matters are high-stakes and deeply personal. Potential clients searching for an attorney need to trust that they'll be represented competently and treated with respect. Reviews from past clients about communication, outcomes, and professionalism heavily influence attorney selection. However, legal review responses require careful attention to attorney-client privilege — you cannot confirm or deny representation or discuss case details.",
    faq: [
      {
        question: "Can attorneys respond to reviews without violating privilege?",
        answer:
          "Yes, but with strict limitations. Never confirm or deny that the reviewer is a client, and never reference any case details — even if the reviewer disclosed them. Use general language about your firm's values and commitment to client satisfaction. Many bar associations have specific guidelines for responding to online reviews.",
      },
      {
        question: "How should law firms handle fake or defamatory reviews?",
        answer:
          "Respond briefly and professionally — state that you take all feedback seriously and invite direct contact. Then pursue removal through the platform's flagging process. Document the review for potential defamation claims if necessary. Never engage in a public argument, which can escalate the situation.",
      },
      {
        question: "How do reviews impact law firm client acquisition?",
        answer:
          "Legal is one of the most review-dependent industries. 84% of people use online reviews to evaluate attorneys, and many won't contact a firm with fewer than 4 stars. A strong review profile with professional responses can significantly reduce your cost per client acquisition compared to paid advertising.",
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    description:
      "Copy-paste e-commerce review response templates for 1-5 star reviews. Professional responses tailored for online stores, DTC brands, and e-commerce businesses.",
    keywords: [
      "ecommerce review response examples",
      "online store review response template",
      "product review reply examples",
      "ecommerce negative review response",
    ],
    relatedIndustries: ["retail", "saas", "agency", "restaurant"],
    respondingTips: [
      "Reference the specific product purchased and the customer's experience with it",
      "For shipping complaints, explain the issue and your improved fulfillment process",
      "Offer concrete solutions — replacements, refunds, or store credit",
      "Encourage satisfied customers to share photos of their purchases",
    ],
    whyMatters:
      "E-commerce customers can't touch or try products before buying, so reviews are their primary decision-making tool. Products with reviews convert 3-4x better than those without. Responding to reviews — especially negative ones about product quality, shipping, or customer service — shows potential buyers that your brand stands behind its products and takes customer experience seriously.",
    faq: [
      {
        question: "How should e-commerce brands respond to shipping delay complaints?",
        answer:
          "Apologize for the delay, explain the cause if known (carrier issues, high demand), and share the steps you've taken to prevent future delays. If the order is still pending, provide a tracking update. Offer a discount or free shipping on their next order as a goodwill gesture.",
      },
      {
        question: "Should online stores respond to product quality complaints?",
        answer:
          "Always. A product quality complaint is an opportunity to demonstrate your commitment to customer satisfaction. Offer a replacement or refund, ask for photos to investigate the issue, and explain your quality control improvements. Future customers will see that you stand behind your products.",
      },
      {
        question: "How do product reviews impact e-commerce conversion rates?",
        answer:
          "Products with reviews see 3-4x higher conversion rates. Even a single review can boost conversions by 10%. Products with 50+ reviews see an additional 4.6% lift. Negative reviews actually help by building authenticity — purchase likelihood peaks at ratings between 4.0-4.7 stars.",
      },
    ],
  },
  {
    slug: "education",
    name: "Education",
    description:
      "Copy-paste education review response templates for 1-5 star reviews. Professional responses tailored for schools, tutoring centers, online courses, and training providers.",
    keywords: [
      "education review response examples",
      "school review response template",
      "online course review reply",
      "education negative review response",
    ],
    relatedIndustries: ["saas", "fitness", "healthcare", "agency"],
    respondingTips: [
      "Celebrate student achievements and learning milestones mentioned in reviews",
      "For negative reviews about curriculum or teaching, describe improvement plans",
      "Maintain student privacy — don't reference grades, performance, or personal details",
      "Highlight your commitment to educational outcomes and student success",
    ],
    whyMatters:
      "Education is an investment in the future, and students (or their parents) research extensively before enrolling. Reviews about teaching quality, curriculum, support, and outcomes directly influence enrollment decisions. For online courses and training programs, reviews are often the only way to evaluate quality before purchasing. Responding to reviews shows that you value student feedback and are committed to continuous improvement.",
    faq: [
      {
        question: "How should schools respond to reviews about teaching quality?",
        answer:
          "Thank the reviewer for their feedback, acknowledge the importance of excellent instruction, and describe the steps you're taking to maintain or improve teaching quality — such as ongoing teacher training, curriculum updates, or smaller class sizes. Avoid naming specific teachers in negative review responses.",
      },
      {
        question: "Should online course creators respond to platform reviews?",
        answer:
          "Yes. Reviews on platforms like Udemy, Coursera, or Google directly impact enrollment. Responding to feedback shows prospective students that you're engaged and care about the learning experience. For negative reviews, explain course updates you've made based on feedback.",
      },
      {
        question: "How do reviews affect enrollment and course sales?",
        answer:
          "Courses and programs with strong review profiles see significantly higher enrollment rates. For online courses, reviews are the primary conversion factor after the course description. Educational institutions with 4+ star ratings and active review responses consistently outperform competitors in student acquisition.",
      },
    ],
  },
];

// ——— Response examples per industry ———

const responsesByIndustry: Record<string, IndustryReviewResponse[]> = {
  restaurant: [
    { id: 1, stars: 5, reviewText: "Best pasta I've ever had! The carbonara was creamy, rich, and perfectly seasoned. Our server Marco was fantastic and made great wine recommendations.", responseText: "Thank you so much for the kind words! We'll be sure to pass your compliment along to Marco and our kitchen team — the carbonara is our chef's passion project. We'd love to have you back to try our new seasonal risotto. See you soon!", tone: "warm" },
    { id: 2, stars: 5, reviewText: "Amazing brunch experience. The eggs benedict was cooked to perfection and the mimosas were bottomless. Great atmosphere too!", responseText: "So glad you enjoyed brunch with us! Our eggs benedict is a crowd favorite, and we love that you made the most of the bottomless mimosas. We're launching a new weekend brunch menu next month — hope to see you there!", tone: "enthusiastic" },
    { id: 3, stars: 4, reviewText: "Really good food and ambiance. Only reason for 4 stars instead of 5 is the wait time — we waited 30 minutes past our reservation.", responseText: "Thank you for the kind words about our food and ambiance! We sincerely apologize for the wait — that's not the experience we aim to provide. We've adjusted our reservation spacing and added a text notification system so guests aren't left wondering. We hope to welcome you back for a smoother visit.", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Delicious food, generous portions. The steak was cooked exactly as requested. Parking was a bit tricky though.", responseText: "Thank you for the great feedback! We're glad the steak was spot-on — our grill team takes pride in getting it right. We hear you on parking and have partnered with the lot next door for overflow on busy nights. Looking forward to your next visit!", tone: "warm" },
    { id: 5, stars: 3, reviewText: "Food was decent but nothing special. The menu felt overpriced for the portion sizes. Service was friendly though.", responseText: "Thank you for your honest feedback. We're glad the service met your expectations, and we appreciate your thoughts on our menu and pricing. We regularly review our offerings to ensure great value. We'd love a chance to change your mind — please reach out to us at info@restaurant.com for a special return visit.", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Waited over an hour for our entrees. When the food finally arrived, my steak was overcooked and the sides were cold. Very disappointing.", responseText: "We're truly sorry about your experience — that falls well below our standards. An hour wait and overcooked food is unacceptable, and we take full responsibility. We've addressed this with our kitchen team and implemented new timing protocols. We'd love the opportunity to make this right. Please contact our manager at (555) 123-4567 so we can personally ensure your next visit is excellent.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Terrible experience. Found a hair in my soup, and when I told the server, they just shrugged. Manager was nowhere to be found. Never coming back.", responseText: "We're deeply sorry about this experience — finding a hair in your food is unacceptable, and the way it was handled makes it worse. We've retrained our front-of-house staff on proper complaint handling and reinforced our kitchen hygiene protocols. This is not who we are. We'd appreciate the chance to speak with you directly — please reach out to our owner at owner@restaurant.com.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "Nice ambiance and good cocktail menu. The appetizers were great but the main courses were underwhelming. Hit or miss.", responseText: "Thanks for sharing your feedback! We're happy to hear you enjoyed our cocktails and appetizers. We're taking your note about the main courses to heart — our chef is currently refreshing the dinner menu. We'd love for you to give us another try soon.", tone: "professional" },
  ],
  hotel: [
    { id: 1, stars: 5, reviewText: "Absolutely stunning hotel. The room was spotless, the pool area was gorgeous, and the staff went above and beyond to make our anniversary special.", responseText: "Happy anniversary! We're thrilled that you chose to celebrate with us and that our team made it special. It's reviews like yours that remind us why we do what we do. We hope you'll make it an annual tradition — we'd love to welcome you back!", tone: "warm" },
    { id: 2, stars: 5, reviewText: "Best hotel stay in years. The bed was incredibly comfortable, breakfast buffet was outstanding, and the concierge helped us plan the perfect itinerary.", responseText: "What a wonderful review — thank you! We're so glad the bed passed the comfort test (we recently upgraded all mattresses!) and that our concierge team helped make your trip memorable. We'll share your kind words with the breakfast team. Until next time!", tone: "enthusiastic" },
    { id: 3, stars: 4, reviewText: "Beautiful property with great amenities. The room was lovely but the walls were a bit thin — we could hear the neighbors. Otherwise perfect.", responseText: "Thank you for the kind review and for flagging the noise issue. We've been investing in soundproofing improvements and are rolling out upgrades floor by floor. Next time you book, please request one of our newly renovated rooms — we think you'll notice the difference. We'd love to have you back!", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Great location and wonderful staff. Check-in was smooth, room was clean. The only downside was limited parking — had to park two blocks away.", responseText: "Thank you for the great feedback! We're glad check-in and your room exceeded expectations. We understand the parking frustration — we've recently partnered with a nearby garage to offer discounted valet service. Just mention it when you book your next stay!", tone: "warm" },
    { id: 5, stars: 3, reviewText: "Room was okay but felt dated. The carpet had stains, and the bathroom fixtures looked old. Location was good though.", responseText: "Thank you for your candid feedback. We understand that room condition is important, and we're currently in the middle of a phased renovation. We've already completed several floors and plan to finish by fall. We'd love the chance to welcome you back once our refresh is complete — the difference will be night and day.", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Checked in to find our room hadn't been cleaned. Hair in the bathtub, used towels on the floor. Front desk moved us but it took 45 minutes.", responseText: "We sincerely apologize for this unacceptable experience. Finding an uncleaned room is not the first impression we want to make. We've launched new room inspection protocols and increased housekeeping oversight to prevent this from happening again. We'd like to make this right — please contact our guest services manager at gm@hotel.com so we can discuss a complimentary future stay.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Worst hotel experience ever. AC didn't work in July, no hot water in the morning, and the front desk was rude when we complained. Avoid this place.", responseText: "We're deeply sorry for this experience — it falls far below our standards. No working AC and no hot water are critical issues that should have been resolved immediately, and rudeness from our staff is never acceptable. We've addressed the maintenance issues and conducted additional hospitality training. We'd like to speak with you directly — please reach out to our general manager at (555) 987-6543.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "Decent hotel for the price. Room was small but clean. Breakfast options were limited. Good for a short business trip.", responseText: "Thank you for the fair review! We're glad the room met cleanliness standards for your business trip. We've recently expanded our breakfast menu with more options including grab-and-go items for busy travelers. We hope you'll notice the improvements on your next visit.", tone: "professional" },
  ],
  healthcare: [
    { id: 1, stars: 5, reviewText: "Dr. Chen is the best doctor I've ever had. She takes time to listen, explains everything clearly, and genuinely cares about her patients. The entire staff is wonderful.", responseText: "Thank you for sharing this wonderful feedback! We're so glad you feel heard and well-cared for at our practice. Your kind words mean the world to our entire team. We're committed to providing compassionate, thorough care to every patient.", tone: "warm" },
    { id: 2, stars: 5, reviewText: "Outstanding experience from check-in to checkout. Minimal wait time, friendly nurses, and the doctor was thorough and patient with all my questions.", responseText: "Thank you for the kind review! We work hard to make every visit efficient and comfortable, and we're glad it showed. Our team believes that no question is too small — your health and understanding matter to us. We look forward to continuing to care for you.", tone: "professional" },
    { id: 3, stars: 4, reviewText: "Great doctor and staff. The only issue is the wait time — I waited 40 minutes past my appointment time. Otherwise, excellent care.", responseText: "Thank you for the positive feedback about our care team! We sincerely apologize for the extended wait time — we know your time is valuable. We've recently updated our scheduling system to reduce delays and are committed to getting this right. We appreciate your patience and look forward to your next visit.", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Very thorough appointment. The doctor took time to explain my options and answer questions. Scheduling was a bit difficult — had to wait 3 weeks.", responseText: "Thank you for your feedback! We're glad your appointment was thorough and informative. We understand that scheduling wait times can be frustrating — we've added additional appointment availability and are working to reduce wait times for new and returning patients. We appreciate your patience.", tone: "professional" },
    { id: 5, stars: 3, reviewText: "The doctor was fine but the front desk staff seemed disorganized. My insurance information was entered wrong twice, causing billing issues.", responseText: "We're sorry to hear about the billing difficulties and understand how frustrating that must be. We take administrative accuracy seriously and have addressed this with our front office team. Please contact our billing coordinator at (555) 111-2222 so we can resolve this for you promptly.", tone: "empathetic" },
    { id: 6, stars: 2, reviewText: "Felt very rushed during my appointment. The doctor barely made eye contact and didn't address all my concerns. Expected much better.", responseText: "We're sorry to hear you felt rushed — every patient deserves our full attention and time. This feedback has been shared with our care team, and we're reviewing our appointment scheduling to ensure adequate time for each patient. We'd welcome the opportunity to address your remaining concerns. Please call our office at (555) 333-4444.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Absolutely terrible experience. Waited over an hour, was misdiagnosed, and had to go to another doctor to get proper treatment. Unprofessional.", responseText: "We take your feedback very seriously and are deeply sorry about your experience. Patient care and safety are our highest priorities. We'd like to review the details of your visit to understand what happened and ensure it doesn't happen again. Please contact our patient relations team at patientcare@practice.com so we can address this directly.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "Clean facility and friendly nurses. The doctor was competent but the overall experience felt like a factory — in and out without much personal attention.", responseText: "Thank you for your feedback. We understand the importance of feeling personally cared for, not just treated. We've been working on enhancing the patient experience, including longer appointment windows and better continuity of care. Your input helps us improve, and we hope you'll notice the changes on your next visit.", tone: "professional" },
  ],
  retail: [
    { id: 1, stars: 5, reviewText: "Love this store! The selection is amazing, prices are fair, and the staff is incredibly helpful. Sarah helped me find exactly what I was looking for.", responseText: "Thank you for the wonderful review! We'll make sure Sarah sees this — she truly loves helping customers find the perfect item. We're constantly updating our selection, so there's always something new to discover. We hope to see you again soon!", tone: "warm" },
    { id: 2, stars: 5, reviewText: "Best shopping experience in town. The store is beautifully organized, the quality is top-notch, and they gift-wrapped my purchase for free. Will definitely be back!", responseText: "What a lovely review — thank you! We take pride in our store presentation and are so glad you noticed. Gift wrapping is one of those little touches we love providing. We're excited to have you as a regular — see you next time!", tone: "enthusiastic" },
    { id: 3, stars: 4, reviewText: "Great store with quality products. The only issue was limited sizing — they didn't have my size in the style I wanted. Staff offered to order it though.", responseText: "Thank you for the feedback! We're glad you appreciate our quality and that our team offered to order your size. We're expanding our size range based on customer feedback like yours. Next time, you can also check our website for real-time inventory before visiting!", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Nice selection and friendly staff. Prices are a bit higher than online retailers, but the in-store experience and being able to try things on makes it worth it.", responseText: "Thank you for seeing the value in shopping with us! We know we compete with online pricing, and we work hard to make the in-store experience worth it — knowledgeable staff, try-before-you-buy, and instant gratification. We appreciate your loyalty!", tone: "warm" },
    { id: 5, stars: 3, reviewText: "Decent store but it was really messy when I visited. Clothes were on the floor, fitting rooms had items left in them. Staff seemed overwhelmed.", responseText: "Thank you for this feedback — we're sorry the store wasn't up to our standards during your visit. We've increased staffing during peak hours and implemented more frequent floor resets to maintain the shopping environment you deserve. We hope you'll give us another chance.", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Bought a jacket that started falling apart after two weeks. When I tried to return it, they said it was past the return window. Very disappointing quality.", responseText: "We're sorry to hear about the jacket quality — that's not what we stand for. Product durability matters to us, and we'd like to make this right. Please bring the jacket back to the store and ask for a manager, or email us at support@store.com. We'll work with you on a solution regardless of the return window.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Rude staff, overpriced items, and they tried to push a loyalty program on me three times during checkout. Won't be shopping here again.", responseText: "We sincerely apologize for this experience. Rudeness is never acceptable, and we'll be addressing this with our team. We've also updated our loyalty program training to ensure it's offered once as an option, never as a pressure tactic. We'd appreciate the chance to regain your trust — please reach out to our store manager at manager@store.com.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "Good product variety but the checkout process was slow. Only two registers open on a Saturday afternoon with a long line. Products themselves are nice though.", responseText: "Thank you for your patience and for the product compliment! We agree — weekend checkout should be faster. We've added additional registers and are implementing a mobile checkout option for faster service. We appreciate the feedback and hope your next visit is smoother.", tone: "professional" },
  ],
  saas: [
    { id: 1, stars: 5, reviewText: "This software has completely transformed our workflow. Onboarding was smooth, the UI is intuitive, and our team adopted it within a week. Huge time saver.", responseText: "This is exactly what we love to hear — thank you! Fast adoption is something we obsess over, so knowing your team was up and running in a week is incredibly rewarding. If you ever need anything, our customer success team is just a click away. Thanks for being a part of our community!", tone: "enthusiastic" },
    { id: 2, stars: 5, reviewText: "Outstanding product and even better support team. Had an integration issue and their support resolved it within an hour. Rare to see this level of care in SaaS.", responseText: "Thank you for the kind words! Our support team works incredibly hard, and reviews like this mean the world to them. Fast resolution is a core commitment — we know your business depends on it. We're glad the integration is running smoothly now!", tone: "warm" },
    { id: 3, stars: 4, reviewText: "Great product overall. Love the dashboard and reporting features. Would be 5 stars if the mobile app were better — it's slow and missing some desktop features.", responseText: "Thank you for the thoughtful review! We're glad the dashboard and reporting are hitting the mark. You're right that our mobile app needs improvement — it's our top development priority this quarter. We're working on a major mobile update that should address speed and feature parity. Stay tuned!", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Solid tool that does what it promises. Good value for the price. Integration with our existing tools was mostly smooth, with a few hiccups on the CRM side.", responseText: "Thanks for the honest feedback! We're glad the value proposition is strong. We've been improving our CRM integrations and recently released updates for several connectors. If you run into any remaining hiccups, our integrations team would love to help — reach out at integrations@company.com.", tone: "professional" },
    { id: 5, stars: 3, reviewText: "Decent software but the learning curve is steep. Documentation is sparse, and I had to figure out a lot on my own. The product itself works once you understand it.", responseText: "Thank you for this feedback — it's really valuable. We've heard similar comments about onboarding and are investing heavily in our documentation, video tutorials, and guided walkthroughs. We've recently launched an interactive onboarding series that should help. We'd also love to offer you a free 1-on-1 training session — reach out to success@company.com.", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Promised features during the sales process that don't exist. The product is okay but definitely oversold. Support takes days to respond.", responseText: "We're sorry about the disconnect between expectations and experience — that's not acceptable. We've updated our sales training to ensure accurate feature representation, and we've expanded our support team to achieve same-day response times. We'd like to discuss your specific concerns — please contact our VP of Customer Success at vp-cs@company.com.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Buggy software that crashes constantly. Lost two hours of work because there's no auto-save. Support was unhelpful and kept sending canned responses. Cancelled.", responseText: "We're deeply sorry for this experience. Losing work is unacceptable, and we take full responsibility. We've since implemented auto-save (now active for all users) and overhauled our support team's training to eliminate generic responses. We understand we lost your trust, and we own that. If you'd ever consider giving us another chance, we'd offer an extended free trial — reach out to me directly at ceo@company.com.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "The core features work well but the pricing feels high for what you get. Competitors offer similar features for less. Would love to see more value at the current price point.", responseText: "Thank you for the candid feedback on pricing. We hear you, and we're working on adding more value to every tier — including several new features launching this quarter. We'd love to show you what's coming. If you'd like a preview, our product team would be happy to walk you through the roadmap — reach out at product@company.com.", tone: "professional" },
  ],
  agency: [
    { id: 1, stars: 5, reviewText: "Incredible agency. They completely redesigned our brand identity and the results speak for themselves — 40% increase in lead generation within 3 months.", responseText: "Thank you for this amazing review! A 40% increase in leads is exactly the kind of impact we strive for. It was a pleasure working with your team — the collaboration made the rebrand process smooth and creative. We're excited to see what's next for your brand!", tone: "enthusiastic" },
    { id: 2, stars: 5, reviewText: "Best marketing agency we've worked with. They listen, they deliver on time, and the quality of work is consistently excellent. True partners.", responseText: "This means so much to us — thank you! We pride ourselves on being true partners, not just vendors. Your team's clear communication and trust made this collaboration exceptional. Here's to many more successful projects together!", tone: "warm" },
    { id: 3, stars: 4, reviewText: "Great creative work and solid strategy. The team is talented and responsive. Only knocked off a star because the project went slightly over budget.", responseText: "Thank you for the kind words about our creative and strategy work! We apologize for the budget overrun — we've since improved our scoping and estimate process to provide more accurate projections upfront. Transparency on costs is important to us. We appreciate your trust and look forward to the next project.", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Solid work on our paid media campaigns. ROAS improved significantly. Would appreciate more proactive communication and fewer meetings that could have been emails.", responseText: "Thank you for the ROAS feedback — great to hear the campaigns are performing! We hear you on communication efficiency. We've transitioned to async weekly updates with optional live check-ins, which many clients prefer. We'll make sure your account team implements this for you immediately.", tone: "professional" },
    { id: 5, stars: 3, reviewText: "Mixed experience. The initial strategy presentation was impressive, but execution didn't quite match the vision. Some deliverables felt rushed.", responseText: "Thank you for this honest feedback — the gap between strategy and execution is something we take very seriously. We've restructured our production workflow and added quality checkpoints to ensure deliverables meet the standard we set during strategy. We'd welcome the opportunity to demonstrate the improvements on your next initiative.", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Hired them for social media management. Content was generic and clearly not tailored to our brand voice. Felt like we were just another account.", responseText: "We're sorry the content didn't reflect your unique brand voice — that's a failure on our part. We've since implemented deeper brand immersion sessions at the start of every engagement and added dedicated brand voice guides for each client. We'd love a chance to show you the difference. Please reach out to our creative director at cd@agency.com.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Complete waste of money. Missed every deadline, delivered below-average work, and were unreachable for days at a time. Do not recommend.", responseText: "We're deeply sorry for this experience — it does not reflect our standards or values. Missing deadlines and being unreachable are inexcusable. We've conducted a thorough internal review and made significant changes to our project management process and client communication protocols. We understand this doesn't undo your experience, but we want you to know we're taking it seriously. Our managing director would welcome the chance to speak with you — md@agency.com.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "Good ideas but slow turnaround. We had to chase them for updates regularly. The final deliverables were good quality when they eventually arrived.", responseText: "Thank you for acknowledging the quality of our work, and we sincerely apologize for the delays and communication gaps. We've implemented new project management tools with real-time client dashboards, so you'll always know the status of your deliverables. We'd love to prove that the turnaround has improved.", tone: "professional" },
  ],
  fitness: [
    { id: 1, stars: 5, reviewText: "This gym changed my life! The trainers are knowledgeable, the equipment is top-notch, and the community is incredibly supportive. Down 30 pounds!", responseText: "Congratulations on your incredible transformation — 30 pounds is a huge achievement! Your dedication inspires everyone at the gym. Our trainers and community are so proud of your progress. Keep crushing it — the best is yet to come!", tone: "enthusiastic" },
    { id: 2, stars: 5, reviewText: "Best yoga studio in the city. The instructors are amazing, classes are well-structured, and the space is so peaceful. It's my favorite part of the week.", responseText: "Thank you for the beautiful review! Hearing that our studio is your weekly highlight means everything to us. Our instructors pour their hearts into every class, and your kind words will make their day. Namaste!", tone: "warm" },
    { id: 3, stars: 4, reviewText: "Great gym with lots of equipment and classes. Only complaint is that it gets very crowded during peak hours — hard to get on the machines.", responseText: "Thank you for the feedback! We hear you on peak-hour crowding — it's our biggest challenge. We've added new equipment to reduce wait times and launched off-peak incentive pricing. We're also extending hours on weekends. We're working on it!", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Love the classes and the trainers. Good variety of programs. The locker rooms could use an update — showers are a bit outdated.", responseText: "Thank you for the kind words about our classes and trainers! You're right that our locker rooms need some love — we've scheduled a full renovation starting next month with new showers, flooring, and upgraded amenities. Can't wait for you to see the finished result!", tone: "warm" },
    { id: 5, stars: 3, reviewText: "Decent gym but the music is way too loud. Asked the front desk multiple times and nothing changed. Equipment is good though.", responseText: "Thank you for bringing this up — we've heard similar feedback and have installed a new sound system with zone controls so volume can be adjusted in different areas. We've also designated quiet zones for members who prefer a calmer atmosphere. We hope you'll notice the improvement!", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Signed up for personal training and my trainer cancelled three sessions in a row. No explanation, no offer to make up the sessions. Waste of money.", responseText: "We sincerely apologize for this unacceptable experience. Cancelled sessions without makeup offers violates our training policy. We've addressed this internally and would like to offer you complimentary sessions to make up for the missed ones. Please contact our fitness director at fitness@gym.com to schedule them.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Cancelling membership was a nightmare. They kept charging me for 3 months after I cancelled. Customer service was unhelpful and rude. Avoid.", responseText: "We're deeply sorry for the billing issues and the way you were treated. Being charged after cancellation is unacceptable, and we're investigating what went wrong. We've simplified our cancellation process and retrained our customer service team. Please contact our billing manager at billing@gym.com — we'll process your refund immediately.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "The gym itself is fine — clean, decent equipment. But the trainers seem more interested in selling packages than actually helping. Felt like a sales pitch.", responseText: "Thank you for this feedback — it's not the experience we want our members to have. We've restructured our training team's approach to focus on member goals first, with no sales pressure during sessions. Your comfort and progress are what matter. We'd love to offer you a complimentary no-pressure session to show the difference.", tone: "professional" },
  ],
  "salon-spa": [
    { id: 1, stars: 5, reviewText: "Maria is a hair genius! She understood exactly what I wanted and delivered the most beautiful balayage. The salon is gorgeous and everyone is so friendly.", responseText: "Maria will be thrilled to hear this — thank you! She takes such pride in getting every balayage just right. We're so glad you loved the result and the salon atmosphere. Can't wait to see you at your next appointment!", tone: "warm" },
    { id: 2, stars: 5, reviewText: "The spa day package was absolutely divine. The facial, massage, and mani-pedi were all incredible. Left feeling completely rejuvenated. Worth every penny.", responseText: "What a lovely review — thank you! Our spa day package is designed to be a complete reset, and we're so happy you felt rejuvenated. Our therapists will love hearing this. We hope you'll treat yourself again soon!", tone: "enthusiastic" },
    { id: 3, stars: 4, reviewText: "Really happy with my haircut and the stylist was great. The only thing is the salon was running behind and I had to wait 20 minutes past my appointment.", responseText: "Thank you for the kind feedback about your haircut! We apologize for the wait — we know your time is valuable. We've adjusted our booking intervals to give each client adequate time without creating delays. We appreciate your patience and look forward to a perfectly timed next visit!", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Great massage and beautiful facility. Very relaxing atmosphere. Would have given 5 stars but the checkout process was a bit disorganized.", responseText: "Thank you for the wonderful feedback about your massage! We're sorry about the checkout experience — we've streamlined our front desk process and added a digital payment option for faster departures. Nothing should disrupt the relaxation you just experienced!", tone: "warm" },
    { id: 5, stars: 3, reviewText: "The color treatment was okay but not exactly what I showed in the reference photo. The stylist was nice but I was hoping for a closer match.", responseText: "We understand how important it is to achieve the exact look you're envisioning. We're sorry the color didn't match your reference. We'd love to have you come back for a complimentary color correction — please call us at (555) 777-8888 to schedule. Getting it right is our priority.", tone: "empathetic" },
    { id: 6, stars: 2, reviewText: "Got my nails done and two of them chipped the next day. For the price I paid, I expected better quality and longevity. Disappointed.", responseText: "We're sorry about the chipping — that's not the quality we stand behind. We've reviewed our gel and polish application process with our nail team. Please come back for a complimentary fix-up — no appointment needed, just mention this review. We want to make sure you leave happy.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Worst salon experience of my life. The stylist completely butchered my hair — asked for a trim and lost 4 inches. I left in tears. No accountability from the owner.", responseText: "We are so sorry for this deeply upsetting experience. Losing 4 inches when you asked for a trim is a serious mistake, and we understand your frustration. Our owner would like to speak with you personally to make this right — please contact us at owner@salon.com or call (555) 999-0000. We take full responsibility and want to help.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "Clean salon with a nice vibe. The blowout was decent but didn't last as long as I expected. Staff was friendly and professional though.", responseText: "Thank you for the kind words about our team and atmosphere! We're sorry the blowout didn't last as long as expected. Our stylists can apply longer-lasting finishing techniques — let us know your preference at your next visit and we'll customize the approach for your hair type.", tone: "professional" },
  ],
  auto: [
    { id: 1, stars: 5, reviewText: "Honest, fair, and fast. Brought my car in for an oil change and they spotted a brake issue — fixed everything same day at a fair price. Trustworthy shop.", responseText: "Thank you for trusting us with your car! We're glad we caught the brake issue early — safety is always our top priority. Our technicians take pride in being thorough and transparent. We appreciate your loyalty and look forward to keeping your car running smoothly!", tone: "warm" },
    { id: 2, stars: 5, reviewText: "Best dealership experience I've ever had. No pressure sales, transparent pricing, and the team made buying a car actually enjoyable. Will recommend to everyone.", responseText: "Thank you for the amazing review! We've worked hard to create a no-pressure, transparent buying experience, and it means a lot to hear it's working. Our sales team will love this feedback. Enjoy the new car, and we're here whenever you need us!", tone: "enthusiastic" },
    { id: 3, stars: 4, reviewText: "Good repair work and fair pricing. They explained everything they were doing and why. Only reason for 4 stars is the 2-day turnaround — I needed my car sooner.", responseText: "Thank you for the positive feedback about our work and transparency! We understand the turnaround time was longer than ideal. We've expanded our team and added an express service lane for common repairs. We'll work harder to get you back on the road faster next time!", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Reliable shop that I've been using for years. Always does quality work. The waiting area could use an update though — uncomfortable chairs and no WiFi.", responseText: "Thank you for being a loyal customer — we value your trust! You'll be happy to know we're upgrading our waiting area this month with comfortable seating, free WiFi, and complimentary coffee. Your years of feedback helped make it happen!", tone: "warm" },
    { id: 5, stars: 3, reviewText: "Came in for a simple tire rotation and was told I needed $800 in additional work. Got a second opinion elsewhere and was told it wasn't needed. Trust broken.", responseText: "We take this feedback very seriously. We never want a customer to feel pressured into unnecessary repairs. We've reviewed our inspection and recommendation process and implemented a mandatory second-technician verification for all repair estimates over $500. We'd welcome the chance to earn your trust back.", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Dropped my car off at 8am for a brake job and wasn't told it was ready until 5pm. No updates throughout the day. When I called, they couldn't find my paperwork.", responseText: "We sincerely apologize for the poor communication and disorganization. You deserve to be kept informed about your vehicle's status. We've implemented a text-based update system that sends progress notifications throughout the service. We've also digitized our intake process to prevent paperwork issues. Please reach out to our service manager at (555) 444-5555.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Complete rip-off. Charged me $1200 for a repair that another shop quoted at $600. When I questioned the price, the manager was dismissive and condescending. Never again.", responseText: "We're very sorry for this experience. Pricing transparency and respect are fundamental to our business, and we clearly fell short on both counts. We've implemented competitive price matching and additional customer service training for our management team. We understand trust is earned, and we'd like the chance to demonstrate that — our owner can be reached at owner@autoshop.com.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "The mechanic did a decent job on the repair, but the shop is disorganized. Appointments don't seem to mean much — I waited 30 minutes to even check in.", responseText: "Thank you for the feedback on the repair quality. We apologize for the check-in delay — we know appointment times should mean something. We've upgraded to a digital appointment system with staggered scheduling to eliminate the backlog at check-in. We appreciate your patience and hope your next visit is smoother.", tone: "professional" },
  ],
  "home-services": [
    { id: 1, stars: 5, reviewText: "Called for an emergency plumbing issue on a Sunday and they were at my door within 45 minutes. Fixed the leak quickly, cleaned up after themselves, and pricing was fair.", responseText: "Thank you for the wonderful review! Emergency calls are what we're here for, and we're glad we could respond quickly. We take pride in leaving your home as clean as we found it. We're always just a call away if you need us again!", tone: "warm" },
    { id: 2, stars: 5, reviewText: "Had our entire HVAC system replaced. The team was professional, on time, and finished ahead of schedule. They even walked us through the new thermostat. Highly recommend!", responseText: "Thank you for trusting us with such a major project! Our HVAC team takes pride in efficiency and education — we want every homeowner to understand their system. We're glad the installation went smoothly and hope you're enjoying perfect temperatures at home!", tone: "enthusiastic" },
    { id: 3, stars: 4, reviewText: "Good electrical work — rewired our kitchen outlets safely and up to code. Only hiccup was a scheduling change last minute that wasn't communicated well.", responseText: "Thank you for the positive feedback on our electrical work! We apologize for the scheduling miscommunication — we've improved our notification system so any changes are communicated immediately via text and email. Your time matters to us and we'll do better.", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Solid roofing job. They showed us photos of the damage before starting, explained the repair plan, and finished in one day. A bit pricey but quality work.", responseText: "Thank you for appreciating our transparent approach! We believe in showing homeowners exactly what needs fixing before we start. While we may not always be the cheapest option, we stand behind every repair with a warranty. We're glad the roof is back in great shape!", tone: "professional" },
    { id: 5, stars: 3, reviewText: "The plumbing repair itself was fine, but the technician tracked mud through our house and didn't clean up. Had to mop the floors after they left.", responseText: "We sincerely apologize — that's not how we operate. Our technicians are trained to use boot covers and drop cloths, and we've reinforced this policy with our entire team. We'd like to send a crew to clean up at no charge. Please call us at (555) 222-3333 and we'll schedule it immediately.", tone: "empathetic" },
    { id: 6, stars: 2, reviewText: "Hired them for a bathroom remodel. Project was supposed to take 2 weeks but took 6 weeks. Communication was terrible — couldn't get updates without calling multiple times.", responseText: "We're sorry for the significant delay and poor communication on your bathroom remodel. A 4-week overrun is unacceptable, and you deserved regular updates throughout. We've hired a dedicated project coordinator and implemented weekly client updates for all renovation projects. We'd like to discuss compensation for the inconvenience — please contact our owner at (555) 888-9999.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Worst experience with a contractor ever. Damaged our hardwood floors during a plumbing repair and refused to take responsibility. Had to hire someone else to fix the damage.", responseText: "We're deeply sorry for the damage to your floors and the way it was handled. Damaging a customer's property and not taking responsibility is against everything we stand for. We want to make this right immediately — please contact our general manager at gm@homeservices.com with photos and the repair invoice. We will cover the cost.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "The AC repair seems to be holding up well. Technician was knowledgeable. The quoting process was slow though — took 3 days just to get an estimate.", responseText: "Glad to hear the AC repair is running well! We apologize for the slow estimate — we've streamlined our quoting process and now offer same-day estimates for standard repairs. For larger projects, we commit to 24-hour turnaround on quotes. Thank you for your patience and feedback.", tone: "professional" },
  ],
  dental: [
    { id: 1, stars: 5, reviewText: "I have terrible dental anxiety but Dr. Park and the team made me feel so comfortable. They explained everything before doing it and constantly checked if I was okay. Best dentist ever!", responseText: "Thank you so much for sharing this! We understand dental anxiety is real, and our entire team is committed to making every visit as comfortable as possible. Your trust means the world to us. We're here whenever you need us — no judgment, just gentle care.", tone: "warm" },
    { id: 2, stars: 5, reviewText: "Excellent dental practice. Clean, modern office, friendly staff, and Dr. Lee is incredibly skilled. My family has been going here for 5 years and we love it.", responseText: "Five years of trust — thank you! We're honored to care for your whole family. Our team strives to create a welcoming environment for patients of all ages. We look forward to many more years of keeping your family's smiles healthy!", tone: "warm" },
    { id: 3, stars: 4, reviewText: "Great dentist and very gentle with cleanings. The office is nice and the staff is friendly. Only downside is that parking is very limited.", responseText: "Thank you for the kind words about our care and team! We understand parking can be challenging — we've recently arranged overflow parking at the building next door and added clear signage to guide patients. We'll also validate parking for visits over 30 minutes.", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Very thorough exam and the hygienist was great. Appreciated the digital X-rays and the dentist took time to explain everything. Wait time was about 15 minutes.", responseText: "Thank you for the positive feedback! We invest in modern technology like digital X-rays because we believe in thorough, transparent care. We apologize for the brief wait and are working on tightening our schedule. We appreciate your understanding!", tone: "professional" },
    { id: 5, stars: 3, reviewText: "The dental work itself was fine, but the billing was confusing. I received multiple bills for different amounts and the office couldn't clearly explain the charges.", responseText: "We're sorry for the billing confusion — that's stressful and unnecessary. We've upgraded our billing system to provide a clear, single statement with itemized charges. Our billing coordinator is available to walk you through any questions at (555) 666-7777. We want to make this right.", tone: "empathetic" },
    { id: 6, stars: 2, reviewText: "My filling fell out after two months. When I called, they wanted to charge me again for the replacement. I shouldn't have to pay twice for work that didn't hold.", responseText: "We understand your frustration and agree — you should not have to pay twice. We stand behind our work, and filling replacements within our warranty period are covered at no charge. Please call us at (555) 444-5555 to schedule a complimentary repair. We apologize for the miscommunication.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "The worst dental experience of my life. The injection was extremely painful, the dentist was rough, and I was told I needed 5 fillings that another dentist said I didn't need.", responseText: "We're very sorry about your painful experience and the concern about treatment recommendations. Every patient deserves gentle care and honest treatment plans. We take this feedback seriously and welcome the opportunity to review your case with you. Please contact our practice manager at pm@dental.com so we can discuss this directly.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "Clean office and friendly reception staff. The hygienist was a bit rough during the cleaning though. Dentist was good but felt rushed during the exam.", responseText: "Thank you for the feedback about our office and reception team! We're sorry the cleaning felt rough — our hygienists are trained in gentle techniques, and we'll share this feedback for improvement. We're also adjusting appointment times to ensure our dentists have adequate time for thorough, unhurried exams.", tone: "professional" },
  ],
  "real-estate": [
    { id: 1, stars: 5, reviewText: "Sarah made our first home purchase so smooth! She was patient, knowledgeable about the neighborhood, and negotiated an amazing deal for us. Couldn't have done it without her.", responseText: "Thank you for this wonderful review! Helping first-time buyers find their dream home is the most rewarding part of what we do. Sarah loved working with you, and she's thrilled you're happy with the outcome. Enjoy your new home, and don't hesitate to reach out if you ever need anything!", tone: "warm" },
    { id: 2, stars: 5, reviewText: "Sold our house in 10 days above asking price. The marketing strategy was impressive — professional photos, virtual tour, and targeted advertising. Exceptional agent.", responseText: "What incredible results — congratulations on the sale! Our marketing approach is designed to maximize exposure and drive competitive offers. We're glad the strategy delivered beyond expectations. Thank you for trusting us with such an important milestone!", tone: "enthusiastic" },
    { id: 3, stars: 4, reviewText: "Good agent who knows the local market well. Helped us find a great rental. Would have been 5 stars with slightly faster response times to emails.", responseText: "Thank you for the kind feedback and for noting the response time. We agree that timely communication is crucial in real estate. We've implemented a 2-hour response policy for all client communications. We're glad you found a great rental and are here if you need anything!", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Professional and well-organized throughout the buying process. Kept us informed at every step. The closing process had a few hiccups with paperwork, but overall great experience.", responseText: "Thank you for the positive review! We're glad you felt informed throughout the process. We apologize for the closing paperwork hiccups — we've streamlined our documentation process to catch any issues earlier. Congratulations on your new home!", tone: "professional" },
    { id: 5, stars: 3, reviewText: "The agent was nice but didn't seem to understand what we were looking for. Showed us several properties that didn't match our criteria. Eventually found something but it took longer than expected.", responseText: "We're sorry the property search didn't align with your criteria from the start. Understanding exactly what our clients want is fundamental, and we should have done better. We've enhanced our initial consultation process to include detailed preference questionnaires. We're glad you found a home but wish the journey had been smoother.", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Our agent was impossible to reach. Would take days to return calls and missed two important deadlines. We almost lost the house because of it. Very stressful.", responseText: "We're sincerely sorry for the communication failures and missed deadlines — especially in such a high-stakes transaction. This is unacceptable and has been addressed with the agent and our management team. We've implemented automated deadline tracking and mandatory daily check-ins for active transactions. Please contact our broker at broker@realty.com.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Do not use this agency. Our agent pressured us into making an offer on a house with known issues that weren't disclosed. When we tried to back out, they were pushy and unprofessional.", responseText: "We're deeply concerned by this experience. Pressuring clients and failing to disclose known issues goes against our code of ethics and professional standards. Our managing broker would like to speak with you directly to understand what happened and ensure accountability. Please reach out at managing-broker@realty.com or call (555) 321-0000.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "Average experience. The agent was competent but didn't go above and beyond. Felt like just another transaction. The paperwork was handled efficiently though.", responseText: "Thank you for the honest feedback. We strive for more than competent — we want every client to feel like a priority. We've enhanced our client experience program to include personalized touches and proactive communication throughout the process. We'd love a chance to exceed your expectations next time.", tone: "professional" },
  ],
  legal: [
    { id: 1, stars: 5, reviewText: "Excellent law firm. Attorney Johnson was professional, responsive, and achieved a better outcome than I expected. She kept me informed at every stage and explained complex legal concepts clearly.", responseText: "Thank you for the kind words about Attorney Johnson and our firm. We believe that keeping clients informed and demystifying the legal process is essential. We're honored to have represented you and are glad the outcome exceeded your expectations.", tone: "professional" },
    { id: 2, stars: 5, reviewText: "This firm handled our business incorporation perfectly. Fast, thorough, and reasonably priced. They anticipated questions I didn't even know to ask. Highly recommend for any business legal needs.", responseText: "Thank you for this wonderful review! We take pride in anticipating our clients' needs and providing proactive guidance. Business formation is a critical step, and we're glad we could make the process smooth and thorough. We're here whenever your business needs legal support.", tone: "warm" },
    { id: 3, stars: 4, reviewText: "Good legal representation and a positive outcome. The attorney was knowledgeable. The billing was a bit higher than the initial estimate, which was surprising.", responseText: "Thank you for the positive feedback on our representation. We understand that billing surprises are unwelcome and take this feedback seriously. We've improved our estimate transparency and now provide detailed billing updates when cases exceed initial projections. We're glad the outcome was positive.", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Solid estate planning attorney. Took time to understand our family situation and created a comprehensive plan. Would appreciate faster document turnaround times.", responseText: "Thank you for the thoughtful feedback! We're glad the estate plan addresses your family's needs. We've hired additional support staff to improve document turnaround times and now provide estimated completion dates for all engagements. We appreciate your patience.", tone: "professional" },
    { id: 5, stars: 3, reviewText: "The attorney was competent but I felt like I was always the one initiating communication. I had to call multiple times for updates on my case. Stressful when you're already dealing with a legal issue.", responseText: "We understand how stressful legal matters are, and you deserve proactive communication without having to chase updates. We've implemented a scheduled update system — clients receive regular status updates regardless of case activity. We take this feedback seriously and are committed to improvement.", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Hired them for a simple contract review and it took 3 weeks. When I followed up, they had lost my documents. Eventually completed the work but the experience was frustrating.", responseText: "We sincerely apologize for losing your documents and the unacceptable delay. We've transitioned to a secure digital document management system to prevent this from happening again. We understand this eroded your trust, and we take full responsibility. Our managing partner would welcome the opportunity to discuss this — mp@lawfirm.com.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Terrible experience. Attorney missed a critical filing deadline that severely damaged my case. No apology, no accountability. Considering filing a complaint with the bar.", responseText: "We take this matter extremely seriously. Missing a filing deadline is a grave error, and we understand the impact on your case. Our firm's management is conducting a thorough review of what occurred. We ask that you contact our managing partner directly at (555) 100-2000 so we can address this immediately and discuss all available options.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "The lawyer was knowledgeable but the office felt outdated and disorganized. Paperwork was handled manually and the process felt slow compared to other firms I've used.", responseText: "Thank you for the candid feedback. We're investing in modernizing our practice — including digital intake, electronic signatures, and a client portal for real-time case access. We believe these improvements will significantly streamline your experience. We appreciate your patience during this transition.", tone: "professional" },
  ],
  ecommerce: [
    { id: 1, stars: 5, reviewText: "Love this brand! The product quality exceeded my expectations, packaging was beautiful, and it arrived in 2 days. Already ordered again!", responseText: "Thank you so much! We put a lot of thought into both product quality and packaging, so we're thrilled you noticed. And a repeat order already — that's the best compliment we can receive! We can't wait for you to see what's arriving.", tone: "enthusiastic" },
    { id: 2, stars: 5, reviewText: "Customer service is outstanding. Had an issue with my order and they resolved it within hours with a replacement and a handwritten apology note. This is how you build loyalty.", responseText: "This review made our day — thank you! Our customer service team genuinely cares about every order, and the handwritten notes are one of our favorite touches. We're so glad we could make it right quickly. Thank you for being a loyal customer!", tone: "warm" },
    { id: 3, stars: 4, reviewText: "Great product and fast shipping. The only reason for 4 stars is the sizing was a bit off — had to exchange for a different size. Exchange process was smooth though.", responseText: "Thank you for the feedback! We're glad the exchange was seamless. We've updated our sizing guide with more detailed measurements and customer-reported fit notes to help with first-time sizing. Check it out before your next order — it should help!", tone: "professional" },
    { id: 4, stars: 4, reviewText: "High-quality product at a fair price. The website is easy to use and checkout was quick. Would love to see more color options in the future.", responseText: "Thank you for the kind review! We're always expanding our color range based on customer requests. We have several new colorways launching next month — stay tuned by following us on Instagram or signing up for our newsletter!", tone: "warm" },
    { id: 5, stars: 3, reviewText: "Product is decent but doesn't look quite like the photos on the website. The color was slightly different and the material felt thinner than expected.", responseText: "Thank you for this honest feedback. Product accuracy is very important to us. We've updated our product photography to better reflect true colors and added detailed material specifications to each listing. We'd love to send you a return label if you'd like to exchange — email us at help@brand.com.", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Order took 3 weeks to arrive even though I paid for express shipping. Tracking showed it sitting in one location for 10 days. No proactive communication from the brand.", responseText: "We're sincerely sorry about the shipping delay — especially since you paid for express. We've switched to a more reliable carrier for express orders and now send proactive tracking updates. We're processing a full refund of your express shipping fee, and we'd like to offer a discount on your next order. Please email us at support@brand.com.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Received a completely wrong item. Contacted support and they took a week to respond, then sent me a return label for the wrong address. Had to resolve everything myself. Awful.", responseText: "We're deeply sorry for this frustrating experience from start to finish. Receiving the wrong item, slow support, and an incorrect return label is a cascade of failures that we own completely. We've overhauled our fulfillment quality checks and support response protocols. We'd like to make this right immediately — please email our head of customer experience at cx@brand.com for a full refund and replacement.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "The product quality is good but the packaging was excessive — way too much plastic. For a brand that markets as sustainable, this was disappointing.", responseText: "Thank you for holding us accountable. You're right — excessive packaging contradicts our sustainability values. We've been transitioning to recycled and minimal packaging, and your feedback accelerates that timeline. We're committed to being genuinely sustainable, not just in marketing. Thank you for the push.", tone: "professional" },
  ],
  education: [
    { id: 1, stars: 5, reviewText: "This coding bootcamp changed my career. The instructors were brilliant, the curriculum was up-to-date, and I landed a developer job within 2 months of graduating.", responseText: "Congratulations on your new developer role — that's incredible! Your hard work made it happen, and we're proud to have been part of the journey. Our instructors are passionate about preparing students for real-world careers. Thank you for sharing your success story!", tone: "enthusiastic" },
    { id: 2, stars: 5, reviewText: "My kids love this tutoring center. Their math grades have improved dramatically, and they actually look forward to their sessions. The tutors are patient and engaging.", responseText: "This is exactly what we aim for — improved grades AND enthusiasm for learning! Thank you for trusting us with your children's education. Our tutors will be so happy to hear this. We look forward to continuing to support their growth!", tone: "warm" },
    { id: 3, stars: 4, reviewText: "Great online course with practical content. The instructor explains concepts clearly with real-world examples. Would love more hands-on exercises and projects.", responseText: "Thank you for the thoughtful feedback! We're glad the real-world examples resonate. We've just added a new project-based module based on student requests like yours. We're constantly updating the curriculum to balance theory with hands-on practice. Hope you enjoy the new additions!", tone: "professional" },
    { id: 4, stars: 4, reviewText: "Very organized school with excellent teachers. Communication with parents is good. The only thing lacking is after-school activity options.", responseText: "Thank you for the kind words about our teachers and organization! We've heard the request for more after-school activities and are expanding our program next semester with STEM, arts, and sports options. We appreciate your input in helping us grow!", tone: "warm" },
    { id: 5, stars: 3, reviewText: "The course content is good but the platform is clunky and hard to navigate. Had trouble finding assignments and the video player would buffer constantly.", responseText: "Thank you for this feedback — we know a frustrating platform can undermine great content. We're migrating to a new learning platform with improved navigation, faster video streaming, and a cleaner interface. The update rolls out next month. We appreciate your patience and hope you'll notice the difference.", tone: "professional" },
    { id: 6, stars: 2, reviewText: "Enrolled in the premium course expecting personalized feedback but only received generic automated responses. Felt like a cash grab. The content itself was okay.", responseText: "We're sorry the premium experience fell short of your expectations. Personalized feedback is exactly what premium should mean, and we failed to deliver. We've hired additional instructors to ensure every premium student receives genuine, individualized feedback. We'd like to offer you a complimentary month of premium access — please email premium@school.com.", tone: "empathetic" },
    { id: 7, stars: 1, reviewText: "Complete scam. The 'job placement guarantee' is a lie. After completing the program, the career support was one generic email with job board links. I could have found that on Google.", responseText: "We take your frustration seriously and apologize for the gap between our promise and your experience. We've restructured our career services team to provide 1-on-1 job coaching, resume reviews, and direct employer introductions — not just job board links. We'd like to connect you with our new career director personally. Please email careers@school.com.", tone: "empathetic" },
    { id: 8, stars: 3, reviewText: "Decent tutoring service but scheduling is inflexible. Hard to book sessions outside of standard hours. Quality of tutoring was good when we could get a session.", responseText: "Thank you for the positive note about tutoring quality! We hear you on scheduling and have extended our availability to include evenings and weekends, plus added an online booking system for real-time availability. We hope the new options make it easier to find times that work for your family.", tone: "professional" },
  ],
};

// ——— Helper functions ———

export function getIndustryBySlug(
  slug: string
): IndustryResponseConfig | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getResponsesForIndustry(slug: string): IndustryReviewResponse[] {
  return responsesByIndustry[slug] ?? [];
}

export function getRelatedIndustries(
  slugs: string[]
): IndustryResponseConfig[] {
  return slugs
    .map((slug) => industries.find((i) => i.slug === slug))
    .filter((i): i is IndustryResponseConfig => i !== undefined);
}
