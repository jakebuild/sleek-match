import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import GameBoard from './src/components/GameBoard';
import GameHeader from './src/components/GameHeader';
import GameFooter from './src/components/GameFooter';
import GameOverModal from './src/components/GameOverModal';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GameHeader />
      <GameBoard />
      <GameFooter />
      <GameOverModal />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
