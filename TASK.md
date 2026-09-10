# Lancemates — Frontend Take-Home Assignment

**Landing Page + Signup Flow**

Thanks for applying! This assignment mirrors the kind of work you'll do on the **Lancemates** product — a local gig marketplace where people post tasks, find help, and offer services in their community. We're keeping it small: two screens, no backend, roughly **6–8 hours** of work. Do your best, we're looking for clean, thoughtful code over completeness.

---

## Getting Started

1. Install dependencies: `npm install`
2. Run it: `npm run web` (that's all you need — no Android/iOS SDK setup required)
3. Verify the template runs: you should see the default Expo screen

**Environment:** Node 18+ and npm are the only tools you need.

## How to submit

- **One week** from today.
- Open a **Pull Request** against this repo, **or** if we gave you this as a zip, push it to a public repo and send us the link (include a `NOTES.md` describing your choices).
- In your submission, briefly answer: what you built, one thing you're proud of, and one thing you'd do differently.

---

## What to Build

Two screens in this single Expo (React Native, TypeScript) app:

### 1. Landing Page (marketing)

The public-facing page for a local gig marketplace called **Lancemates**.

- **Responsive nav bar** — logo/brand name on the left, "Log In" and "Get Started" buttons on the right. On narrow screens, collapse buttons to something sensible.
- **Hero section** — a headline ("Find help or lend a hand" style), a short subtitle, and two call-to-action buttons ("Get Started Free" + "Log In"). Add a row of trust stats (e.g., active users, tasks posted, satisfaction rate). Subtle entrance animations are a nice-to-have, not required.
- **Features section** — a grid of 6 feature cards (icon + title + short blurb). Ideas: Find Local Gigs, Post Tasks Instantly, Real-Time Chat, Secure Payments, Quick Matching, Community Driven — or make up your own.
- **"How it works" section** — 3 steps (e.g., Create an Account → Post or Browse → Connect & Complete).
- **Final call-to-action** — a highlighted box with "Ready to get started?" + a signup button.
- **Footer** — brand, copyright, and a few dummy links.

**Design freedom:** you own the visual design. We judge taste and polish, not pixel-perfection against a reference.

### 2. Signup Flow (multi-step form, 3 steps)

A `Sign up` experience the user reaches from the landing page. It must be a **multi-step flow with a progress indicator**. No real backend — simulate the final submit with a fake delay.

**Step 1 — Account:**
- Email, password, and confirm password fields
- Email must be a valid format
- Password must meet strength rules (min 8 chars, one uppercase, one lowercase, one number, one special character)
- Show/hide password toggles
- Inline error messages under each field; block advancing until valid

**Step 2 — Profile:**
- First and last name
- "I'm looking to" role selection as selectable cards: **Post tasks** (seeking help), **Offer services**, or **Both**
- Skills/categories as tappable chips (make up a reasonable list, allow toggling multiple on/off)

**Step 3 — Submit:**
- Show a summary of what was entered (email, name, role, skills)
- "Create Account" button with a **loading state** (simulate ~1.5s round trip)
- On success, show a confirmation screen with a "Get Started" button (doesn't need to navigate anywhere real)

**Flow requirements:**
- Progress indicator (step 1 of 3, etc.), Back + Continue buttons
- Form state must be **preserved** when going back and forward between steps
- Can't leave a step with invalid input on that step
- Handle the "email already taken" case gracefully (a mock error from your fake API)

---

## Code Style Expectations

This is how we write production React at Lancemates — follow it:

- **TypeScript strict** (`tsconfig.json` already has it on). No `any`.
- Use `interface` for object shapes (we use an `I` prefix, e.g., `IUser`).
- Function components + hooks only.
- All styling via `StyleSheet.create()` — no random inline colors.
- Use `useColors()`-style **theme-aware colors** (keep the palette in a `constants/colors.ts`). Example:

```ts
const Colors = {
  light: { background: "#FAF9F6", text: "#151718", tint: "#002c37" },
  dark: { background: "#0a0a0a", text: "#F0F0F0", tint: "#14b8a6" },
};
```

- The app must support **light and dark mode** with a toggle (persist the choice with `AsyncStorage` or `localStorage` on web).
- Work in small, sensible commits (`feat:`, `fix:`, `refactor:`).

---

## Acceptance Criteria & Scoring

| Area | Weight | Look for |
| --- | --- | --- |
| Completeness | 35% | Both screens work on `npm run web`; landing links to signup; flow completes to success |
| Design & polish | 25% | Responsive at mobile + desktop, clean spacing/typography, light/dark mode |
| Logic | 25% | Validation, multi-step state handling, loading + error states |
| React + TS quality | 10% | Decomposition into components, typed props/state, no `any` |
| Cleanliness | 5% | Organized files/folders, readable code, sensible commits |

**Bonus (optional):** a small unit test (e.g., with Jest) for the validation logic or a component render.

---

## What We'll Ask in the Follow-Up

Be ready to talk through your code — we care about *why* you made the choices, not just that it works:

1. Why a multi-step form vs. a single long form? What are the tradeoffs?
2. If a user refreshed the browser mid-way through signup, how would you preserve their draft?
3. How would this code change if the signup hit a real backend — error states, retries, token handling?
4. How would you scale the theme system to a whole app?
5. What would you improve, given another week?

Good luck! We're excited to see what you build.