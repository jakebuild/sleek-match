import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGameStore, useGameActions } from '../store/gameStore';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../theme/colors';

const GameFooter = () => {
  const history = useGameStore((state) => state.history);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const { addLines, undo, resetGame, showHint, toggleSound } = useGameActions();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const canUndo = history.length > 0;
  const canAddLines = gameStatus !== 'won';
  const isPlaying = gameStatus === 'playing';

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, !canAddLines && styles.buttonDisabled]}
          onPress={addLines}
          disabled={!canAddLines}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, !canAddLines && styles.buttonTextDisabled]}>
            + Lines
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !canUndo && styles.buttonDisabled]}
          onPress={undo}
          disabled={!canUndo}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, !canUndo && styles.buttonTextDisabled]}>
            Undo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !isPlaying && styles.buttonDisabled]}
          onPress={showHint}
          disabled={!isPlaying}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, !isPlaying && styles.buttonTextDisabled]}>
            Hint
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={toggleSound}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {soundEnabled ? 'Sound' : 'Muted'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetGame}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 8,
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.surface,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      gap: 6,
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      backgroundColor: colors.surface,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonDisabled: {
      opacity: 0.4,
    },
    resetButton: {
      backgroundColor: colors.accent,
    },
    buttonText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
    },
    buttonTextDisabled: {
      color: colors.textSecondary,
    },
  });

export default GameFooter;
