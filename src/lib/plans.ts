// ─── Plan Types ──────────────────────────────────────────────────────────────

export type Plan = "free" | "starter" | "pro" | "business";

export interface PlanLimits {
  reviews: number;
  carouselsPerMonth: number | null; // null = unlimited
  impressionsPerMonth: number | null;
  showWatermark: boolean;
  aiHooks: number | null;
  forms: number | null;
  brandKits: number | null;
  hasAnalytics: false | "basic" | "full";
  hasSeo: false | "basic" | "full";
  hasAmazonEtsyImport: boolean;
  hasMultiLocation: boolean;
  hasWhiteLabel: boolean;
  hasApi: boolean;
  hasPrioritySupport: boolean;
  hasPdfDownload: boolean;
  hasAbTesting: boolean;
  hasHookAnalytics: boolean;
}

// ─── Plan Limits ─────────────────────────────────────────────────────────────

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    reviews: 5,
    carouselsPerMonth: 3,
    impressionsPerMonth: 500,
    showWatermark: true,
    aiHooks: 1,
    forms: 1,
    brandKits: 1,
    hasAnalytics: false,
    hasSeo: false,
    hasAmazonEtsyImport: false,
    hasMultiLocation: false,
    hasWhiteLabel: false,
    hasApi: false,
    hasPrioritySupport: false,
    hasPdfDownload: false,
    hasAbTesting: false,
    hasHookAnalytics: false,
  },
  starter: {
    reviews: 25,
    carouselsPerMonth: 10,
    impressionsPerMonth: 2000,
    showWatermark: false,
    aiHooks: 1,
    forms: 3,
    brandKits: 1,
    hasAnalytics: "basic",
    hasSeo: "basic",
    hasAmazonEtsyImport: false,
    hasMultiLocation: false,
    hasWhiteLabel: false,
    hasApi: false,
    hasPrioritySupport: false,
    hasPdfDownload: false,
    hasAbTesting: false,
    hasHookAnalytics: false,
  },
  pro: {
    reviews: 100,
    carouselsPerMonth: null,
    impressionsPerMonth: null,
    showWatermark: false,
    aiHooks: 3,
    forms: null,
    brandKits: 3,
    hasAnalytics: "full",
    hasSeo: "full",
    hasAmazonEtsyImport: true,
    hasMultiLocation: false,
    hasWhiteLabel: false,
    hasApi: false,
    hasPrioritySupport: true,
    hasPdfDownload: true,
    hasAbTesting: true,
    hasHookAnalytics: true,
  },
  business: {
    reviews: 1000,
    carouselsPerMonth: null,
    impressionsPerMonth: null,
    showWatermark: false,
    aiHooks: null,
    forms: null,
    brandKits: null,
    hasAnalytics: "full",
    hasSeo: "full",
    hasAmazonEtsyImport: true,
    hasMultiLocation: true,
    hasWhiteLabel: true,
    hasApi: true,
    hasPrioritySupport: true,
    hasPdfDownload: true,
    hasAbTesting: true,
    hasHookAnalytics: true,
  },
};

// ─── Pricing ─────────────────────────────────────────────────────────────────

export const PLAN_PRICING = {
  starter: { monthly: 9, annual: 7, annualTotal: 84 },
  pro: { monthly: 19, annual: 15, annualTotal: 180 },
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getPlanLimits(plan: Plan): PlanLimits {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
}

export function isPaidPlan(plan: Plan): boolean {
  return plan !== "free";
}

export function getPlanLabel(plan: Plan): string {
  const labels: Record<Plan, string> = {
    free: "Free",
    starter: "Starter",
    pro: "Pro",
    business: "Business",
  };
  return labels[plan] ?? "Free";
}

export function isTrialActive(trialEndsAt: string | null): boolean {
  if (!trialEndsAt) return false;
  return new Date(trialEndsAt) > new Date();
}

/**
 * During active trial, free users get Starter-level access.
 * After trial expires, they drop back to free limits.
 */
export function getEffectivePlan(plan: Plan, trialEndsAt: string | null): Plan {
  if (plan === "free" && isTrialActive(trialEndsAt)) {
    return "starter";
  }
  return plan;
}

// ─── Dodo Product ID → Plan Mapping ─────────────────────────────────────────

const PRODUCT_ID_MAP: Record<string, Plan> = {};

function initProductMap() {
  const mappings: [string | undefined, Plan][] = [
    [process.env.DODO_STARTER_MONTHLY_ID, "starter"],
    [process.env.DODO_STARTER_ANNUAL_ID, "starter"],
    [process.env.DODO_PRO_MONTHLY_ID, "pro"],
    [process.env.DODO_PRO_ANNUAL_ID, "pro"],
    // Backward compat: grandfathered LTD + old business subscribers
    [process.env.DODO_BUSINESS_MONTHLY_ID, "business"],
    [process.env.DODO_BUSINESS_ANNUAL_ID, "business"],
    [process.env.DODO_LTD_PRODUCT_ID, "business"],
  ];
  for (const [id, plan] of mappings) {
    if (id) PRODUCT_ID_MAP[id] = plan;
  }
}

export function getPlanFromProductId(productId: string): Plan | null {
  if (Object.keys(PRODUCT_ID_MAP).length === 0) initProductMap();
  return PRODUCT_ID_MAP[productId] ?? null;
}
