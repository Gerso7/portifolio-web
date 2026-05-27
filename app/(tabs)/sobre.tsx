import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { profile, interests, skills, appDependencies } from '@/constants/data';

// ─── Section Header ──────────────────────────────────────────────────────────

function SectionHeader({ title, icon }: { title: string; icon: React.ComponentProps<typeof Ionicons>['name'] }) {
  return (
    <View style={styles.sectionHeader}>
      <LinearGradient
        colors={[Colors.primary, Colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.sectionIconBg}
      >
        <Ionicons name={icon} size={16} color="#FFF" />
      </LinearGradient>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

// ─── Interest Badge ───────────────────────────────────────────────────────────

function InterestBadge({ label, icon, color }: { label: string; icon: string; color: string }) {
  return (
    <View style={[styles.interestBadge, { borderColor: color + '44', backgroundColor: color + '12' }]}>
      <Text style={styles.interestIcon}>{icon}</Text>
      <Text style={[styles.interestLabel, { color }]}>{label}</Text>
    </View>
  );
}

// ─── Skill Row (categories) ───────────────────────────────────────────────────

function SkillRow({ items }: { items: typeof skills }) {
  return (
    <View style={styles.skillRow}>
      {items.map((s) => (
        <View key={s.name} style={[styles.skillPill, { borderColor: s.color + '50' }]}>
          <Text style={styles.skillPillIcon}>{s.icon}</Text>
          <Text style={[styles.skillPillText, { color: s.color }]}>{s.name}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Dependency Item ──────────────────────────────────────────────────────────

function DepItem({ name, version, description }: { name: string; version: string; description: string }) {
  return (
    <View style={styles.depItem}>
      <View style={styles.depLeft}>
        <Text style={styles.depName}>{name}</Text>
        <Text style={styles.depDesc}>{description}</Text>
      </View>
      <View style={styles.depVersionBadge}>
        <Text style={styles.depVersion}>{version.replace(/[~^]/, '')}</Text>
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SobreScreen() {
  const insets = useSafeAreaInsets();
  const [depsExpanded, setDepsExpanded] = useState(false);

  const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F0F22', '#08080F']}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Page title */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Sobre Mim</Text>
          <Text style={styles.pageSubtitle}>Quem eu sou e o que construo</Text>
        </View>

        {/* Profile summary card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={[Colors.primary + '22', Colors.accent + '11']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradientBg}
          />
          <View style={styles.profileInitialsBig}>
            <Text style={styles.profileInitialsText}>{profile.initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileFullName}>{profile.fullName}</Text>
            <Text style={styles.profileLocation}>
              <Ionicons name="location-outline" size={12} color={Colors.textMuted} />
              {'  '}{profile.location}
            </Text>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.card}>
          <SectionHeader title="Bio" icon="person-outline" />
          <Text style={styles.bioText}>{profile.bio}</Text>
          <Text style={[styles.bioText, { marginTop: 10 }]}>
            Acredito que a interseção entre tecnologia, dados e marketing é onde surgem os
            produtos mais impactantes. Busco sempre unir raciocínio analítico com execução
            técnica de qualidade.
          </Text>
        </View>

        {/* Interests */}
        <View style={styles.card}>
          <SectionHeader title="Interesses Profissionais" icon="heart-outline" />
          <View style={styles.interestsWrap}>
            {interests.map((i) => (
              <InterestBadge key={i.label} label={i.label} icon={i.icon} color={i.color} />
            ))}
          </View>
        </View>

        {/* Skills by category */}
        <View style={styles.card}>
          <SectionHeader title="Tecnologias" icon="code-outline" />
          {Object.entries(skillsByCategory).map(([category, items]) => (
            <View key={category} style={styles.catSection}>
              <Text style={styles.catLabel}>{category.toUpperCase()}</Text>
              <SkillRow items={items} />
            </View>
          ))}
        </View>

        {/* App dependencies — collapsible */}
        <View style={styles.card}>
          <Pressable
            onPress={() => setDepsExpanded((v) => !v)}
            style={styles.depsHeader}
          >
            <View style={{ flex: 1 }}>
              <SectionHeader title="Dependências deste App" icon="layers-outline" />
              <Text style={styles.depsSubtitle}>
                {appDependencies.length} pacotes utilizados para construir este portfólio mobile
              </Text>
            </View>
            <Ionicons
              name={depsExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={Colors.textMuted}
            />
          </Pressable>

          {depsExpanded && (
            <View style={styles.depsList}>
              {appDependencies.map((d) => (
                <DepItem key={d.name} name={d.name} version={d.version} description={d.description} />
              ))}
            </View>
          )}
        </View>

        {/* Contact */}
        <View style={[styles.card, styles.contactCard]}>
          <LinearGradient
            colors={[Colors.primary + '18', Colors.accent + '10']}
            style={StyleSheet.absoluteFillObject}
          />
          <Ionicons name="mail-outline" size={28} color={Colors.primaryLight} />
          <Text style={styles.contactTitle}>Vamos conversar?</Text>
          <Text style={styles.contactEmail}>{profile.email}</Text>
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },

  pageHeader: { marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
  pageSubtitle: { fontSize: 14, color: Colors.textMuted, marginTop: 4 },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
    gap: 14,
  },
  profileGradientBg: { ...StyleSheet.absoluteFillObject, opacity: 0.5 },
  profileInitialsBig: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryGlow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary + '55',
  },
  profileInitialsText: { fontSize: 20, fontWeight: '800', color: Colors.primaryLight },
  profileInfo: { flex: 1 },
  profileFullName: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  profileLocation: { fontSize: 12, color: Colors.textMuted },

  card: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  sectionIconBg: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },

  bioText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },

  interestsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  interestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  interestIcon: { fontSize: 14 },
  interestLabel: { fontSize: 12, fontWeight: '600' },

  catSection: { marginBottom: 12 },
  catLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  skillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  skillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  skillPillIcon: { fontSize: 12 },
  skillPillText: { fontSize: 11, fontWeight: '700' },

  // Dependencies
  depsHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  depsSubtitle: { fontSize: 12, color: Colors.textMuted, marginLeft: 38, marginTop: -8, marginBottom: 4 },
  depsList: { borderTopWidth: 1, borderTopColor: Colors.border, marginTop: 10, paddingTop: 10, gap: 2 },
  depItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border + '66',
  },
  depLeft: { flex: 1 },
  depName: { fontSize: 13, fontWeight: '700', color: Colors.primaryLight, fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace' },
  depDesc: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  depVersionBadge: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  depVersion: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },

  // Contact
  contactCard: { alignItems: 'center', gap: 6, borderColor: Colors.primary + '44' },
  contactTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },
  contactEmail: { fontSize: 13, color: Colors.primaryLight },
});

