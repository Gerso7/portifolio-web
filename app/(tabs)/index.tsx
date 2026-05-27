import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { profile, skills } from '@/constants/data';

// ─── Skill Chip ───────────────────────────────────────────────────────────────

function SkillChip({ name, icon, color }: { name: string; icon: string; color: string }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.94, useNativeDriver: true, speed: 40 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.chip, { borderColor: color + '55' }]}
      >
        <Text style={styles.chipIcon}>{icon}</Text>
        <Text style={[styles.chipText, { color }]}>{name}</Text>
      </Pressable>
    </Animated.View>
  );
}

// ─── Social Button ────────────────────────────────────────────────────────────

interface SocialBtnProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  url: string;
  gradient: readonly [string, string];
}

function SocialButton({ icon, label, url, gradient }: SocialBtnProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(url);
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() =>
        Animated.spring(scale, { toValue: 0.94, useNativeDriver: true, speed: 40 }).start()
      }
      onPressOut={() =>
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start()
      }
      style={{ flex: 1 }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.socialBtn}>
          <Ionicons name={icon} size={20} color="#FFF" />
          <Text style={styles.socialBtnText}>{label}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 40, useNativeDriver: true }),
    ]).start();

    // Pulsing glow on avatar
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {/* Hero gradient background */}
      <LinearGradient
        colors={['#0F0F22', '#170D28', '#0A1520']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* ── Avatar ── */}
          <View style={styles.avatarSection}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <LinearGradient
                colors={[Colors.primary, Colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarBorder}
              >
                <View style={styles.avatarInner}>
                  <Text style={styles.avatarInitials}>{profile.initials}</Text>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Status badge */}
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Disponível para oportunidades</Text>
            </View>
          </View>

          {/* ── Identity ── */}
          <View style={styles.identitySection}>
            <Text style={styles.name}>{profile.name}</Text>
            <LinearGradient
              colors={[Colors.primaryLight, Colors.accentLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleGradientWrap}
            >
              <Text style={styles.titleGradient}>{profile.title}</Text>
            </LinearGradient>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={Colors.textMuted} />
              <Text style={styles.location}>{profile.location}</Text>
            </View>
          </View>

          {/* ── Bio Card ── */}
          <View style={styles.bioCard}>
            <Text style={styles.bioText}>{profile.bio}</Text>
          </View>

          {/* ── Social Buttons ── */}
          <View style={styles.socialRow}>
            <SocialButton
              icon="logo-github"
              label="GitHub"
              url={profile.github}
              gradient={[Colors.primary, '#4F46E5']}
            />
            <SocialButton
              icon="logo-linkedin"
              label="LinkedIn"
              url={profile.linkedin}
              gradient={['#0077B5', '#005FA3']}
            />
            <SocialButton
              icon="mail-outline"
              label="Email"
              url={`mailto:${profile.email}`}
              gradient={[Colors.accent, '#0284C7']}
            />
          </View>

          {/* ── Skills ── */}
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>Stack Tecnológico</Text>
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <View key={category} style={styles.categoryBlock}>
                <Text style={styles.categoryLabel}>{category}</Text>
                <View style={styles.chipRow}>
                  {items.map((s) => (
                    <SkillChip key={s.name} name={s.name} icon={s.icon} color={s.color} />
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* ── Footer tag ── */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Construído com React Native + Expo ⚡</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },

  // Avatar
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatarBorder: {
    width: 108,
    height: 108,
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  avatarInner: {
    width: 102,
    height: 102,
    borderRadius: 51,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: { fontSize: 36, fontWeight: '800', color: Colors.primaryLight },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successGlow,
    borderColor: Colors.success + '44',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 12,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  statusText: { fontSize: 12, color: Colors.success, fontWeight: '600' },

  // Identity
  identitySection: { alignItems: 'center', marginBottom: 20 },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  titleGradientWrap: { borderRadius: 4, marginBottom: 8 },
  titleGradient: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    paddingHorizontal: 2,
    letterSpacing: 0.3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: { fontSize: 13, color: Colors.textMuted },

  // Bio
  bioCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  bioText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
  },

  // Social
  socialRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
  },
  socialBtnText: { color: '#FFF', fontSize: 13, fontWeight: '700' },

  // Skills
  skillsSection: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  categoryBlock: { marginBottom: 14 },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipIcon: { fontSize: 13 },
  chipText: { fontSize: 12, fontWeight: '700' },

  // Footer
  footer: { alignItems: 'center', paddingTop: 8 },
  footerText: { fontSize: 12, color: Colors.textMuted, letterSpacing: 0.3 },
});
