import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Screen = 'login' | 'signup';

interface Props {
  onNavigate: (screen: Screen) => void;
}

/**
 * Public marketing page. Skeleton — replace each section stub with the real
 * content (hero, features, how it works, CTA, footer).
 */
export default function LandingScreen({ onNavigate }: Props) {
  const sections = [
    { title: 'Hero', note: 'Headline, subtitle, buttons + trust stats' },
    { title: 'Features', note: '6 feature cards in a grid' },
    { title: 'How it works', note: '3 steps' },
    { title: 'Final CTA', note: 'Highlighted sign-up box' },
    { title: 'Footer', note: 'Brand, copyright, links' },
  ];

  return (
    <View style={styles.root}>
      <View style={styles.nav}>
        <Text style={styles.logo}>Lancemates</Text>
        <View style={styles.navLinks}>
          <TouchableOpacity style={styles.navButton} onPress={() => onNavigate('login')}>
            <Text style={styles.navButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButtonPrimary} onPress={() => onNavigate('signup')}>
            <Text style={styles.navButtonPrimaryText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {sections.map((section, index) => (
          <View key={section.title} style={[styles.section, index % 2 === 1 && styles.sectionAlt]}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionNote}>{section.note}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: { fontSize: 22, fontWeight: '800' },
  navLinks: { flexDirection: 'row', gap: 12 },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bbbbbb',
  },
  navButtonText: { fontSize: 14, fontWeight: '600' },
  navButtonPrimary: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#002c37',
  },
  navButtonPrimaryText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  content: { flexGrow: 1 },
  section: { paddingVertical: 80, paddingHorizontal: 24, alignItems: 'center' },
  sectionAlt: { backgroundColor: '#f2f1ed' },
  sectionTitle: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
  sectionNote: { fontSize: 14, textAlign: 'center', color: '#666' },
});