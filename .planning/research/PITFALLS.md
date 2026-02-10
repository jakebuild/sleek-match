# Pitfalls Research

**Domain:** React Native Puzzle Game (Number Match)
**Researched:** 2026-02-10
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: The "Naive List" Rendering Trap

**What goes wrong:**
Using `ScrollView` with `.map()` or a standard `FlatList` for the main game grid. As the game progresses and the user "Adds Lines," the number of items can grow into the thousands. This causes massive memory usage, slow initial rendering, and choppy scrolling.

**Why it happens:**
Developers underestimate the potential size of a Number Match grid. They assume it will stay small (like Sudoku), but the "Add Lines" mechanic can double the board size repeatedly. Standard lists render too many off-screen items or fail to recycle views efficiently.

**How to avoid:**
Use `@shopify/flash-list`. It is strictly necessary for this game type.
- Configure `estimatedItemSize` accurately (height of one row).
- Use `numColumns={9}` directly in the list component.
- Avoid nesting lists.

**Warning signs:**
- Frame drops when scrolling a game with >500 numbers.
- "Blank spaces" appearing during fast scrolls.
- deeply nested component warnings.

**Phase to address:**
Phase 1 (Core Mechanics) - The choice of list component must be correct from Day 1.

---

### Pitfall 2: The "Global Re-render" Chain

**What goes wrong:**
Selecting or clearing a number triggers a re-render of the entire grid. With 1,000 cells, this causes a visible 200ms+ delay between tap and feedback, making the game feel sluggish.

**Why it happens:**
Passing the entire `grid` array to the list component or using a simple `useState` that updates the whole array reference, combined with cells that are not memoized. React sees a new array reference and re-renders every child.

**How to avoid:**
1. **Memoize Cells:** Wrap the `Cell` component in `React.memo`.
2. **Stable Callbacks:** Use `useCallback` for the `onPress` handler passed to cells.
3. **Granular Updates:** Consider state management that supports granular updates (like Zustand with selectors) or ensure the `Cell` only re-renders if *its specific data* (value/status) changes.
4. **Item Keying:** Use stable, unique IDs for numbers, not array indices (crucial because items move/delete).

**Warning signs:**
- Tapping a number has a perceptible lag before it highlights.
- The JS FPS meter drops to <15 during interaction.
- React DevTools Profiler shows "Did not change" for 999/1000 cells but they rendered anyway.

**Phase to address:**
Phase 1 (Core Mechanics) - State architecture needs to support high-frequency updates.

---

### Pitfall 3: The "Synchronous Storage" Stutter

**What goes wrong:**
The game freezes for a few frames after every move.

**Why it happens:**
Persisting the entire game state (which can be large) to `AsyncStorage` immediately after every state change. `AsyncStorage` is asynchronous but the serialization (`JSON.stringify`) of a large array happens on the JS thread, blocking the UI.

**How to avoid:**
1. **Use MMKV:** Switch to `react-native-mmkv` for synchronous, high-performance storage that is significantly faster than AsyncStorage.
2. **Debounce Saves:** Don't save on every tap. Save 1 second after the last action, or on `AppState` change (backgrounding).
3. **Differential Saving:** Only save what changed (though hard for a flat list game, full state dump is usually easier if fast enough).

**Warning signs:**
- The animation of clearing a pair stutters.
- UI becomes unresponsive for a split second after a move.

**Phase to address:**
Phase 2 (Game Loop & State) - Persistence strategy.

---

### Pitfall 4: The "Adjacency Scan" Bottleneck

**What goes wrong:**
The "Hint" feature or "No Moves Left" check takes increasingly longer as the board grows, eventually freezing the UI.

**Why it happens:**
The logic to find matching pairs often involves a naive O(N^2) scan or inefficient pathfinding through "cleared" cells. In Number Match, "adjacent" means "next non-cleared number", which might be 100 cells away if a massive block was cleared. Repeatedly scanning this on the JS thread blocks the bridge.

**How to avoid:**
1. **Efficient Data Structures:** Maintain a secondary structure (like a doubly linked list or cached "next valid index" map) alongside the grid.
2. **Offload Logic:** Run the heavy "check all moves" algorithm in a non-blocking way (e.g., `InteractionManager.runAfterInteractions` or a separate worker if truly massive).
3. **Incremental Checks:** Update the "available moves" count incrementally when a pair is cleared, rather than recalculating from scratch.

**Warning signs:**
- The "Hint" button takes seconds to respond.
- The game freezes when adding new lines (which triggers a re-check of valid moves).

**Phase to address:**
Phase 3 (Game Logic Refinement) - Algorithm optimization.

---

### Pitfall 5: The "Unbounded Growth" Crash

**What goes wrong:**
The app crashes with an Out of Memory (OOM) error after a long session.

