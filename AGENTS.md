# take-home-landing-signup

This is the candidate workspace: a blank Expo (React Native + TypeScript) app.

The assignment spec is in `TASK.md` — read it and build the landing page + signup flow described there.

## Useful commands

- `npm start` — start Expo dev server
- `npm run web` — run in the browser (primary way to test)
- `npm run typecheck` — run `tsc --noEmit`
- `npm run android` — run on an Android emulator/device (optional)
- `npm run ios` — run on iOS simulator (macOS only, optional)

## Code style

- TypeScript strict; no `any`
- `interface` with `I` prefix for object shapes (e.g., `IUser`)
- Function components + hooks only
- `StyleSheet.create()` for styles; theme-aware colors from a `constants` palette
- Conventional commits (`feat:`, `fix:`, `refactor:`)

## Expo note

SDK 57 is installed. Always check the versioned docs at
https://docs.expo.dev/versions/v57.0.0/ before using an Expo API.