import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { colors } from '../theme/colors';

const GameHeader = () => {
  const score = useGameStore((state) => state.score);
  const highScore = useGameStore((state) => state.highScore);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleek Match</Text>
      <View style={styles.scoreRow}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.highScore}>Best: {highScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  score: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
  },
  highScore: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});

export default GameHeader;
