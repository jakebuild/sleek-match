---
phase: 02-game-loop-persistence
plan: 02
type: execute
wave: 2
depends_on: [01]
files_modified: [src/store/gameStore.ts, src/utils/storage.ts, src/types/game.ts, App.tsx]
autonomous: true
user_setup: []

must_haves:
  truths:
    - "Game state persists to MMKV on every state change"
    - "App restores game state on launch"
    - "High score updates when current score exceeds it"
    - "High score persists across app restarts"
  artifacts:
    - path: "src/utils/storage.ts"
      provides: "MMKV wrapper for game state and high score"
  key_links:
    - from: "src/store/gameStore.ts"
      to: "src/utils/storage.ts"
      via: "Zustand subscribe middleware"
---

<objective>
Add MMKV-based persistence for game state (auto-save/restore) and high score tracking.

Purpose: Let users close the app and resume exactly where they left off. Track personal best.
Output: Game state survives app restarts. High score displayed and persisted.
</objective>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/02-game-loop-persistence/2-game-loop-01-PLAN.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create MMKV storage utility</name>
  <files>src/utils/storage.ts</files>
  <action>
    1. Import and create MMKV instance:
       ```ts
       import { MMKV } from 'react-native-mmkv';
       const storage = new MMKV();
       ```

    2. Create typed helper functions:
       - `saveGameState(state)` - serialize and store cells, score, history, gameStatus
       - `loadGameState()` - deserialize and return saved state, or null if none
       - `clearGameState()` - remove saved game state
       - `saveHighScore(score: number)` - store high score
       - `loadHighScore()` - return saved high score (default 0)

    3. Use JSON serialization for complex objects.
    4. Key names: `game_state`, `high_score`
  </action>
  <verify>
    Storage functions work without errors. Can save and load a test object.
  </verify>
  <done>
    MMKV storage utility created with save/load/clear for game state and high score.
  </done>
</task>

<task type="auto">
  <name>Task 2: Integrate persistence into store</name>
  <files>src/store/gameStore.ts, src/types/game.ts</files>
  <action>
    1. **Add `highScore: number` to GameState.**

    2. **On store creation:**
       - Try `loadGameState()` to restore previous session
       - If found, use restored state as initial state instead of generateLevel()
       - Load high score from `loadHighScore()`

    3. **Auto-save via Zustand subscribe:**
       - After store creation, subscribe to state changes
       - On every change, call `saveGameState()` with current cells, score, history, gameStatus
       - Skip saving the `actions` property

    4. **High score update:**
       - After each match (in selectCell), check if score > highScore
       - If so, update highScore in state and call `saveHighScore()`
       - Also check on game won

    5. **On resetGame:**
       - Call `clearGameState()` to remove saved state
       - Do NOT clear high score

    6. **Display high score in GameHeader:**
       - Show "Best: {highScore}" next to "Score: {score}"
  </action>
  <verify>
    1. Play game, close app (Ctrl+C expo), restart → game resumes where left off
    2. Score beats high score → high score updates
    3. Reset game → high score persists, game state cleared
  </verify>
  <done>
    Full persistence working. Game state auto-saves. High score persists. Resume on launch works.
  </done>
</task>

</tasks>

<verification>
1. Start fresh, play, close app, restart → exact state restored
2. Beat high score → new high score displayed
3. Reset → fresh board, high score remains
</verification>

<success_criteria>
- [ ] Game state auto-saves on every move
- [ ] App resumes exactly where left off
- [ ] High score updates when beaten
- [ ] High score persists across restarts
- [ ] Reset clears game state but preserves high score
</success_criteria>

<output>
After completion, create `.planning/phases/02-game-loop-persistence/2-game-loop-02-SUMMARY.md`
</output>
