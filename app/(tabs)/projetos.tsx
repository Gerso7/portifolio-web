import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Animated, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { projects } from '@/constants/data';

// ─── Tech Tag ─────────────────────────────────────────────────────────────────

function TechTag({ name }: { name: string }) {
  return (
    <View style={styles.techTag}>
      <Text style={styles.techTagText}>{name}</Text>
    </View>
  );
}

// ─── Action Button ────────────────────────────────────────────────────────────

interface ActionBtnProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
}

function ActionButton({ icon, label, onPress, variant = 'outline' }: ActionBtnProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() =>
        Animated.spring(scale, { toValue: 0.93, useNativeDriver: true, speed: 50 }).start()
      }
      onPressOut={() =>
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start()
      }
      style={{ flex: 1 }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {variant === 'primary' ? (
          <LinearGradient
            colors={[Colors.primary, Colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.actionBtnPrimary}
          >
            <Ionicons name={icon} size={15} color="#FFF" />
            <Text style={styles.actionBtnPrimaryText}>{label}</Text>
          </LinearGradient>
        ) : (
          <View style={styles.actionBtnOutline}>
            <Ionicons name={icon} size={15} color={Colors.textSecondary} />
            <Text style={styles.actionBtnOutlineText}>{label}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  item: typeof projects[number];
  index: number;
}

function ProjectCard({ item, index }: ProjectCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

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

  const isThisApp = item.status === 'Este App ✨';

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <View style={[styles.projectCard, isThisApp && styles.projectCardFeatured]}>
        {/* Gradient accent at top */}
        <LinearGradient
          colors={[item.color + '20', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.projectCardGradient, { borderTopLeftRadius: 16, borderTopRightRadius: 16 }]}
        />

        {/* Card top bar */}
        <View style={styles.cardTopBar}>
          <View style={[styles.projectIconBg, { backgroundColor: item.color + '22', borderColor: item.color + '44' }]}>
            <Text style={styles.projectIcon}>{item.icon}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: item.color + '18', borderColor: item.color + '44' }]}>
            {isThisApp && <View style={[styles.statusDot, { backgroundColor: item.color }]} />}
            <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
          </View>
        </View>

        {/* Content */}
        <Text style={styles.projectName}>{item.name}</Text>
        <Text style={styles.projectDesc}>{item.description}</Text>

        {/* Tech tags */}
        <View style={styles.tagsRow}>
          {item.techs.map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <ActionButton
            icon="logo-github"
            label="Código"
            onPress={() => Linking.openURL(item.github)}
            variant="outline"
          />
          {item.demo && (
            <ActionButton
              icon="open-outline"
              label="Demo"
              onPress={() => Linking.openURL(item.demo!)}
              variant="primary"
            />
          )}
        </View>

        {isThisApp && (
          <View style={styles.youAreHereBadge}>
            <Ionicons name="sparkles" size={12} color={item.color} />
            <Text style={[styles.youAreHereText, { color: item.color }]}>Você está usando este app agora!</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProjetosScreen() {
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
          <Text style={styles.pageTitle}>Projetos</Text>
          <Text style={styles.pageSubtitle}>O que tenho construído</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{projects.length}</Text>
            <Text style={styles.statLabel}>Projetos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {projects.filter((p) => p.status === 'Concluído').length}
            </Text>
            <Text style={styles.statLabel}>Concluídos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {[...new Set(projects.flatMap((p) => p.techs))].length}
            </Text>
            <Text style={styles.statLabel}>Tecnologias</Text>
          </View>
        </View>

        {/* Cards */}
        <View style={styles.cardsList}>
          {projects.map((item, index) => (
            <ProjectCard key={item.id} item={item} index={index} />
          ))}
        </View>

        {/* Add more CTA */}
        <View style={styles.addMoreCard}>
          <LinearGradient
            colors={[Colors.primary + '12', Colors.accent + '08']}
            style={StyleSheet.absoluteFillObject}
          />
          <Ionicons name="add-circle-outline" size={28} color={Colors.textMuted} />
          <Text style={styles.addMoreText}>
            Adicione mais projetos em{' '}
            <Text style={styles.addMoreCode}>constants/data.ts</Text>
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

  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: { alignItems: 'center', gap: 4 },
  statValue: { fontSize: 24, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: 11, color: Colors.textMuted },
  statDivider: { width: 1, height: 32, backgroundColor: Colors.border },

  cardsList: { gap: 16 },

  projectCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    overflow: 'hidden',
  },
  projectCardFeatured: {
    borderColor: Colors.accent + '44',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  projectCardGradient: { ...StyleSheet.absoluteFillObject, height: 60 },

  cardTopBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  projectIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  projectIcon: { fontSize: 22 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '700' },

  projectName: { fontSize: 18, fontWeight: '800', color: Colors.text },
  projectDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },

  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  techTag: {
    backgroundColor: Colors.surface,
    borderColor: Colors.borderLight,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  techTagText: { fontSize: 11, color: Colors.primaryLight, fontWeight: '600' },

  actionsRow: { flexDirection: 'row', gap: 10 },
  actionBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionBtnPrimaryText: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  actionBtnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  actionBtnOutlineText: { color: Colors.textSecondary, fontSize: 13, fontWeight: '600' },

  youAreHereBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
  },
  youAreHereText: { fontSize: 11, fontWeight: '600' },

  addMoreCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    overflow: 'hidden',
  },
  addMoreText: { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },
  addMoreCode: { color: Colors.primaryLight, fontWeight: '600' },
});
