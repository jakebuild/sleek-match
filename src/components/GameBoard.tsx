import React, { useMemo } from 'react';
import { StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { useGameStore, useGameActions } from '../store/gameStore';
import { Cell as CellType } from '../types/game';
import CellComponent from './Cell';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../theme/colors';

const GameBoard = () => {
  const cells = useGameStore((state) => state.cells);
  const selectedId = useGameStore((state) => state.selectedId);
  const hintIds = useGameStore((state) => state.hintIds);
  const { selectCell } = useGameActions();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const renderItem = ({ item }: ListRenderItemInfo<CellType>) => (
    <CellComponent
      cell={item}
      isSelected={item.id === selectedId}
      isHinted={hintIds != null && hintIds.includes(item.id)}
      onPress={() => selectCell(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList<CellType>
        data={cells}
        renderItem={renderItem}
        numColumns={9}
        extraData={`${selectedId}-${hintIds?.join(',')}`}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContent: {
      padding: 10,
    },
  });

export default GameBoard;
