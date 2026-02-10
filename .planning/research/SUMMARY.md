# Project Research Summary

**Project:** Sleek Match (Number Match/Ten Pair)
**Domain:** Mobile Puzzle Game (React Native/Expo)
**Researched:** 2026-02-10
**Confidence:** HIGH

## Executive Summary

Sleek Match is a mobile implementation of the classic "Ten Pair" or "Number Match" logic puzzle, built using the modern React Native ecosystem. Experts recommend building this type of game as a high-performance list-based application rather than using a game engine, as the core interaction is grid manipulation rather than physics or complex sprite collision. The key success factor is maintaining 60fps performance while managing a potentially infinite grid of numbers.

The recommended approach utilizes **React Native 0.76+ (New Architecture)** with **Expo SDK 52** and **Expo Router**. State management should be handled by **Zustand** for its transient update capabilities, avoiding React Context's re-rendering issues. Critical to the game's viability is the use of **@shopify/flash-list** for rendering the game board, as standard lists cannot handle the thousands of cells typical in late-game stages without significant performance degradation.

The primary risks identified are performance bottlenecks related to list rendering and game logic complexity. Naive implementations of the "match" algorithm and state updates can lead to UI freezing and battery drain. These are mitigated by using performant libraries like **react-native-mmkv** for synchronous storage, **react-native-reanimated** for non-blocking animations, and strict architectural patterns that prevent global re-renders on every user interaction.

## Key Findings

### Recommended Stack

**Core technologies:**
- **React Native 0.76+ & Expo SDK 52:** The standard for modern cross-platform apps; New Architecture enabled for performance.
- **Zustand v5+:** Minimalist state management that supports transient updates, crucial for high-frequency game loops.
- **@shopify/flash-list:** Essential replacement for FlatList to handle large grids (1000+ items) with recycling.
- **react-native-mmkv:** Fastest key-value storage for instant game resume; replaces slow AsyncStorage.
- **react-native-unistyles:** C++ based styling engine for zero-runtime overhead, superior to NativeWind for this use case.

### Expected Features

**Must have (table stakes):**
- **Core Matching Logic:** Match pairs (Equal or Sum 10) across rows and wrapped lines.
- **Add Lines:** Duplicate remaining numbers to the bottom of the grid.
- **Undo System:** Stack-based history to revert moves (critical for puzzle genre).
- **Save/Resume:** Auto-save state to prevent progress loss on backgrounding.
- **Hints:** Pathfinding algorithm to show valid moves when stuck.

**Should have (competitive):**
- **Offline First:** No network dependencies; playable anywhere (airplane mode).
- **Minimalist UI:** Clean, distraction-free "Zen" aesthetic with Dark Mode.
- **Statistics Dashboard:** Track wins, high scores, and cleared pairs.

**Defer (v2+):**
- **Leaderboards:** Global rankings (adds backend complexity).
- **Daily Challenges:** Seeded puzzles for retention.

### Architecture Approach

The system follows a **Flux-like unidirectional data flow** using Zustand.

**Major components:**
1.  **GameContainer:** Top-level layout handling initialization and navigation.
2.  **GameGrid (FlashList):** Renders the 1D array of numbers as a 9-column grid; handles layout recycling.
3.  **Zustand Store:** The single source of truth for grid state, score, and history (Undo/Redo).
4.  **Logic Layer:** Pure functions for `isValidMatch`, `findPath`, and `checkGameOver` detached from UI.

### Critical Pitfalls

1.  **Naive List Rendering:** Using `ScrollView` or `FlatList` causes massive memory usage and lag. **Fix:** Use `@shopify/flash-list`.
2.  **Global Re-render Chain:** Re-rendering the whole grid on one tap. **Fix:** Memoize `Cell` components and use stable callbacks.
3.  **Synchronous Storage Stutter:** `AsyncStorage` lags on large saves. **Fix:** Use `react-native-mmkv`.
4.  **Adjacency Scan Bottleneck:** O(N^2) hint logic blocks UI. **Fix:** Optimize algorithms and data structures.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Core Mechanics & Grid
**Rationale:** The game is unplayable without a performant grid. This is the hardest technical hurdle.
**Delivers:** A scrollable grid of numbers using FlashList that handles selection and matching logic.
**Addresses:** Core Matching Logic, Add Lines.
**Avoids:** Naive List Rendering, Global Re-render Chain.

### Phase 2: Game Loop & Persistence
**Rationale:** Once interaction works, the "game" needs rules (winning/losing) and safety (saving).
**Delivers:** Undo/Redo stack, Scoring, Game Over detection, and instant Save/Resume.
**Uses:** Zustand (Zundo middleware), react-native-mmkv.
**Avoids:** Synchronous Storage Stutter.

### Phase 3: Assistance & Polish
**Rationale:** Hints are complex to implement efficiently; animations make the game "feel" good.
**Delivers:** Hint algorithms, polished animations for clears/merges, Haptics, Audio.
**Uses:** react-native-reanimated, expo-haptics, expo-av.
**Avoids:** Adjacency Scan Bottleneck.

### Phase 4: Meta Features & Release
**Rationale:** Non-gameplay features that round out the product for store release.
**Delivers:** Settings (Dark Mode), Statistics, Onboarding/Tutorial, App Icon/Splash.
**Uses:** react-native-unistyles (theming).

### Phase Ordering Rationale

- **Grid First:** Rendering 1000+ items is the primary technical risk. If FlashList configuration fails, the project fails.
- **Logic Second:** Undo and Save states rely on a stable grid data structure.
- **Polish Third:** Algorithms for hints are easier to tune once the core loop is stable.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (Hints):** The pathfinding algorithm for "wrap-around" matching is non-trivial and may need specific algorithm research (BFS/A* variations).

Phases with standard patterns (skip research-phase):
- **Phase 1 (Grid):** FlashList docs are clear.
- **Phase 2 (Persistence):** MMKV and Zustand patterns are well-established.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Expo SDK 52 and React Native New Architecture are stable standards. |
| Features | HIGH | Genre is well-defined; competitor feature sets are clear. |
| Architecture | HIGH | Flux/Zustand pattern is ideal for this complexity level. |
| Pitfalls | HIGH | Performance issues with large lists in RN are well-documented. |

**Overall confidence:** HIGH

### Gaps to Address

- **Grid Generation Algorithm:** Research didn't specify the exact algorithm to ensure a solvable initial board (though "Add Lines" makes most boards solvable eventually).
- **Audio Assets:** No specific source for "Zen" sound effects was identified.

## Sources

### Primary (HIGH confidence)
- **Expo SDK 52 Release Notes:** Confirmed New Architecture default.
- **Shopify FlashList Docs:** Validated performance benefits for large lists.
- **Easybrain Number Match:** Competitor analysis for feature baseline.
- **React Native Directory:** Library health and maintenance status.

### Secondary (MEDIUM confidence)
- **Community Benchmarks:** Performance comparisons of Unistyles vs NativeWind.

---
*Research completed: 2026-02-10*
*Ready for roadmap: yes*
