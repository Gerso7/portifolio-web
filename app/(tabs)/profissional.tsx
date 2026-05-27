import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { professionalExperience } from '@/constants/data';

// ─── Achievement Item ─────────────────────────────────────────────────────────

function AchievementItem({ text }: { text: string }) {
  return (
    <View style={styles.achievementItem}>
      <View style={styles.achievementDot} />
      <Text style={styles.achievementText}>{text}</Text>
    </View>
  );
}

// ─── Tech Tag ─────────────────────────────────────────────────────────────────

function TechTag({ name }: { name: string }) {
  return (
    <View style={styles.techTag}>
      <Text style={styles.techTagText}>{name}</Text>
    </View>
  );
}

// ─── Experience Card ──────────────────────────────────────────────────────────

interface ExpCardProps {
  item: typeof professionalExperience[number];
  index: number;
}

function ExperienceCard({ item, index }: ExpCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        delay: index * 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <View style={[styles.expCard, { borderLeftColor: item.color, borderLeftWidth: 3 }]}>
        {/* Subtle gradient bg */}
        <LinearGradient
          colors={[item.color + '10', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Header */}
        <View style={styles.expHeader}>
          <View style={styles.expIconContainer}>
            <LinearGradient
              colors={[item.color, item.color + 'AA']}
              style={styles.expIcon}
            >
              <Ionicons name="briefcase" size={20} color="#FFF" />
            </LinearGradient>
          </View>
          <View style={styles.expTitleBlock}>
            <Text style={styles.expRole}>{item.role}</Text>
            <Text style={styles.expCompany}>{item.company}</Text>
          </View>
        </View>

        {/* Meta */}
        <View style={styles.expMeta}>
          <View style={styles.expMetaItem}>
            <Ionicons name="calendar-outline" size={13} color={Colors.textMuted} />
            <Text style={styles.expMetaText}>{item.period}</Text>
          </View>
          <View style={[styles.typeBadge, { backgroundColor: item.color + '20', borderColor: item.color + '44' }]}>
            <Text style={[styles.typeText, { color: item.color }]}>{item.type}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.expDescription}>{item.description}</Text>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.achievementsLabel}>Conquistas & Responsabilidades</Text>
          {item.achievements.map((a, i) => (
            <AchievementItem key={i} text={a} />
          ))}
        </View>

        {/* Tech tags */}
        <View style={styles.techTagsSection}>
          <Text style={styles.techTagsLabel}>STACK</Text>
          <View style={styles.techTagsRow}>
            {item.techs.map((t) => (
              <TechTag key={t} name={t} />
            ))}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <LinearGradient
        colors={[Colors.primary + '15', Colors.accent + '10']}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.emptyIcon}>💼</Text>
      <Text style={styles.emptyTitle}>Em construção</Text>
      <Text style={styles.emptyText}>
        Adicione suas experiências profissionais em{' '}
        <Text style={styles.emptyCode}>constants/data.ts</Text>
      </Text>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProfissionalScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F0F22', '#08080F']} style={StyleSheet.absoluteFillObject} />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Page header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Experiência</Text>
          <Text style={styles.pageSubtitle}>Trajetória profissional e conquistas</Text>
        </View>

        {/* Currently studying banner */}
        <View style={styles.studyingBanner}>
          <LinearGradient
            colors={[Colors.accent + '15', Colors.primary + '10']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Ionicons name="school-outline" size={20} color={Colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Estudante em tempo integral</Text>
            <Text style={styles.bannerText}>
              Atualmente cursando Ciência da Computação na UNICAP enquanto desenvolvo
              projetos práticos e me especializo em Data Science e Marketing.
            </Text>
          </View>
        </View>

        {/* Cards */}
        {professionalExperience.length > 0 ? (
          <View style={styles.cardsList}>
            {professionalExperience.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} />
            ))}
          </View>
        ) : (
          <EmptyState />
        )}

        {/* CTA card */}
        <View style={styles.ctaCard}>
          <Ionicons name="sparkles-outline" size={24} color={Colors.primaryLight} />
          <Text style={styles.ctaTitle}>Aberto a oportunidades</Text>
          <Text style={styles.ctaText}>
            Buscando estágios e projetos nas áreas de Desenvolvimento de Software,
            Data Science e Performance Marketing.
          </Text>
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

  studyingBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: Colors.card,
    borderColor: Colors.accent + '33',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  bannerTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  bannerText: { fontSize: 12, color: Colors.textMuted, lineHeight: 18 },

  cardsList: { gap: 16 },

  expCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    overflow: 'hidden',
  },
  expHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  expIconContainer: {},
  expIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  expTitleBlock: { flex: 1 },
  expRole: { fontSize: 16, fontWeight: '800', color: Colors.text },
  expCompany: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },

  expMeta: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  expMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  expMetaText: { fontSize: 12, color: Colors.textMuted },
  typeBadge: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  typeText: { fontSize: 11, fontWeight: '700' },

  expDescription: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },

  achievementsSection: { gap: 8 },
  achievementsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  achievementItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  achievementDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 6,
    flexShrink: 0,
  },
  achievementText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },

  techTagsSection: { gap: 8 },
  techTagsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1.2,
  },
  techTagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  techTag: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  techTagText: { fontSize: 11, color: Colors.primaryLight, fontWeight: '600' },

  emptyState: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  emptyIcon: { fontSize: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: Colors.text },
  emptyText: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', lineHeight: 20 },
  emptyCode: { color: Colors.primaryLight, fontWeight: '600' },

  ctaCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.primary + '44',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  ctaTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },
  ctaText: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', lineHeight: 20 },
});
