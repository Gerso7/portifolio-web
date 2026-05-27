import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { academicExperience } from '@/constants/data';

// ─── Timeline Item ────────────────────────────────────────────────────────────

interface TimelineItemProps {
  item: typeof academicExperience[number];
  index: number;
  isLast: boolean;
}

function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = index * 180;
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[styles.timelineRow, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}
    >
      {/* Left: line + dot */}
      <View style={styles.timelineLeft}>
        <LinearGradient
          colors={[item.color, item.color + '44']}
          style={styles.timelineDot}
        >
          <Text style={styles.timelineDotIcon}>{item.icon}</Text>
        </LinearGradient>
        {!isLast && <View style={[styles.timelineLine, { backgroundColor: item.color + '33' }]} />}
      </View>

      {/* Right: card */}
      <View style={[styles.timelineCard, { borderLeftColor: item.color, borderLeftWidth: 3 }]}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.institution}>{item.institution}</Text>
            <View style={[styles.statusBadge, { backgroundColor: item.color + '22', borderColor: item.color + '55' }]}>
              <View style={[styles.statusDot, { backgroundColor: item.color }]} />
              <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
            </View>
          </View>
          <Text style={styles.institutionFull}>{item.fullName}</Text>
        </View>

        {/* Course info */}
        <View style={styles.courseInfo}>
          <LinearGradient
            colors={[item.color, item.color + 'AA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.courseTypeBadge}
          >
            <Text style={styles.courseTypeText}>{item.type}</Text>
          </LinearGradient>
          <View style={styles.periodRow}>
            <Ionicons name="calendar-outline" size={13} color={Colors.textMuted} />
            <Text style={styles.period}>{item.period}</Text>
          </View>
        </View>

        <Text style={styles.courseName}>{item.course}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {/* Highlights */}
        <View style={styles.highlightsSection}>
          <Text style={styles.highlightsLabel}>Destaques</Text>
          <View style={styles.highlightsGrid}>
            {item.highlights.map((h) => (
              <View key={h} style={[styles.highlightItem, { borderColor: item.color + '40' }]}>
                <Ionicons name="checkmark-circle" size={14} color={item.color} />
                <Text style={styles.highlightText}>{h}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function AcademicoScreen() {
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
          <Text style={styles.pageTitle}>Formação Acadêmica</Text>
          <Text style={styles.pageSubtitle}>Minha jornada de aprendizado contínuo</Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Formações', value: '3', icon: '🎓' },
            { label: 'Em andamento', value: '3', icon: '🔄' },
            { label: 'Ano início', value: '2023', icon: '📅' },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statEmoji}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {academicExperience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === academicExperience.length - 1}
            />
          ))}
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

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statEmoji: { fontSize: 20 },
  statValue: { fontSize: 20, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: 10, color: Colors.textMuted, textAlign: 'center' },

  timeline: { gap: 0 },

  timelineRow: { flexDirection: 'row', gap: 14, marginBottom: 24 },

  timelineLeft: { alignItems: 'center', width: 48 },
  timelineDot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotIcon: { fontSize: 22 },
  timelineLine: { flex: 1, width: 2, marginTop: 8, marginBottom: -8 },

  timelineCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },

  cardHeader: { gap: 4 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  institution: { fontSize: 18, fontWeight: '800', color: Colors.text },
  institutionFull: { fontSize: 12, color: Colors.textMuted },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 10, fontWeight: '700' },

  courseInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  courseTypeBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  courseTypeText: { fontSize: 11, fontWeight: '700', color: '#FFF' },
  periodRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  period: { fontSize: 12, color: Colors.textMuted },

  courseName: { fontSize: 15, fontWeight: '700', color: Colors.textSecondary },
  description: { fontSize: 13, color: Colors.textMuted, lineHeight: 20 },

  highlightsSection: { gap: 8 },
  highlightsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  highlightsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  highlightText: { fontSize: 11, color: Colors.textSecondary, fontWeight: '500' },
});
