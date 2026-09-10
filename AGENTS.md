# take-home-landing-signup

This is the candidate workspace: a blank Expo (React Native + TypeScript) app.

The assignment spec is in `TASK.md`. Build on the provided skeleton:

```
├── App.tsx                    # Root: minimal screen switcher (landing/login/signup)
└── src/
    └── screens/
        ├── LandingScreen.tsx  # Empty stub — build the landing page
        ├── LoginScreen.tsx    # Empty stub — build the login form
        └── SignUpScreen.tsx   # Empty stub — build the sign-up form
```

No backend, no API layer, no pre-built design — start from the stubs.

## Useful commands

- `npm start` — start Expo dev server
- `npm run web` — run in the browser (primary way to test)
- `npm run typecheck` — run `tsc --noEmit`
- `npm run android` — run on an Android emulator/device (optional)
- `npm run ios` — run on iOS simulator (macOS only, optional)

## Code style

- TypeScript strict; no `any`
- `interface` for object shapes
- Function components + hooks only
- `StyleSheet.create()` for styles; simple, consistent colors
- Conventional commits (`feat:`, `fix:`, `refactor:`)

## Expo note

SDK 57 is installed. Always check the versioned docs at
https://docs.expo.dev/versions/v57.0.0/ before using an Expo API.