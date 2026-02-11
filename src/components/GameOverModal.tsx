import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useGameStore, useGameActions } from '../store/gameStore';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../theme/colors';

const GameOverModal = () => {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const score = useGameStore((state) => state.score);
  const highScore = useGameStore((state) => state.highScore);
  const { resetGame, addLines } = useGameActions();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (gameStatus === 'playing') return null;

  const isWin = gameStatus === 'won';
  const title = isWin ? 'You Win!' : 'No Moves Left';
  const isNewBest = score >= highScore && score > 0;

  return (
    <Modal transparent animationType="fade" visible>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>

          {isNewBest && (
            <Text style={styles.newBest}>New Best!</Text>
          )}

          <View style={styles.buttonRow}>
            {!isWin && (
              <TouchableOpacity
                style={[styles.button, styles.addLinesButton]}
                onPress={addLines}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Add Lines</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.newGameButton]}
              onPress={resetGame}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      paddingVertical: 32,
      paddingHorizontal: 40,
      alignItems: 'center',
      minWidth: 280,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 16,
    },
    scoreLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    scoreValue: {
      fontSize: 48,
      fontWeight: '700',
      color: colors.accent,
      marginTop: 4,
    },
    newBest: {
      fontSize: 14,
      fontWeight: '600',
      color: '#4CAF50',
      marginTop: 8,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 24,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      minWidth: 110,
      alignItems: 'center',
    },
    addLinesButton: {
      backgroundColor: colors.selectedBackground,
    },
    newGameButton: {
      backgroundColor: colors.accent,
    },
    buttonText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
  });

export default GameOverModal;
