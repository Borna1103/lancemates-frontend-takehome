import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../hooks/useColors";
import { useTheme } from "../contexts/ThemeContext";

export type ScreenName = "landing" | "login" | "signup";

interface ILandingScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

/**
 * Public marketing page.
 *
 * Skeleton — replace each section stub below with the real content:
 *   - Hero: headline, subtitle, CTAs, trust stats
 *   - Features: grid of 6 cards (icon + title + blurb)
 *   - How it works: 3 steps
 *   - Final CTA + Footer
 * Make it responsive at mobile/desktop and wire the section ideas from TASK.md.
 */
export default function LandingScreen({ onNavigate }: ILandingScreenProps) {
  const colors = useColors();
  const { resolvedTheme, toggleTheme } = useTheme();

  const placeholderSections = [
    { title: "Hero", note: "Headline, subtitle, CTAs + trust stats" },
    { title: "Features", note: "6 feature cards in a grid" },
    { title: "How it works", note: "3 steps" },
    { title: "Final CTA", note: "Highlighted signup box" },
    { title: "Footer", note: "Brand, copyright, links" },
  ];

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.nav,
          { backgroundColor: colors.backgroundCard, borderBottomColor: colors.borderLight },
        ]}
      >
        <View style={styles.navInner}>
          <TouchableOpacity onPress={() => onNavigate("landing")}>
            <View style={styles.brandRow}>
              <View style={[styles.brandDot, { backgroundColor: colors.tintDark }]} />
              <Text style={[styles.brandText, { color: colors.text }]}>Lancemates</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.navActions}>
            <TouchableOpacity
              style={[styles.navButton, { borderColor: colors.border }]}
              onPress={() => onNavigate("login")}
            >
              <Text style={[styles.navButtonText, { color: colors.text }]}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navButtonPrimary, { backgroundColor: colors.tintDark }]}
              onPress={() => onNavigate("signup")}
            >
              <Text style={[styles.navButtonPrimaryText, { color: colors.tintForeground }]}>
                Get Started
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navButton, { borderColor: colors.borderLight }]}
              onPress={toggleTheme}
            >
              <Text style={[styles.navButtonText, { color: colors.textSecondary }]}>
                {resolvedTheme === "light" ? "Dark" : "Light"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {placeholderSections.map((section, index) => (
          <View
            key={section.title}
            style={[
              styles.section,
              { backgroundColor: index % 2 === 0 ? colors.background : colors.backgroundDimmed },
            ]}
          >
            <Text style={[styles.sectionLabel, { color: colors.tintDark }]}>Section</Text>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            <Text style={[styles.sectionNote, { color: colors.textSecondary }]}>
              {section.note}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  nav: {
    borderBottomWidth: 1,
    paddingHorizontal: 24,
  },
  navInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    maxWidth: 1100,
    width: "100%",
    alignSelf: "center",
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandDot: { width: 10, height: 10, borderRadius: 5 },
  brandText: { fontSize: 22, fontWeight: "800", letterSpacing: -0.5 },
  navActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  navButtonText: { fontSize: 14, fontWeight: "600" },
  navButtonPrimary: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  navButtonPrimaryText: { fontSize: 14, fontWeight: "600" },
  content: { flexGrow: 1 },
  section: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 28, fontWeight: "800", marginBottom: 8 },
  sectionNote: { fontSize: 14, textAlign: "center" },
});