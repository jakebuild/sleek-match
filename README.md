# Sleek Match

A minimalist, offline-first Number Match puzzle game built with Expo. Players clear the board by matching pairs of equal numbers or sums of 10, with smooth animations, light/dark theming, and a clean settings experience.

## Features

- **Core Gameplay**: 9-column grid with classic Number Match / Ten Pair logic.
- **Matching Rules**: Match equal numbers or pairs that sum to 10.
- **Connectivity**: Matches work horizontally, vertically, and diagonally (skipping cleared cells).
- **Theming**: Support for Light Mode, Dark Mode, and System Default.
- **Offline-First**: 100% functional without an internet connection.
- **Persistence**: Game state and high scores are saved locally using MMKV.
- **Helpers**: Undo and Hint functionality to assist gameplay.
- **Feedback**: Smooth 60fps animations and audio feedback.

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Storage**: [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **Styling**: React Native StyleSheet with dynamic theming.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo Go app on your mobile device or an emulator.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jakebuild/sleek-match.git
   cd sleek-match
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Scan the QR code with Expo Go (Android) or the Camera app (iOS) to run the project.

## Project Structure

- `src/components`: Reusable UI components (GameBoard, Cell, etc.).
- `src/screens`: Main application screens (GameScreen, SettingsScreen).
- `src/store`: Zustand stores for game state and theme preferences.
- `src/theme`: Color palettes and theme context.
- `src/utils`: Game logic, board generation, storage helpers, and sound management.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