**Why it happens:**
The "Add Lines" mechanic allows the board to grow indefinitely. React Native's bridge and list virtualization have limits. Rendering 10,000+ views (even virtualized) creates a massive shadow tree in memory.

**How to avoid:**
1. **Hard Limits:** Implement a maximum board size (e.g., 2,000 active numbers). Disable "Add Lines" or force a "Game Over/Reshuffle" when hit.
2. **Clean Up:** Aggressively remove fully empty rows from the data structure, not just hide them.
3. **Pagination:** If the game *must* be infinite, implement windowing where top cleared rows are discarded from memory entirely.

**Warning signs:**
- Memory usage climbs steadily (monitor in Xcode/Android Studio).
- Crashes on lower-end Android devices.

**Phase to address:**
Phase 4 (Polish & Optimization) - Stress testing and limits.

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| **Using `index` as Key** | Fast implementation, no ID generation | **Breaks Animations & State:** When rows are removed, React loses track of which cell is which, leading to wrong numbers being highlighted or cleared. | **NEVER** in this game type. |
| **Inline Styles** | Quick styling | **Performance:** Creates new style objects on every render, adding garbage collection pressure in a list of 1000 items. | Prototyping only. |
| **Logic in View Component** | Easy access to props | **Tightly Coupled:** Hard to unit test the game logic (finding matches, checking adjacency) without rendering the UI. | Simple MVP, but refactor early. |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| **Ads (AdMob/Unity)** | Loading ads *during* gameplay | Pre-load ads during menu/pause. Showing an interstitial during a high-concentration moment kills retention. |
| **Haptics** | Using heavy vibration for every tap | Use `expo-haptics` `ImpactFeedbackStyle.Light`. Heavy vibration on every number selection fatigues the user's hand. |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | Scale Threshold |
|------|----------|------------|-----------------|
| **Filtering Array for Render** | Lag during render | Don't do `data.filter(...)` inside the `render` or component body. Memoize the derived data. | >100 items |
| **Heavy SVG in List** | Scroll stutter | Use simple Views/Text or rasterized images/fonts for the numbers. 1000 SVGs is heavy. | >50 items |
| **Console Logs in Loop** | massive slowdowns | Remove `console.log` from render cycles and touch handlers in production. | Always |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| **Client-Side High Score** | Cheating | If leaderboards matter, validate the "game over" payload (moves made, time taken) on the server. Don't just accept "Score: 9999". |
| **Unprotected Save File** | Save scumming | If the game has "lives" or currency, sign the save file or use secure storage to prevent editing. |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| **Tiny Touch Targets** | Frustration (mis-taps) | Ensure cells are at least 44x44pt. Use `HitSlop` if visual design requires smaller numbers. |
| **Invisible Logic** | Confusion | "Why didn't that match?" Visual feedback is crucial. Draw a line or highlight the path when a match is made. |
| **No Undo** | Rage quit | Accidental taps happen constantly. "Undo" is a table-stakes feature for puzzle games. |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **State Restoration:** Does the game resume exactly where left off after the app is killed and restarted?
- [ ] **Edge Case Matching:** Does the logic correctly identify matches that wrap from the end of one row to the start of the next?
- [ ] **Empty Row Handling:** Does the UI correctly collapse or handle rows that become fully empty?
- [ ] **End Game State:** Does the game actually detect when *no more moves* are possible (including after adding lines)?

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| **Wrong List Component** | HIGH | Rewrite the main `GameBoard` component to use `FlashList`. Migration is usually straightforward but props differ. |
| **Performance Lag** | MEDIUM | Profile with Flipper/React DevTools. Move logic to `runAfterInteractions`. Memoize cells. |
| **Broken Save State** | HIGH | Version your save files. If a save is corrupt/incompatible, gracefully reset to a new game rather than crashing on boot. |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| **Naive List Rendering** | Phase 1: Core Mechanics | Scroll test with 1000 items maintaining 60fps. |
| **Global Re-render** | Phase 1: Core Mechanics | FlashList "re-renders" count is low during interaction. |
| **Adjacency Scan Bottleneck** | Phase 2: Game Logic | "Hint" calculation takes <16ms on low-end device. |
| **Synchronous Storage** | Phase 2: Persistence | No UI freeze when backgrounding app. |
| **Unbounded Growth** | Phase 3: Polish | Game handles 2000 items without crash; limits enforced. |

## Sources

- [Shopify FlashList Documentation](https://shopify.github.io/flash-list/)
- [React Native Performance: Optimizing FlatList Configuration](https://reactnative.dev/docs/optimizing-flatlist-configuration)
- [React Native MMKV vs AsyncStorage Benchmarks](https://github.com/mrousavy/react-native-mmkv)
- [Common React Native Game Development Pitfalls](https://reactnative.dev/docs/performance)
