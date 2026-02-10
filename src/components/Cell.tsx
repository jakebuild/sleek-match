import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Cell as CellType } from '../types/game';
import { colors } from '../theme/colors';

interface CellProps {
  cell: CellType;
  isSelected: boolean;
  onPress: () => void;
}

const Cell = memo(({ cell, isSelected, onPress }: CellProps) => {
  const isCleared = cell.status === 'cleared';

  if (isCleared) {
    return <View style={styles.container} />;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles.active,
        isSelected && styles.selected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {cell.value}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  selected: {
    backgroundColor: colors.selectedBackground,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  selectedText: {
    color: colors.accent,
  },
});

export default Cell;
