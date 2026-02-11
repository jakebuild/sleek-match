import React, { useMemo } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import GameHeader from '../components/GameHeader';
import GameBoard from '../components/GameBoard';
import GameFooter from '../components/GameFooter';
import GameOverModal from '../components/GameOverModal';
import { useTheme } from '../theme/ThemeContext';
import { ThemeColors } from '../theme/colors';

const GameScreen = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container}>
      <GameHeader />
      <GameBoard />
      <GameFooter />
      <GameOverModal />
    </SafeAreaView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

export default GameScreen;
