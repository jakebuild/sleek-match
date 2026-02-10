import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useGameStore, useGameActions } from '../store/gameStore';
import { Cell as CellType } from '../types/game';
import CellComponent from './Cell';
import { colors } from '../theme/colors';

const GameBoard = () => {
  const cells = useGameStore((state) => state.cells);
  const selectedId = useGameStore((state) => state.selectedId);
  const hintIds = useGameStore((state) => state.hintIds);
  const { selectCell } = useGameActions();

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
      <FlashList<CellType>
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
