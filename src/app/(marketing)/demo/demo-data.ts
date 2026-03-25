export const demoData = {
  type: "widget" as const,
  id: "demo",
  reviews: [
    {
      id: "demo-1",
      hookLine:
        "We closed 23% more deals last quarter after switching.",
      quote:
        "We switched from HubSpot 6 months ago and it's been a game-changer. Our sales reps are actually logging calls now. We closed 23% more deals last quarter.",
      reviewer: {
        name: "Sarah Chen",
        title: "VP Sales",
        company: "TechFlow",
      },
      reviewerPhotoUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
    },
    {
      id: "demo-2",
      hookLine:
        "Pipeline accuracy went from 40% to 92% in two weeks.",
      quote:
        "I was skeptical at first, but within two weeks our pipeline accuracy went from 40% to 92%. The team finally trusts the data. That alone was worth switching.",
      reviewer: {
        name: "Marcus Johnson",
        title: "Head of Revenue",
        company: "Beacon AI",
      },
      reviewerPhotoUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    },
    {
      id: "demo-3",
      hookLine:
        "Onboarding took 2 days, not 2 months. Our AEs asked to use it more.",
      quote:
        "We tried 4 CRMs before this one. The onboarding took 2 days, not 2 months. Our AEs actually asked if they could use it more. Never happened before.",
      reviewer: {
        name: "Priya Patel",
        title: "CRO",
        company: "ScaleStack",
      },
      reviewerPhotoUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=face",
    },
    {
      id: "demo-4",
      hookLine:
        "Sales cycle dropped from 45 days to 28 days.",
      quote:
        "Reduced our sales cycle from 45 days to 28 days. Not because the tool is magic, but because reps stopped wasting time on data entry and started selling.",
      reviewer: {
        name: "Tom Andersson",
        title: "Sales Director",
        company: "NordCloud",
      },
      reviewerPhotoUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    },
    {
      id: "demo-5",
      hookLine:
        "Revenue up 31%. The answer was embarrassingly simple: we switched CRMs.",
      quote:
        "Our board asked what changed in Q3. The answer was embarrassingly simple: we switched CRMs and people actually used it. Revenue up 31%.",
      reviewer: {
        name: "Lisa Wang",
        title: "CEO",
        company: "Momentic",
      },
      reviewerPhotoUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    },
  ],
  brandKit: {
    companyName: "AcmeSaaS",
    logoUrl: null,
    primaryColor: "#7c3aed",
    secondaryColor: "#9333ea",
  },
  showWatermark: true,
};
