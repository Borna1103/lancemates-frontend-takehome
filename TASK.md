# Lancemates — Frontend Take-Home Assignment

**Landing Page + Login + Sign-Up**
This assignment mirrors the kind of work you'll do on the **Lancemates** product — a local gig marketplace where people post tasks, find help, and offer services in their community. Roughly **4–6 hours** of work. Do your best, we're looking for clean, thoughtful code and design over completeness.

---

## Getting Started

1. Install dependencies: `npm install`
2. Run it: `npm run web` (that's all you need — no Android/iOS SDK setup required)
3. Verify the app boots: you should see a blank page with LandingScreen text.

**Environment:** Node 18+ and npm are the only tools you need.

### Provided skeleton

We've started the project so you have a place to begin. These are **empty stubs** — the design, content, forms, and validation are all yours:

- `src/screens/LandingScreen.tsx` — empty landing page shell
- `src/screens/LoginScreen.tsx` — empty login screen shell
- `src/screens/SignUpScreen.tsx` — empty sign-up screen shell
- `App.tsx` — tiny screen switcher that connects the three screens

**No backend, no API layer, no pre-built design.** You're starting from a nearly blank slate — that's the point.

## How to submit

- **One week** from today.
- Open a **Pull Request** against this repo, **or** if we gave you this as a zip, push it to a public repo and send us the link (include a `NOTES.md` describing your choices).


---

## What to Build

Three screens in this single Expo (React Native, TypeScript) app:

### 1. Landing Page (marketing)

The public-facing page for a local gig marketplace called **Lancemates**.

- **Responsive nav bar** — logo/brand name on the left, Login and SignUp buttons on the right.
- **Hero section** — a headline ("Find help or lend a hand" style), a short subtitle, and two call-to-action buttons ("Get Started Free" + "Log In"). Add a row of trust stats (e.g., active users, tasks posted, satisfaction rate). Subtle entrance animations are a nice-to-have, not required.
- **"How it works" section** — 3 steps (e.g., Create an Account → Post or Browse → Connect & Complete).
- **Final call-to-action** — a highlighted box with "Ready to get started?" + a signup button.
- **Footer** — brand, copyright, and a few dummy links.

**Design freedom:** make all the changes you want, this assignments purpose is creativity. Add anything else you want to add as well.

### 2. Log In

Reached from the landing page ("Log In" button). A simple single screen:

- Email + password fields with show/hide password
- Inline validation: valid email format, password required
- Links to the sign-up form
- On submit, show a success state however you like (e.g., a "You're signed in" screen)

### 3. Sign Up (single form)

Reached from the landing page ("Get Started"). **No multi-step flow** — one clean form:

- **Name** (required)
- **Email** (required, must be a valid format)
- **Password** (required, meet strength rules: min 8 chars, one uppercase, one lowercase, one number, one special character)
- **About you / description** (optional, multiline)
- Show/hide password toggle, inline error messages per field
- On submit, show a success state however you like (e.g., a "You're signed in" screen)

---



Good luck! We're excited to see what you build.