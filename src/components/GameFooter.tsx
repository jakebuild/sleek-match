import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGameStore, useGameActions } from '../store/gameStore';
import { colors } from '../theme/colors';

const GameFooter = () => {
  const history = useGameStore((state) => state.history);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const { addLines, undo, resetGame } = useGameActions();

  const canUndo = history.length > 0;
  const canAddLines = gameStatus !== 'won';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !canAddLines && styles.buttonDisabled]}
        onPress={addLines}
        disabled={!canAddLines}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, !canAddLines && styles.buttonTextDisabled]}>
          Add Lines
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
        style={[styles.button, styles.resetButton]}
        onPress={resetGame}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  resetButton: {
    backgroundColor: colors.accent,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  buttonTextDisabled: {
    color: colors.textSecondary,
  },
});

export default GameFooter;
