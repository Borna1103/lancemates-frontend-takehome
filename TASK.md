# Lancemates — Frontend Take-Home Assignment

**Landing Page + Login + Sign-Up**

Thanks for applying! This assignment mirrors the kind of work you'll do on the **Lancemates** product — a local gig marketplace where people post tasks, find help, and offer services in their community. We've scaffolded a skeleton (three screens + a fake auth API); you own the design and polish. Roughly **6–8 hours** of work. Do your best, we're looking for clean, thoughtful code over completeness.

---

## Getting Started

1. Install dependencies: `npm install`
2. Run it: `npm run web` (that's all you need — no Android/iOS SDK setup required)
3. Verify the app boots: you should see the landing page skeleton with Log In / Get Started buttons

**Environment:** Node 18+ and npm are the only tools you need.

### Provided skeleton

We've started the project so you focus on the fun part. These files exist; build **on top of them** (own the design, keep the plumbing):

- `src/constants/colors.ts` — light/dark palette
- `src/contexts/ThemeContext.tsx` + `src/hooks/useColors.ts` — theme-aware colors (`const colors = useColors();`)
- `src/api/authApi.ts` — **fake** `login()` / `signUp()` endpoints (in-memory DB, simulated delay, throws on bad credentials / duplicate email)
- `src/screens/LandingScreen.tsx` — landing page skeleton with placeholder sections
- `src/screens/LoginScreen.tsx` — log in form, already wired to `login()`
- `src/screens/SignUpScreen.tsx` — sign-up form, already wired to `signUp()`
- `App.tsx` — minimal screen switcher (landing → login → sign-up) + theme provider

## How to submit

- **One week** from today.
- Open a **Pull Request** against this repo, **or** if we gave you this as a zip, push it to a public repo and send us the link (include a `NOTES.md` describing your choices).
- In your submission, briefly answer: what you built, one thing you're proud of, and one thing you'd do differently.

---

## What to Build

Three screens in this single Expo (React Native, TypeScript) app:

### 1. Landing Page (marketing)

The public-facing page for a local gig marketplace called **Lancemates**.

- **Responsive nav bar** — logo/brand name on the left, "Log In" and "Get Started" buttons on the right. On narrow screens, collapse buttons to something sensible.
- **Hero section** — a headline ("Find help or lend a hand" style), a short subtitle, and two call-to-action buttons ("Get Started Free" + "Log In"). Add a row of trust stats (e.g., active users, tasks posted, satisfaction rate). Subtle entrance animations are a nice-to-have, not required.
- **Features section** — a grid of 6 feature cards (icon + title + short blurb). Ideas: Find Local Gigs, Post Tasks Instantly, Real-Time Chat, Secure Payments, Quick Matching, Community Driven — or make up your own.
- **"How it works" section** — 3 steps (e.g., Create an Account → Post or Browse → Connect & Complete).
- **Final call-to-action** — a highlighted box with "Ready to get started?" + a signup button.
- **Footer** — brand, copyright, and a few dummy links.

**Design freedom:** you own the visual design. We judge taste and polish, not pixel-perfection against a reference.

### 2. Log In

Reached from the landing page ("Log In" button). A simple single screen:

- Email + password fields with show/hide password
- Inline validation: valid email format, password required
- Calls the fake `login()` endpoint with a **loading state**; surface auth errors (wrong credentials) inline
- Links to the sign-up form
- On success, the app switches to a simple "You're signed in" placeholder (logging out returns to the landing page)

### 3. Sign Up (single form)

Reached from the landing page ("Get Started"). **No multi-step flow** — one clean form:

- **Name** (required)
- **Email** (required, must be a valid format)
- **Password** (required, meet strength rules: min 8 chars, one uppercase, one lowercase, one number, one special character)
- **About you / description** (optional, multiline)
- Show/hide password toggle, inline error messages per field
- Calls the fake `signUp()` endpoint with a **loading state**; handle the "email already taken" error inline
- On success, the app switches to the signed-in placeholder

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
| Completeness | 35% | All three screens work on `npm run web`; landing links to login + signup; both auth flows complete to the signed-in state |
| Design & polish | 25% | Responsive at mobile + desktop, clean spacing/typography, light/dark mode |
| Logic | 25% | Form validation, loading + error states, correct async handling of the fake API |
| React + TS quality | 10% | Decomposition into components, typed props/state, no `any` |
| Cleanliness | 5% | Organized files/folders, readable code, sensible commits |

**Bonus (optional):** a small unit test (e.g., with Jest) for the validation logic or a component render.

---

## What We'll Ask in the Follow-Up

Be ready to talk through your code — we care about *why* you made the choices, not just that it works:

1. How does the fake `authApi` differ from a real backend — what would you change when a real API lands?
2. How would you keep the user signed in across a page refresh? (Think token/session storage.)
3. How would you handle retries, timeouts, or network failures on these calls today?
4. How would you scale the theme system to a whole app?
5. What would you improve, given another week?

Good luck! We're excited to see what you build.