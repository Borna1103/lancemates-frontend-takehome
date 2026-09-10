import { Colors } from "../constants/colors";
import { useTheme } from "../contexts/ThemeContext";

/**
 * Theme-aware color palette. Use this in every component instead of hardcoded
 * colors: `const colors = useColors();`
 */
export function useColors() {
  const { resolvedTheme } = useTheme();
  return Colors[resolvedTheme];
}