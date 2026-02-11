import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import GameHeader from '../components/GameHeader';
import GameBoard from '../components/GameBoard';
import GameFooter from '../components/GameFooter';
import GameOverModal from '../components/GameOverModal';
import { colors } from '../theme/colors';

const GameScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GameHeader />
      <GameBoard />
      <GameFooter />
      <GameOverModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default GameScreen;
