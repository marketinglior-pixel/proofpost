export interface NpsCompany {
  name: string;
  nps: number;
}

export interface NpsIndustryConfig {
  slug: string;
  name: string;
  averageNps: number;
  topQuartileNps: number;
  bottomQuartileNps: number;
  description: string;
  topCompanies: NpsCompany[];
  keyInsights: string[];
  relatedIndustries: string[];
  faq: { question: string; answer: string }[];
}

export const npsIndustries: NpsIndustryConfig[] = [
  {
    slug: "saas",
    name: "SaaS",
    averageNps: 41,
    topQuartileNps: 68,
    bottomQuartileNps: 12,
    description:
      "SaaS companies benefit from recurring relationships that allow them to continuously improve based on customer feedback. The best SaaS products achieve high NPS by focusing on seamless onboarding, reliable uptime, and responsive support.",
    topCompanies: [
      { name: "Notion", nps: 72 },
      { name: "Slack", nps: 68 },
      { name: "Zoom", nps: 65 },
      { name: "HubSpot", nps: 55 },
      { name: "Salesforce", nps: 50 },
    ],
    keyInsights: [
      "SaaS companies with NPS above 50 tend to have annual churn rates below 5%, showing a direct link between customer loyalty and retention.",
      "Product-led growth SaaS companies score 15-20 points higher on average than sales-led companies, driven by self-serve onboarding and faster time-to-value.",
      "B2B SaaS typically scores higher than B2C SaaS due to deeper customer relationships and dedicated account management.",
    ],
    relatedIndustries: ["technology", "consulting", "ecommerce", "education"],
    faq: [
      {
        question: "What is a good NPS score for SaaS companies?",
        answer:
          "A good NPS score for SaaS companies is anything above 40, which places you above the industry average. Scores above 50 are considered excellent, and scores above 70 are world-class. Top SaaS companies like Notion and Slack consistently score in the 65-75 range.",
      },
      {
        question: "How often should SaaS companies measure NPS?",
        answer:
          "Most SaaS companies measure NPS quarterly to track trends without survey fatigue. Transactional NPS (sent after key interactions like onboarding or support tickets) can be measured continuously. The key is consistency in timing and methodology.",
      },
      {
        question: "How does NPS relate to SaaS churn?",
        answer:
          "There is a strong inverse correlation between NPS and churn. Promoters (9-10 scores) are 5x less likely to churn than Detractors (0-6 scores). Companies with NPS above 50 typically see annual churn rates of 3-5%, while those below 20 often face 10-15% churn.",
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    averageNps: 45,
    topQuartileNps: 72,
    bottomQuartileNps: 18,
    description:
      "E-commerce NPS is heavily influenced by the end-to-end shopping experience, from product discovery and checkout to shipping speed and return ease. Top performers invest in fast delivery, hassle-free returns, and personalized recommendations.",
    topCompanies: [
      { name: "Amazon", nps: 73 },
      { name: "Costco", nps: 71 },
      { name: "Chewy", nps: 68 },
      { name: "Etsy", nps: 56 },
      { name: "Shopify Stores (avg)", nps: 48 },
    ],
    keyInsights: [
      "Delivery speed is the single biggest NPS driver in e-commerce. Companies offering same-day or next-day delivery score 20+ points higher than those with standard shipping.",
      "Easy returns policies boost NPS by 15-25 points. Customers who experience a smooth return are actually more likely to become promoters than those who never returned anything.",
      "Personalized product recommendations increase NPS by 10-15 points, as customers feel understood and discover relevant products faster.",
    ],
    relatedIndustries: ["retail", "technology", "logistics", "saas"],
    faq: [
      {
        question: "What is a good NPS for an online store?",
        answer:
          "A good NPS for an online store is above 45. The e-commerce industry average sits around 45, so anything above 50 puts you ahead of most competitors. Leading e-commerce brands like Amazon and Costco score in the 70+ range.",
      },
      {
        question: "What drives NPS in e-commerce?",
        answer:
          "The top NPS drivers in e-commerce are shipping speed and reliability, product quality matching expectations, ease of returns, customer service responsiveness, and website/app user experience. Price alone is not a major NPS driver.",
      },
      {
        question: "How can e-commerce brands improve their NPS?",
        answer:
          "Focus on reducing delivery times, simplifying the return process, personalizing the shopping experience, proactively communicating about order status, and quickly resolving issues. Following up after purchases with satisfaction checks also helps identify and recover detractors.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    averageNps: 38,
    topQuartileNps: 62,
    bottomQuartileNps: 8,
    description:
      "Healthcare NPS reflects patient satisfaction with care quality, wait times, communication, and outcomes. The industry faces unique challenges including insurance complexity and high emotional stakes, but top providers differentiate through patient-centered care.",
    topCompanies: [
      { name: "Kaiser Permanente", nps: 60 },
      { name: "Mayo Clinic", nps: 58 },
      { name: "Cleveland Clinic", nps: 55 },
      { name: "One Medical", nps: 52 },
    ],
    keyInsights: [
      "Patient wait times are the strongest predictor of healthcare NPS. Practices that keep wait times under 15 minutes score 30+ points higher than those with 45+ minute waits.",
      "Telehealth adoption has boosted NPS for healthcare providers by 12-18 points on average, as patients value the convenience and accessibility.",
      "Clear, empathetic communication from providers is the second-largest NPS driver, even more impactful than treatment outcomes in many cases.",
    ],
    relatedIndustries: ["insurance", "technology", "consulting", "education"],
    faq: [
      {
        question: "What is a good NPS score for healthcare?",
        answer:
          "A good NPS score for healthcare is above 38, which is the industry average. Scores above 50 are considered excellent for healthcare. Top institutions like Mayo Clinic and Cleveland Clinic score in the 55-60 range. Primary care tends to score higher than specialty care.",
      },
      {
        question: "Why is healthcare NPS lower than other industries?",
        answer:
          "Healthcare NPS tends to be lower because patients often associate the experience with stress, pain, or anxiety regardless of care quality. Insurance complexity, billing issues, and long wait times also drag down scores even when clinical outcomes are positive.",
      },
      {
        question: "How can healthcare providers improve NPS?",
        answer:
          "Reduce wait times, improve appointment scheduling convenience, train staff in empathetic communication, simplify billing processes, offer telehealth options, and follow up after visits. Small touches like remembering patient preferences can significantly boost scores.",
      },
    ],
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    averageNps: 44,
    topQuartileNps: 71,
    bottomQuartileNps: 14,
    description:
      "Financial services NPS varies widely between digital-first fintech companies and traditional banks. Trust, transparency, and ease of use are the primary drivers. Fintech disruptors have raised the bar for customer experience across the industry.",
    topCompanies: [
      { name: "USAA", nps: 75 },
      { name: "Charles Schwab", nps: 66 },
      { name: "Fidelity", nps: 56 },
      { name: "PayPal", nps: 52 },
      { name: "Chase", nps: 44 },
    ],
    keyInsights: [
      "Digital-first financial services companies score 25-35 points higher than traditional banks, driven by superior mobile experiences and lower fees.",
      "Fee transparency is the largest NPS driver in financial services. Companies with clear, simple fee structures score 20+ points higher than those with complex pricing.",
      "Fraud protection and quick dispute resolution are critical NPS factors. Customers who experience fast fraud resolution often become stronger promoters than those who never had issues.",
    ],
    relatedIndustries: ["insurance", "real-estate", "consulting", "technology"],
    faq: [
      {
        question: "What is a good NPS for financial services?",
        answer:
          "A good NPS for financial services is above 44, the industry average. Scores above 55 are excellent. Credit unions and digital banks tend to score higher (50-70) than traditional large banks (30-45). USAA consistently leads the industry with scores above 70.",
      },
      {
        question: "Why do fintech companies have higher NPS than banks?",
        answer:
          "Fintech companies typically offer simpler fee structures, better mobile apps, faster onboarding, and more transparent pricing. They also tend to target younger, more tech-savvy customers who value convenience and digital experience over branch access.",
      },
      {
        question: "How can banks improve their NPS scores?",
        answer:
          "Invest in mobile banking experience, simplify fee structures, reduce friction in common transactions, empower frontline staff to resolve issues quickly, and personalize communications. Many banks have improved scores by 20+ points through digital transformation initiatives.",
      },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    averageNps: 35,
    topQuartileNps: 58,
    bottomQuartileNps: 5,
    description:
      "Insurance NPS is shaped by the claims experience, pricing transparency, and policy simplicity. The industry has historically scored lower due to the perceived adversarial nature of claims, but insurtech companies are changing expectations.",
    topCompanies: [
      { name: "USAA", nps: 73 },
      { name: "Lemonade", nps: 62 },
      { name: "State Farm", nps: 48 },
      { name: "Progressive", nps: 42 },
    ],
    keyInsights: [
      "The claims experience accounts for 60% of insurance NPS variance. Fast, fair claims processing can turn a negative event into a brand-building moment.",
      "Insurtech companies like Lemonade score 25-30 points above traditional insurers by using AI for instant claims and transparent pricing.",
      "Policyholders who never file a claim have an NPS 15 points lower than those who had a positive claims experience, highlighting the importance of proactive engagement.",
    ],
    relatedIndustries: [
      "financial-services",
      "healthcare",
      "automotive",
      "real-estate",
    ],
    faq: [
      {
        question: "What is a good NPS score for insurance companies?",
        answer:
          "A good NPS score for insurance companies is above 35, the industry average. Scores above 50 are excellent. USAA leads the industry at 73, while insurtech companies like Lemonade score around 62. Traditional insurers typically range from 20-45.",
      },
      {
        question: "Why is insurance NPS generally low?",
        answer:
          "Insurance NPS is lower because customers often feel they pay premiums for years without tangible benefit, and when they do file claims, the process can feel adversarial. Complex policy language, unexpected exclusions, and slow claims processing all contribute to lower scores.",
      },
      {
        question: "How can insurance companies boost their NPS?",
        answer:
          "Streamline claims processing, use plain language in policies, offer self-service options for common tasks, proactively communicate during claims, and invest in digital tools. Companies that resolve claims within 48 hours see NPS scores 30+ points higher than those with week-long processes.",
      },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    averageNps: 44,
    topQuartileNps: 69,
    bottomQuartileNps: 15,
    description:
      "Retail NPS reflects the in-store and omnichannel customer experience. Top retailers differentiate through knowledgeable staff, store ambiance, product curation, and seamless integration between online and physical shopping.",
    topCompanies: [
      { name: "Costco", nps: 74 },
      { name: "Trader Joe's", nps: 68 },
      { name: "Apple Store", nps: 65 },
      { name: "Nordstrom", nps: 58 },
      { name: "Target", nps: 50 },
    ],
    keyInsights: [
      "Retailers with strong omnichannel experiences (buy online, pick up in store) score 18-22 points higher than single-channel retailers.",
      "Staff friendliness and product knowledge are the top NPS drivers in physical retail, outweighing price competitiveness by 2:1.",
      "Loyalty programs that offer genuine value (not just discounts) boost NPS by 12-16 points. Costco's membership model is a prime example of loyalty driving advocacy.",
    ],
    relatedIndustries: ["ecommerce", "hospitality", "automotive", "logistics"],
    faq: [
      {
        question: "What is a good NPS for retail businesses?",
        answer:
          "A good NPS for retail is above 44, the industry average. Scores above 55 are strong, and above 65 is excellent. Costco and Trader Joe's lead the industry with scores in the high 60s to 70s. Discount retailers tend to score lower than specialty or premium retailers.",
      },
      {
        question: "What factors most influence retail NPS?",
        answer:
          "The top factors are staff helpfulness and friendliness, product quality and selection, store cleanliness and layout, checkout speed, and return policy ease. For omnichannel retailers, the consistency between online and in-store experiences is also critical.",
      },
      {
        question: "How can retail stores improve NPS?",
        answer:
          "Train staff to be product experts, reduce checkout friction, create a pleasant store environment, offer easy returns, and integrate online and offline experiences. Following up after purchases and acting on feedback signals that you value customer opinions.",
      },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    averageNps: 39,
    topQuartileNps: 64,
    bottomQuartileNps: 10,
    description:
      "Hospitality NPS captures the guest experience across hotels, resorts, and travel services. The industry is highly emotional, where memorable moments create promoters and service failures create vocal detractors.",
    topCompanies: [
      { name: "Ritz-Carlton", nps: 72 },
      { name: "Four Seasons", nps: 68 },
      { name: "Hilton", nps: 52 },
      { name: "Marriott", nps: 48 },
      { name: "Airbnb", nps: 43 },
    ],
    keyInsights: [
      "Personalized service is the strongest NPS driver in hospitality. Hotels that remember guest preferences and proactively address needs score 25-30 points higher.",
      "Problem recovery has an outsized impact: guests who experience a problem that is resolved exceptionally well score higher NPS than guests who had no problems at all.",
      "Loyalty program members score 18-22 points higher NPS than non-members, partly due to self-selection and partly due to better service tiers.",
    ],
    relatedIndustries: ["airlines", "retail", "real-estate", "ecommerce"],
    faq: [
      {
        question: "What is a good NPS for hotels and hospitality?",
        answer:
          "A good NPS for hospitality is above 39, the industry average. Luxury hotels typically score 60-75, while mid-range hotels average 35-50. Economy hotels and motels often score 15-30. Boutique hotels tend to outperform chains in their price segment.",
      },
      {
        question: "How do luxury hotels achieve high NPS?",
        answer:
          "Luxury hotels achieve high NPS through personalized service (remembering preferences, anticipating needs), empowered staff who can resolve issues on the spot, attention to detail in every touchpoint, and creating memorable moments that go beyond expectations.",
      },
      {
        question: "What is the best way to measure NPS in hospitality?",
        answer:
          "Send NPS surveys within 24-48 hours of checkout via email. Include a brief open-ended question to capture specific feedback. Measure both overall NPS and touchpoint-specific scores (check-in, room, dining, etc.) to identify improvement areas.",
      },
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    averageNps: 47,
    topQuartileNps: 72,
    bottomQuartileNps: 20,
    description:
      "Technology companies generally score well on NPS due to the value their products deliver. Consumer tech leads the way with strong brand loyalty, while enterprise tech depends on implementation success and ongoing support quality.",
    topCompanies: [
      { name: "Apple", nps: 72 },
      { name: "Microsoft", nps: 60 },
      { name: "Google", nps: 58 },
      { name: "Samsung", nps: 52 },
      { name: "Dell", nps: 44 },
    ],
    keyInsights: [
      "Consumer tech companies score 15-20 points higher than enterprise tech on average, driven by simpler products and more direct customer relationships.",
      "Product reliability and ecosystem integration are the top NPS drivers. Apple's high score is largely attributed to seamless device-to-device experiences.",
      "Customer support quality creates a 30-point NPS gap in enterprise tech: companies with dedicated support teams score significantly higher than those relying on self-service alone.",
    ],
    relatedIndustries: ["saas", "ecommerce", "telecom", "education"],
    faq: [
      {
        question: "What is a good NPS for tech companies?",
        answer:
          "A good NPS for technology companies is above 47, the industry average. Consumer tech leaders like Apple score in the 70s, while enterprise tech companies average 35-55. Hardware companies tend to score lower than software companies due to product defect risks.",
      },
      {
        question: "How does Apple maintain such a high NPS?",
        answer:
          "Apple's high NPS comes from seamless ecosystem integration, premium build quality, intuitive user interfaces, the Apple Store retail experience, and strong brand identity. Their focus on customer experience at every touchpoint creates emotional loyalty beyond product features.",
      },
      {
        question: "How can technology companies improve NPS?",
        answer:
          "Focus on product reliability, simplify onboarding and setup, invest in responsive customer support, build ecosystem value, and continuously iterate based on user feedback. For enterprise tech, ensuring successful implementation and providing dedicated account support are critical.",
      },
    ],
  },
  {
    slug: "education",
    name: "Education",
    averageNps: 37,
    topQuartileNps: 60,
    bottomQuartileNps: 8,
    description:
      "Education NPS spans traditional institutions, ed-tech platforms, and online learning providers. Student satisfaction is driven by learning outcomes, instructor quality, platform usability, and career impact.",
    topCompanies: [
      { name: "Coursera", nps: 62 },
      { name: "Duolingo", nps: 59 },
      { name: "Khan Academy", nps: 56 },
      { name: "Udemy", nps: 42 },
    ],
    keyInsights: [
      "Ed-tech platforms with gamification and progress tracking score 20-25 points higher than traditional online courses, as engagement drives satisfaction.",
      "Career outcomes are the ultimate NPS driver for professional education. Programs with strong job placement rates score 30+ points higher than those without career support.",
      "Free and freemium ed-tech platforms often score higher NPS than paid ones, as the absence of financial commitment removes a source of dissatisfaction.",
    ],
    relatedIndustries: ["technology", "consulting", "saas", "healthcare"],
    faq: [
      {
        question: "What is a good NPS for education companies?",
        answer:
          "A good NPS for education is above 37, the industry average. Ed-tech leaders like Coursera and Duolingo score 55-65. Traditional universities average 20-40 depending on program quality and student support. Bootcamps and professional training vary widely from 15 to 60.",
      },
      {
        question: "Why is NPS important for education companies?",
        answer:
          "NPS is crucial because education relies heavily on word-of-mouth. Students who are promoters refer friends, leave positive reviews, and become alumni ambassadors. For online learning platforms, high NPS also correlates with course completion rates and subscription renewals.",
      },
      {
        question: "How can education providers improve NPS?",
        answer:
          "Focus on learning outcomes and career impact, improve instructor quality and responsiveness, create engaging and interactive content, provide clear progress tracking, offer flexible scheduling, and build a supportive community around the learning experience.",
      },
    ],
  },
  {
    slug: "consulting",
    name: "Consulting",
    averageNps: 51,
    topQuartileNps: 74,
    bottomQuartileNps: 22,
    description:
      "Consulting firms benefit from deep client relationships that enable personalized service. The industry scores above average because successful engagements deliver measurable business impact. NPS varies significantly based on firm size and specialization.",
    topCompanies: [
      { name: "Bain & Company", nps: 78 },
      { name: "McKinsey & Company", nps: 62 },
      { name: "Deloitte", nps: 54 },
      { name: "Accenture", nps: 48 },
    ],
    keyInsights: [
      "Boutique consulting firms score 20-30 points higher than large firms on average, driven by more personalized attention and specialized expertise.",
      "The perceived impact of recommendations on business outcomes is the single strongest NPS predictor in consulting, outweighing relationship quality alone.",
      "Consulting firms that maintain relationships between engagements score 15-20 points higher than those with purely transactional interactions.",
    ],
    relatedIndustries: [
      "financial-services",
      "technology",
      "saas",
      "education",
    ],
    faq: [
      {
        question: "What is a good NPS for consulting firms?",
        answer:
          "A good NPS for consulting is above 51, the industry average. Consulting has one of the highest average NPS scores across industries. Top firms like Bain & Company score in the high 70s. Boutique firms often score 60-80 due to personalized service.",
      },
      {
        question: "Why does consulting have high NPS?",
        answer:
          "Consulting scores high because the business model is built on relationships. Clients choose consultants based on reputation and referrals, creating a self-selecting group of satisfied customers. Successful engagements deliver visible, measurable business value.",
      },
      {
        question: "When should consulting firms measure NPS?",
        answer:
          "Measure NPS at two points: mid-engagement (to course-correct if needed) and post-engagement (to capture overall satisfaction). Annual relationship NPS surveys for ongoing clients help track satisfaction trends and identify at-risk accounts.",
      },
    ],
  },
  {
    slug: "telecom",
    name: "Telecom",
    averageNps: 24,
    topQuartileNps: 48,
    bottomQuartileNps: -2,
    description:
      "Telecom consistently ranks among the lowest NPS industries due to contract complexity, billing confusion, service outages, and difficult cancellation processes. However, newer MVNOs and fiber providers are disrupting with simpler, more transparent offerings.",
    topCompanies: [
      { name: "T-Mobile", nps: 50 },
      { name: "Verizon", nps: 38 },
      { name: "AT&T", nps: 30 },
      { name: "Mint Mobile", nps: 55 },
    ],
    keyInsights: [
      "Network reliability is the top NPS driver, but billing clarity and contract transparency have become nearly as important, with 40% of detractors citing surprise charges.",
      "MVNOs (mobile virtual network operators) like Mint Mobile score 20-30 points higher than major carriers by offering simple, transparent pricing without contracts.",
      "Telecom companies that invest in digital self-service tools see NPS improvements of 10-15 points, as customers prefer managing accounts without calling support.",
    ],
    relatedIndustries: ["technology", "saas", "insurance", "airlines"],
    faq: [
      {
        question: "What is a good NPS for telecom companies?",
        answer:
          "A good NPS for telecom is above 24, the industry average, which is one of the lowest across all industries. Scores above 40 are considered strong for telecom. T-Mobile and Mint Mobile lead with scores of 50-55, while traditional carriers range from 25-40.",
      },
      {
        question: "Why is telecom NPS so low?",
        answer:
          "Telecom NPS is low due to long-term contracts, confusing billing with hidden fees, service outages, poor customer support experiences, and difficult cancellation processes. Many customers feel locked in rather than loyal, which drives detractor scores.",
      },
      {
        question: "How can telecom companies improve NPS?",
        answer:
          "Simplify pricing and eliminate hidden fees, improve network reliability, reduce hold times for support, offer easy digital self-service, and make it simple to change or cancel plans. T-Mobile's 'Un-carrier' strategy shows how transparency can dramatically improve scores.",
      },
    ],
  },
  {
    slug: "airlines",
    name: "Airlines",
    averageNps: 30,
    topQuartileNps: 55,
    bottomQuartileNps: 2,
    description:
      "Airline NPS varies dramatically between budget and premium carriers. The flying experience, including legroom, on-time performance, staff friendliness, and disruption handling, drives scores. Premium carriers differentiate through service quality rather than price.",
    topCompanies: [
      { name: "Southwest Airlines", nps: 60 },
      { name: "Delta Air Lines", nps: 52 },
      { name: "JetBlue", nps: 48 },
      { name: "United Airlines", nps: 35 },
      { name: "American Airlines", nps: 30 },
    ],
    keyInsights: [
      "On-time performance is the strongest NPS driver for airlines, with a 5% improvement in on-time arrivals correlating with a 3-4 point NPS increase.",
      "How airlines handle disruptions (cancellations, delays) matters more than avoiding them entirely. Proactive rebooking and transparent communication during disruptions can actually create promoters.",
      "Loyalty program elite members score 30-40 points higher NPS than general travelers, highlighting the value of recognition and perks in driving advocacy.",
    ],
    relatedIndustries: ["hospitality", "logistics", "retail", "telecom"],
    faq: [
      {
        question: "What is a good NPS score for airlines?",
        answer:
          "A good NPS for airlines is above 30, the industry average. Southwest Airlines leads US carriers at around 60, followed by Delta at 52. Budget airlines typically score 10-25, while full-service carriers range from 30-55. Premium international carriers can score 60-80.",
      },
      {
        question: "What matters most to airline passengers for NPS?",
        answer:
          "The top factors are on-time performance, how disruptions are handled, seat comfort and legroom, staff friendliness, and value for money. Wi-Fi availability and entertainment options are growing in importance, especially for business travelers.",
      },
      {
        question: "How can airlines improve their NPS?",
        answer:
          "Improve on-time performance, train staff in empathetic communication during disruptions, invest in comfortable seating, simplify fare structures, enhance loyalty program value, and proactively communicate during delays. Empowering gate agents to make real-time decisions significantly improves disruption handling.",
      },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    averageNps: 39,
    topQuartileNps: 64,
    bottomQuartileNps: 12,
    description:
      "Automotive NPS captures satisfaction with both the vehicle and the ownership experience, including dealership service, reliability, and resale value. Electric vehicle manufacturers are disrupting traditional NPS patterns with direct-to-consumer models.",
    topCompanies: [
      { name: "Tesla", nps: 96 },
      { name: "Toyota", nps: 58 },
      { name: "Honda", nps: 52 },
      { name: "BMW", nps: 46 },
      { name: "Ford", nps: 38 },
    ],
    keyInsights: [
      "Tesla's industry-leading NPS comes from its direct sales model, over-the-air updates, and the evangelical enthusiasm of early EV adopters, though scores have moderated as the customer base broadens.",
      "The dealership experience accounts for 40% of automotive NPS variance. Brands with the same vehicle quality but better dealership experiences score 15-20 points higher.",
      "Vehicle reliability within the first 3 years is the strongest long-term NPS predictor. Brands with fewer recalls and warranty claims maintain higher NPS over time.",
    ],
    relatedIndustries: ["insurance", "financial-services", "retail", "logistics"],
    faq: [
      {
        question: "What is a good NPS for automotive companies?",
        answer:
          "A good NPS for automotive is above 39, the industry average. Tesla leads with exceptionally high scores, though these are partly driven by brand enthusiasm. Traditional leaders like Toyota (58) and Honda (52) maintain strong scores through reliability. Luxury brands range widely from 40-65.",
      },
      {
        question: "Why does Tesla have such a high NPS?",
        answer:
          "Tesla's high NPS is driven by its direct-to-consumer sales model (avoiding dealership friction), continuous over-the-air vehicle improvements, strong brand mission alignment with sustainability, and the novelty factor of EV ownership. Early adopter enthusiasm also plays a role.",
      },
      {
        question: "How can car dealerships improve NPS?",
        answer:
          "Eliminate high-pressure sales tactics, be transparent about pricing, reduce wait times for service, provide loaner vehicles or rideshare credits during service, follow up after purchases and service visits, and train staff to be product experts rather than just salespeople.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    averageNps: 42,
    topQuartileNps: 68,
    bottomQuartileNps: 14,
    description:
      "Real estate NPS reflects the high-stakes, emotional nature of property transactions. Agent expertise, communication frequency, negotiation skill, and transaction smoothness are the primary drivers. Top agents build referral-based businesses through exceptional NPS.",
    topCompanies: [
      { name: "Keller Williams", nps: 56 },
      { name: "Redfin", nps: 54 },
      { name: "Compass", nps: 50 },
      { name: "RE/MAX", nps: 44 },
    ],
    keyInsights: [
      "Individual agent NPS varies by 50+ points within the same brokerage, showing that the agent-client relationship matters far more than brand in real estate.",
      "Communication frequency is the top NPS driver. Agents who provide weekly updates score 25-30 points higher than those who communicate only when necessary.",
      "Post-transaction follow-up generates 40% of referrals. Agents who maintain relationships after closing build significantly stronger referral businesses.",
    ],
    relatedIndustries: [
      "financial-services",
      "insurance",
      "consulting",
      "automotive",
    ],
    faq: [
      {
        question: "What is a good NPS for real estate agents?",
        answer:
          "A good NPS for real estate is above 42, the industry average. Individual top agents often score 70-90 through personalized service. Brokerages as a whole tend to average 40-60. Digital-first brokerages like Redfin score well due to technology-enabled transparency.",
      },
      {
        question: "How does NPS impact a real estate agent's business?",
        answer:
          "NPS directly drives referral business, which is the lifeblood of real estate. Agents with NPS above 70 report that 60-80% of their business comes from referrals, while agents below 30 rely almost entirely on paid leads. One promoter can generate 2-3 referrals over time.",
      },
      {
        question: "When should real estate agents measure NPS?",
        answer:
          "Measure NPS at three points: after showing homes (to gauge the search experience), at closing (to capture transaction satisfaction), and 30 days post-closing (to assess the overall experience). The 30-day post-closing survey provides the most actionable insights.",
      },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics",
    averageNps: 32,
    topQuartileNps: 55,
    bottomQuartileNps: 6,
    description:
      "Logistics and shipping NPS is driven by delivery reliability, tracking visibility, damage rates, and communication during exceptions. The industry has seen NPS improvements as real-time tracking and faster delivery have become standard expectations.",
    topCompanies: [
      { name: "FedEx", nps: 52 },
      { name: "UPS", nps: 48 },
      { name: "DHL", nps: 40 },
      { name: "USPS", nps: 28 },
    ],
    keyInsights: [
      "Real-time package tracking has become table stakes. Logistics companies without proactive tracking notifications score 20-25 points lower than those with robust tracking.",
      "Last-mile delivery experience accounts for 50% of logistics NPS. The final delivery interaction, including driver professionalism and package handling, disproportionately shapes perception.",
      "B2B logistics clients score NPS 15-20 points higher than B2C consumers for the same companies, as dedicated account management and SLAs provide more predictable service.",
    ],
    relatedIndustries: ["ecommerce", "retail", "automotive", "airlines"],
    faq: [
      {
        question: "What is a good NPS for logistics companies?",
        answer:
          "A good NPS for logistics is above 32, the industry average. FedEx leads at around 52, with UPS close behind at 48. B2B logistics providers tend to score higher than consumer shipping due to dedicated service. Same-day and express services generally score higher than economy options.",
      },
      {
        question: "What drives NPS in shipping and logistics?",
        answer:
          "The top drivers are on-time delivery reliability, real-time tracking accuracy, package condition on arrival, ease of exception handling (lost or damaged packages), and customer support responsiveness. For B2B, proactive communication about potential delays is also critical.",
      },
      {
        question: "How can logistics companies improve NPS?",
        answer:
          "Invest in last-mile delivery quality, provide proactive delay notifications, simplify claims processes for damaged packages, offer flexible delivery options (time windows, pickup points), and train delivery drivers in customer interaction. Real-time tracking with accurate ETAs is now a baseline expectation.",
      },
    ],
  },
];

export function getNpsIndustryBySlug(
  slug: string
): NpsIndustryConfig | undefined {
  return npsIndustries.find((i) => i.slug === slug);
}

export function getRelatedNpsIndustries(
  slugs: string[]
): NpsIndustryConfig[] {
  return slugs
    .map((slug) => npsIndustries.find((i) => i.slug === slug))
    .filter(Boolean) as NpsIndustryConfig[];
}

export function getAllNpsIndustrySlugs(): string[] {
  return npsIndustries.map((i) => i.slug);
}

// For the comparison bar chart — returns a subset of industries for visual comparison
export function getComparisonIndustries(
  currentSlug: string
): { name: string; slug: string; averageNps: number }[] {
  const others = npsIndustries
    .filter((i) => i.slug !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
  const current = npsIndustries.find((i) => i.slug === currentSlug);
  if (!current) return others.map((i) => ({ name: i.name, slug: i.slug, averageNps: i.averageNps }));
  const all = [...others, current].sort((a, b) => b.averageNps - a.averageNps);
  return all.map((i) => ({
    name: i.name,
    slug: i.slug,
    averageNps: i.averageNps,
  }));
}
