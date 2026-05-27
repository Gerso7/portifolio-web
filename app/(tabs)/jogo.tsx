import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

// ─── Game Config ──────────────────────────────────────────────────────────────

const TECHS = [
  { name: 'React', icon: '⚛️', color: '#61DAFB', bg: '#0A2030' },
  { name: 'Python', icon: '🐍', color: '#3776AB', bg: '#0A1525' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6', bg: '#0A1830' },
  { name: 'Expo', icon: '⚡', color: '#B4B4FF', bg: '#12102A' },
  { name: 'SQL', icon: '🗄️', color: '#F29111', bg: '#201205' },
  { name: 'Git', icon: '🌿', color: '#F05032', bg: '#200A05' },
] as const;

type Tech = typeof TECHS[number];

interface Card {
  id: number;
  techIndex: number;
  tech: Tech;
  isFlipped: boolean;
  isMatched: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING = 20;
const GAP = 10;
const COLS = 3;
const CARD_SIZE = Math.floor((SCREEN_WIDTH - PADDING * 2 - GAP * (COLS - 1)) / COLS);

function createDeck(): Card[] {
  const deck: Card[] = [...TECHS, ...TECHS].map((tech, index) => ({
    id: index,
    techIndex: TECHS.indexOf(tech as Tech),
    tech,
    isFlipped: false,
    isMatched: false,
  }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// ─── Flip Card Component ──────────────────────────────────────────────────────

interface FlipCardProps {
  card: Card;
  onPress: () => void;
  disabled: boolean;
}

const MemoryCard = React.memo(function MemoryCard({ card, onPress, disabled }: FlipCardProps) {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const revealed = card.isFlipped || card.isMatched;

  useEffect(() => {
    Animated.spring(flipAnim, {
      toValue: revealed ? 1 : 0,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [revealed]);

  // Bounce when matched
  useEffect(() => {
    if (card.isMatched) {
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.12, useNativeDriver: true, speed: 40 }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }),
      ]).start();
    }
  }, [card.isMatched]);

  const frontRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.499, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backRotate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['-180deg', '0deg'] });
  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.499, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  return (
    <Pressable
      onPress={() => !disabled && !card.isMatched && !card.isFlipped && onPress()}
      style={styles.cardOuter}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }], width: CARD_SIZE, height: CARD_SIZE }}>
        {/* Card Back (hidden face — shown when not flipped) */}
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              opacity: frontOpacity,
              transform: [{ perspective: 1000 }, { rotateY: frontRotate }],
            },
          ]}
        >
          <LinearGradient
            colors={[Colors.card, Colors.surface]}
            style={StyleSheet.absoluteFillObject}
          />
          <Text style={styles.cardBackMark}>?</Text>
          <View style={styles.cardBackGrid}>
            {[...Array(9)].map((_, i) => (
              <View key={i} style={styles.cardBackDot} />
            ))}
          </View>
        </Animated.View>

        {/* Card Front (tech icon — shown when flipped) */}
        <Animated.View
          style={[
            styles.card,
            styles.cardFront,
            card.isMatched && styles.cardMatched,
            {
              opacity: backOpacity,
              transform: [{ perspective: 1000 }, { rotateY: backRotate }],
              backgroundColor: card.tech.bg,
              borderColor: card.tech.color + (card.isMatched ? 'AA' : '55'),
            },
          ]}
        >
          {card.isMatched && (
            <LinearGradient
              colors={[card.tech.color + '22', card.tech.color + '08']}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          <Text style={[styles.techIcon, card.tech.name === 'TypeScript' && { fontSize: 16 }]}>
            {card.tech.icon}
          </Text>
          <Text style={[styles.techName, { color: card.tech.color }]}>{card.tech.name}</Text>
          {card.isMatched && (
            <View style={[styles.matchedCheck, { backgroundColor: card.tech.color + '22' }]}>
              <Ionicons name="checkmark" size={10} color={card.tech.color} />
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
});

// ─── Win Overlay ──────────────────────────────────────────────────────────────

interface WinOverlayProps {
  moves: number;
  seconds: number;
  onRestart: () => void;
}

function WinOverlay({ moves, seconds, onRestart }: WinOverlayProps) {
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.winOverlay, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['rgba(8,8,15,0.96)', 'rgba(12,8,25,0.98)']}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.View style={[styles.winCard, { transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient
          colors={[Colors.primary + '30', Colors.accent + '18']}
          style={StyleSheet.absoluteFillObject}
        />
        <Text style={styles.winEmoji}>🎉</Text>
        <Text style={styles.winTitle}>Você Ganhou!</Text>
        <Text style={styles.winSubtitle}>Todos os pares encontrados</Text>

        <View style={styles.winStats}>
          <View style={styles.winStatItem}>
            <Ionicons name="hand-left-outline" size={20} color={Colors.primaryLight} />
            <Text style={styles.winStatValue}>{moves}</Text>
            <Text style={styles.winStatLabel}>Jogadas</Text>
          </View>
          <View style={styles.winStatDivider} />
          <View style={styles.winStatItem}>
            <Ionicons name="timer-outline" size={20} color={Colors.accentLight} />
            <Text style={styles.winStatValue}>{formatTime(seconds)}</Text>
            <Text style={styles.winStatLabel}>Tempo</Text>
          </View>
        </View>

        {moves <= 12 && (
          <View style={styles.winBadge}>
            <Ionicons name="trophy" size={14} color="#FFD700" />
            <Text style={styles.winBadgeText}>Jogador Expert! (≤12 jogadas)</Text>
          </View>
        )}

        <Pressable onPress={onRestart} style={styles.restartBtnWin}>
          <LinearGradient
            colors={[Colors.primary, Colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.restartBtnGradient}
          >
            <Ionicons name="refresh" size={18} color="#FFF" />
            <Text style={styles.restartBtnText}>Jogar Novamente</Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function JogoScreen() {
  const insets = useSafeAreaInsets();

  const [cards, setCards] = useState<Card[]>(() => createDeck());
  const [firstIdx, setFirstIdx] = useState<number | null>(null);
  const [secondIdx, setSecondIdx] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const headerSlide = useRef(new Animated.Value(-20)).current;
  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(headerSlide, { toValue: 0, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  // Timer
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  const handleRestart = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCards(createDeck());
    setFirstIdx(null);
    setSecondIdx(null);
    setIsChecking(false);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
    setSeconds(0);
    setIsRunning(false);
  }, []);

  const handleCardPress = useCallback(
    async (index: number) => {
      if (isChecking || cards[index].isFlipped || cards[index].isMatched) return;

      if (!isRunning) setIsRunning(true);

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const newCards = cards.map((c, i) =>
        i === index ? { ...c, isFlipped: true } : c
      );
      setCards(newCards);

      if (firstIdx === null) {
        setFirstIdx(index);
        return;
      }

      // Second card flipped — check match
      setSecondIdx(index);
      setMoves((m) => m + 1);
      setIsChecking(true);

      const isMatch =
        newCards[firstIdx!].techIndex === newCards[index].techIndex &&
        firstIdx !== index;

      if (isMatch) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        const matched = newCards.map((c, i) =>
          i === firstIdx || i === index ? { ...c, isMatched: true, isFlipped: false } : c
        );
        setCards(matched);
        const newMatches = matches + 1;
        setMatches(newMatches);
        setFirstIdx(null);
        setSecondIdx(null);
        setIsChecking(false);
        if (newMatches === TECHS.length) {
          setIsRunning(false);
          setIsWon(true);
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              (i === firstIdx || i === index) && !c.isMatched
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFirstIdx(null);
          setSecondIdx(null);
          setIsChecking(false);
        }, 900);
      }
    },
    [cards, firstIdx, isChecking, isRunning, matches]
  );

  const progressPct = (matches / TECHS.length) * 100;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0818', '#08080F']} style={StyleSheet.absoluteFillObject} />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        {/* Header */}
        <Animated.View
          style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}
        >
          <View>
            <Text style={styles.headerTitle}>Jogo da Memória</Text>
            <Text style={styles.headerSub}>Encontre todos os pares de tecnologias</Text>
          </View>
          <Pressable onPress={handleRestart} style={styles.restartBtn}>
            <Ionicons name="refresh" size={20} color={Colors.primaryLight} />
          </Pressable>
        </Animated.View>

        {/* Stats Bar */}
        <View style={styles.statsBar}>
          <View style={styles.statBox}>
            <Ionicons name="hand-left-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.statVal}>{moves}</Text>
            <Text style={styles.statLbl}>Jogadas</Text>
          </View>
          <View style={styles.progressSection}>
            <View style={styles.progressBarBg}>
              <Animated.View
                style={[styles.progressBarFill, { width: `${progressPct}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{matches}/{TECHS.length} pares</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="timer-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.statVal}>{formatTime(seconds)}</Text>
            <Text style={styles.statLbl}>Tempo</Text>
          </View>
        </View>

        {/* Card Grid */}
        <View style={styles.grid}>
          {cards.map((card, index) => (
            <MemoryCard
              key={card.id}
              card={card}
              onPress={() => handleCardPress(index)}
              disabled={isChecking}
            />
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>TECNOLOGIAS NO JOGO</Text>
          <View style={styles.legendRow}>
            {TECHS.map((t) => (
              <View key={t.name} style={[styles.legendItem, { borderColor: t.color + '40' }]}>
                <Text style={styles.legendIcon}>{t.icon}</Text>
                <Text style={[styles.legendName, { color: t.color }]}>{t.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {isWon && (
        <WinOverlay moves={moves} seconds={seconds} onRestart={handleRestart} />
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: PADDING, paddingBottom: 16 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.text, letterSpacing: -0.3 },
  headerSub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  restartBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    gap: 12,
  },
  statBox: { alignItems: 'center', gap: 2, minWidth: 52 },
  statVal: { fontSize: 16, fontWeight: '800', color: Colors.text },
  statLbl: { fontSize: 9, color: Colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  progressSection: { flex: 1, gap: 5 },
  progressBarBg: {
    height: 5,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  progressText: { fontSize: 10, color: Colors.textMuted, textAlign: 'center', fontWeight: '600' },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  cardOuter: { width: CARD_SIZE, height: CARD_SIZE },

  // Cards
  card: {
    position: 'absolute',
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    borderColor: Colors.borderLight,
    backgroundColor: Colors.card,
  },
  cardBackMark: { fontSize: 28, fontWeight: '800', color: Colors.textMuted, zIndex: 2 },
  cardBackGrid: {
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: CARD_SIZE,
    height: CARD_SIZE,
    padding: 8,
    gap: 6,
    opacity: 0.15,
  },
  cardBackDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.primary },
  cardFront: {
    borderColor: Colors.border,
    gap: 4,
  },
  cardMatched: {
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  techIcon: { fontSize: 26 },
  techName: { fontSize: 9, fontWeight: '800', letterSpacing: 0.4 },
  matchedCheck: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Legend
  legend: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    gap: 10,
  },
  legendTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center' },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  legendIcon: { fontSize: 12 },
  legendName: { fontSize: 10, fontWeight: '700' },

  // Win Overlay
  winOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: 24,
  },
  winCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.primary + '55',
    borderWidth: 1,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    gap: 10,
    width: '100%',
    maxWidth: 320,
    overflow: 'hidden',
  },
  winEmoji: { fontSize: 52 },
  winTitle: { fontSize: 28, fontWeight: '900', color: Colors.text },
  winSubtitle: { fontSize: 14, color: Colors.textMuted, marginBottom: 8 },
  winStats: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  winStatItem: { alignItems: 'center', gap: 4 },
  winStatValue: { fontSize: 22, fontWeight: '800', color: Colors.text },
  winStatLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },
  winStatDivider: { width: 1, height: 36, backgroundColor: Colors.border },
  winBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,215,0,0.12)',
    borderColor: 'rgba(255,215,0,0.35)',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  winBadgeText: { fontSize: 12, color: '#FFD700', fontWeight: '700' },
  restartBtnWin: { width: '100%', borderRadius: 14, overflow: 'hidden', marginTop: 4 },
  restartBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: 14,
  },
  restartBtnText: { fontSize: 16, fontWeight: '800', color: '#FFF' },
});
