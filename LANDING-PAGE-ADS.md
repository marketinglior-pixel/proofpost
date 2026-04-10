# ProofPost — Dedicated Ad Landing Page Copy

**Purpose:** Focused landing page for Facebook/LinkedIn ad traffic
**URL suggestion:** proofpost.com/go or proofpost.com/try
**Design:** Single page, no navigation menu, one CTA repeated 2-3 times
**Voice:** C-core/voice-dna.md (direct, confident, fast-paced)

---

## Page Structure (top to bottom)

---

### 1. HERO SECTION

**Headline:**
Your reviews already wrote your best sales copy.
We just make people actually see it.

**Subheadline:**
Paste any review link. AI finds the sentence that converts. You get an animated widget — embedded in 60 seconds. No developer. No design tickets.

**CTA Button:** Try It Free — Paste Your First Review
**Below CTA:** No credit card required · Setup in 60 seconds · Cancel anytime

**Visual:** GIF/video showing the 3-step flow:
1. Paste review URL
2. AI highlights the "money line"
3. Animated widget appears

---

### 2. THE PROBLEM (3 cards)

**Section title:** Sound familiar?

**Card 1:**
"We have 200 five-star reviews"
...and a landing page that says "Trusted by 500+ companies."
Your best social proof is invisible.

**Card 2:**
"Can you make a testimonial section?"
Dev says: "Add it to the backlog."
It's been there since Q2.

**Card 3:**
"I'll just screenshot the review"
Crop it. Paste it. Realize it looks terrible.
Google the same thing you Googled last time.

---

### 3. THE SOLUTION (How It Works)

**Section title:** 60 seconds. Three steps. Done.

**Step 1: Paste**
Drop any review URL — G2, Capterra, Google, Trustpilot.
Or paste the text directly.

**Step 2: AI extracts**
Our AI reads the full review and pulls the one sentence that makes people buy.
Not the whole paragraph. The money line.

**Step 3: Embed**
Copy one line of code. Paste it anywhere.
Animated carousel, live on your site.

**CTA Button:** Try It Free — No Developer Needed

---

### 4. PROOF SECTION

**Section title:** The numbers

**Stat 1:** 3x more attention
Animated widgets vs. static text blocks.

**Stat 2:** 60 seconds
From review to live widget. Average setup time.

**Stat 3:** 0 developers needed
One line of embed code. That's it.

**Optional (if you have them):**
- "22% conversion increase on pricing pages"
- Customer logos / count
- One real testimonial from a user

---

### 5. BEFORE / AFTER

**Layout:** Split screen or side-by-side

**Before (left side — gray/faded):**
- Static screenshot of a review
- Generic "Trusted by 500+ companies" badge
- Text: "What your visitors see now"

**After (right side — vibrant/animated):**
- ProofPost animated widget (carousel/marquee)
- Specific review quote with name + photo
- Text: "What they could see instead"

---

### 6. OBJECTION HANDLING

**Section title:** Quick answers

**"Is it hard to set up?"**
One line of code. If you can paste into your website builder, you can use ProofPost. Works with Webflow, WordPress, Shopify, Framer, React, and anything that takes HTML.

**"What if I don't have reviews on G2?"**
Paste from Google, Capterra, Trustpilot — or type the review text directly. Any review works.

**"Why not just screenshot my reviews?"**
You can. But screenshots don't animate, don't auto-rotate, and look like you spent 30 seconds on them. Because you did.

**"What does it cost?"**
$19/mo for unlimited widgets. That's less than one hour of a designer's time.

---

### 7. PRICING (Simple)

**Layout:** Single card, not comparison table

**ProofPost Pro — $19/month**
- Unlimited review widgets
- AI hook extraction
- Animated carousels & marquees
- One-line embed code
- Works with any website
- Cancel anytime

**CTA Button:** Start Free Trial
**Below CTA:** No credit card required

---

### 8. FINAL CTA (Garbage Collector)

**Headline:**
Your best customers already wrote your best copy.
Stop letting it sit on G2.

**CTA Button:** Paste Your First Review — It's Free

---

## Design Notes

### What this page does NOT have:
- ❌ Navigation menu (no escape routes)
- ❌ Footer with 20 links (minimal footer only)
- ❌ Multiple CTAs competing (same CTA repeated, not different ones)
- ❌ Feature grid with 12 items (save that for the homepage)
- ❌ Impact calculator (too complex for a landing page from ads)

### What this page MUST have:
- ✅ One clear action: start free trial / paste first review
- ✅ Message match with the ad that brought them here
- ✅ Social proof (even minimal — numbers, one quote)
- ✅ Mobile-optimized (most Facebook traffic is mobile)
- ✅ Fast load time (< 3 seconds)
- ✅ Facebook Pixel firing on page load + signup button click

### Message match by ad variation:
| Ad Variation | Hero should emphasize |
|---|---|
| A: "Screenshot Problem" | "Stop screenshotting" → show the better way |
| B: "Conversion Gap" | "200 reviews but generic badge" → close the gap |
| C: "Before/After" | "From 20 hours to 60 seconds" → speed |

If only building ONE landing page — use the current hero copy above. It works with all 3 variations because it addresses the core promise (reviews → animated widgets → 60 seconds).

---

## Implementation Options

### Option A: New route in existing Next.js app
- Add `/src/app/(marketing)/go/page.tsx`
- Reuse existing components: `HeroUrlInput`, `PricingSection`, `StickyMobileCTA`
- Strip navigation, simplify layout
- **Fastest to build**

### Option B: Standalone page (Webflow/Framer)
- Build outside the app for faster iteration
- A/B test variations without deploys
- **Faster to iterate, but separate from codebase**

### Recommendation: Option A
You already have the components. Reusing `HeroUrlInput` (the paste-a-review input) as the primary CTA is powerful — visitors can try the product right from the landing page.

---

*Generated: 2026-03-28 | Based on: AD-VARIATIONS-FACEBOOK.md, C-core/voice-dna.md, C-core/icp-profile.md*
*Existing homepage reference: proofpost/src/app/(marketing)/page.tsx*
