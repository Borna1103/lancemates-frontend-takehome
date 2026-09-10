/**
 * App palette. Every color the UI uses should come from here — components must
 * pull colors through `useColors()` and never hardcode a literal like "#fff".
 */

export const Colors = {
  light: {
    text: "#151718",
    textSecondary: "#666666",
    textTertiary: "#888888",
    background: "#FAF9F6",
    backgroundCard: "#ffffff",
    backgroundDimmed: "#F2F1ED",
    tint: "#002c37",
    tintDark: "#002c37",
    tintForeground: "#FFFFFF",
    border: "#bbbbbb",
    borderLight: "#e0e0e0",
    success: "#27ae60",
    error: "#c0392b",
    warning: "#e67e22",
  },
  dark: {
    text: "#F0F0F0",
    textSecondary: "#b8b8b8",
    textTertiary: "#888888",
    background: "#0a0a0a",
    backgroundCard: "#1c1a1c",
    backgroundDimmed: "#100f10",
    tint: "#14b8a6",
    tintDark: "#14b8a6",
    tintForeground: "#111111",
    border: "#4a4a4a",
    borderLight: "#3a383a",
    success: "#2ecc71",
    error: "#e74c3c",
    warning: "#f1c40f",
  },
} as const;

export type IColors = (typeof Colors)["light"];