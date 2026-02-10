# Stack Research

**Domain:** Mobile Puzzle Game (React Native/Expo)
**Researched:** 2026-02-10
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **React Native** | 0.76+ | Core Framework | New Architecture enabled by default; massive performance gains with Bridgeless mode and TurboModules. |
| **Expo SDK** | 52 | Platform | Standard for modern RN. `expo-dev-client` allows native code while keeping managed workflow benefits. |
| **Expo Router** | v4 | Navigation | File-based routing standard in 2025. Deep linking out-of-the-box. Built on React Navigation v7 but simpler. |
| **Zustand** | v5+ | State Management | Minimalist, unopinionated, and high-performance. Avoids Redux boilerplate. Perfect for game state. |
| **react-native-mmkv** | Latest | Persistence | Fastest key-value storage available (C++). Synchronous, unlike AsyncStorage. Critical for instant game resume. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **react-native-unistyles** | v3+ | Styling | **Critical for 60fps.** C++ based engine, zero runtime overhead on re-renders. superior to NativeWind for game loops. |
| **@shopify/flash-list** | Latest | List Rendering | Replaces FlatList. Recycles views more efficiently. Essential for the 9-column grid to maintain 60fps. |
| **react-native-reanimated** | v3/v4 | Animations | Runs animations on UI thread. Essential for game mechanics (tile movements, clears) without JS thread blocking. |
| **react-native-gesture-handler**| Latest | Gestures | Best-in-class native gesture handling. Works seamlessly with Reanimated. |
| **expo-av** | Latest | Audio | Reliable standard for SFX/Music in SDK 52. `expo-audio` is promising but currently Beta/Unstable. |
| **expo-haptics** | Latest | Haptics | Crucial for "game feel" (tile selection, clear feedback). |
| **lucide-react-native** | Latest | Icons | SVG-based, tree-shakeable, and cleaner aesthetic than FontAwesome. Fits "Sleek" design. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **Expo Go** | Quick prototyping | Good for initial UI, but switch to **Development Build** immediately for native modules (MMKV, etc). |
| **React Native IDE** | Modern Editor | Optional but recommended over VS Code plain setup for 2025. |
| **Bun** or **Yarn** | Package Manager | Bun is faster for installs, but Yarn is standard in Expo docs. |

## Installation

```bash
# Core & Navigation
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# State & Storage
npm install zustand react-native-mmkv

# UI & Animation
npm install react-native-unistyles @shopify/flash-list react-native-reanimated react-native-gesture-handler
npx expo install expo-haptics expo-av expo-font lucide-react-native react-native-svg
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| **Unistyles** | **NativeWind v4** | If you *must* use Tailwind syntax and are okay with slight runtime overhead. Uniwind is another option but newer. |
| **Zustand** | **Redux Toolkit** | If state becomes extremely complex with many side effects (unlikely for this game genre). |
| **FlashList** | **FlatList** | Only for very short, non-interactive lists (< 20 items). FlashList is safer default. |
| **expo-av** | **expo-audio** | If you want to test the cutting edge SDK 52 feature, but accept Beta stability risks. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **AsyncStorage** | Asynchronous and slow. Causes visible delay on app hydration (loading saved game). | **react-native-mmkv** |
| **React Context** | Re-renders entire subtree on updates. Kills performance in high-frequency game loops. | **Zustand** (with selectors) |
| **Lottie** | Too heavy for simple tile interactions. | **Reanimated** |
| **react-native-game-engine** | Overkill for a static grid puzzle. Adds unnecessary complexity. | **React State + Reanimated** |

## Stack Patterns by Variant

**If building the Game Grid:**
- Use **FlashList** with `numColumns={9}`.
- Because it handles recycling of 100+ tile cells significantly better than a mapped View or FlatList, preventing frame drops during rapid scrolling or updates.

**If managing Game Loop (Timer/Score):**
- Use **Zustand** store outside components.
- Because it allows modifying state without triggering unnecessary React renders, only updating subscribed components (e.g., ScoreBoard).

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| **react-native-reanimated** | **Expo SDK 52** | Ensure you use the version compatible with the specific RN version in SDK 52. |
| **expo-router** | **react-native-screens** | Strictly coupled versions. rely on `npx expo install` to match them. |

## Sources

- **Expo SDK 52 Release Notes** — Confirmed New Architecture default and `expo-audio` Beta status.
- **Unistyles Docs/Benchmarks** — Verified C++ engine performance advantage over NativeWind for 2025 high-perf requirements.
- **React Native Directory** — Verified library popularity and maintenance status.
