import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useGameStore, useGameActions } from '../store/gameStore';
import { Cell as CellType } from '../types/game';
import Cell from './Cell';
import { colors } from '../theme/colors';

const GameBoard = () => {
  const cells = useGameStore((state) => state.cells);
  const selectedId = useGameStore((state) => state.selectedId);
  const { selectCell } = useGameActions();

  const renderItem = ({ item }: ListRenderItemInfo<CellType>) => (
    <Cell
      cell={item}
      isSelected={item.id === selectedId}
      onPress={() => selectCell(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlashList<CellType>
        data={cells}
        renderItem={renderItem}
        estimatedItemSize={50}
        numColumns={9}
        extraData={selectedId} // Re-render when selectedId changes
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 10,
  },
});

export default GameBoard;
