---
phase: 01-core-mechanics
plan: 01
type: execute
wave: 1
depends_on: []
files_modified: [package.json, src/store/gameStore.ts, src/utils/board.ts, src/types/index.ts]
autonomous: true
user_setup: []

must_haves:
  truths:
    - "Project runs with Expo SDK 52"
    - "Game state initializes with Classic 1-19 board"
    - "Store updates correctly on selection"
  artifacts:
    - path: "src/store/gameStore.ts"
      provides: "Zustand store for game state"
    - path: "src/utils/board.ts"
      provides: "Board generation logic"
  key_links:
    - from: "src/store/gameStore.ts"
      to: "src/utils/board.ts"
      via: "generateBoard function"
---

<objective>
Initialize the project structure and implement the core game logic (state management and board generation) without UI.

Purpose: Establish the foundation for the game loop.
Output: Working state store and board generation logic.
</objective>

<execution_context>
@/Users/giangnguyen/.config/opencode/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/1-core-mechanics/1-RESEARCH.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Initialize Project & Dependencies</name>
  <files>package.json, app.json, babel.config.js, tsconfig.json</files>
  <action>
    Initialize a new Expo project (blank typescript).
    Install core dependencies:
    - `zustand` + `immer` (State)
    - `react-native-mmkv` (Persistence)
    - `@shopify/flash-list` (Grid)
    - `react-native-unistyles` (Styling)
    - `expo-font` (if needed)
    
    Configure Unistyles with a dark mode theme.
  </action>
  <verify>
    Run `npx expo start` and confirm app loads (even if blank).
    Check `package.json` for dependencies.
  </verify>
  <done>
    Project compiles, dependencies installed, dark mode theme configured.
  </done>
</task>

<task type="auto">
  <name>Task 2: Implement Game Store & Board Logic</name>
  <files>src/store/gameStore.ts, src/utils/board.ts, src/types/index.ts</files>
  <action>
    1. Define `Cell` interface: `{ id: string, value: number, status: 'active' | 'cleared' }`.
    2. Implement `generateClassicBoard()` in `src/utils/board.ts`:
       - Sequence: 1-9 repeated (excluding 10) to fill ~27-30 rows? No, standard is 1-9 sequence.
       - Research says "Classic 1-19" means digits of 1-19 sequence.
       - Logic: Generate sequence [1,2,3,4,5,6,7,8,9,1,1,1,2,1,3,1,4,1,5,1,6,1,7,1,8,1,9].
    3. Create `useGameStore` in `src/store/gameStore.ts` with Zustand:
       - State: `cells: Cell[]`, `selectedId: string | null`, `score: number`.
       - Actions: `initGame()`, `selectCell(id)`.
    4. Persist state with `react-native-mmkv` middleware.
  </action>
  <verify>
    Create a test script or use `node` to import the store (if possible) or check file structure.
    Since we can't run hooks in node, verify the `generateClassicBoard` output via a temporary script.
  </verify>
  <done>
    `generateClassicBoard` returns correct sequence.
    Store initializes with populated cells.
  </done>
</task>

</tasks>

<verification>
Check that the project runs and state logic is sound.
</verification>

<success_criteria>
- [ ] Dependencies installed and configured
- [ ] Board generation produces correct "Classic" sequence
- [ ] Store handles initialization and selection action
</success_criteria>

<output>
After completion, create `.planning/phases/1-core-mechanics/1-core-mechanics-01-SUMMARY.md`
</output>
