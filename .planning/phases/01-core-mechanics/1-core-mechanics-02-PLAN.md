---
phase: 01-core-mechanics
plan: 02
type: execute
wave: 2
depends_on: [01]
files_modified: [src/components/GameBoard.tsx, src/utils/gameLogic.ts, App.tsx, src/components/Cell.tsx]
autonomous: true
user_setup: []

must_haves:
  truths:
    - "Grid renders 9 columns"
    - "User can select two matching numbers"
    - "Selection logic skips cleared cells"
  artifacts:
    - path: "src/components/GameBoard.tsx"
      provides: "Visual grid component"
    - path: "src/utils/gameLogic.ts"
      provides: "Matching and connectivity logic"
  key_links:
    - from: "src/components/GameBoard.tsx"
      to: "src/store/gameStore.ts"
      via: "useGameStore hook"
---

<objective>
Implement the visual grid UI and the core game interaction logic (matching, connectivity).

Purpose: Make the game playable.
Output: Rendered grid where user can tap and match numbers.
</objective>

<execution_context>
@/Users/giangnguyen/.config/opencode/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/1-core-mechanics/1-RESEARCH.md
@.planning/phases/1-core-mechanics/1-core-mechanics-01-PLAN.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Implement Connectivity Logic</name>
  <files>src/utils/gameLogic.ts</files>
  <action>
    Implement `canConnect(idxA, idxB, cells)`:
    - Check if cells are adjacent horizontally, vertically, or via wrap.
    - IMPORTANT: "Adjacent" means "no active cells in between". Skip cleared cells.
    - Research confirmed this logic.
    - Also implement `isMatch(valA, valB)`: returns true if (A==B) or (A+B==10).
    - Add to `useGameStore`: `checkMatch(idxA, idxB)` using this logic.
  </action>
  <verify>
    Write a small test script or console log various scenarios:
    - [1, null, 1] -> connected (horiz)
    - [1, 2, 1] -> not connected (blocked)
  </verify>
  <done>
    `canConnect` returns true for valid connections (skipping cleared cells).
    `isMatch` handles equal/sum=10 correctly.
  </done>
</task>

<task type="auto">
  <name>Task 2: Implement Grid UI</name>
  <files>src/components/GameBoard.tsx, src/components/Cell.tsx, App.tsx</files>
  <action>
    1. Create `Cell` component:
       - Props: `{ value, status, isSelected, onPress }`
       - Render: Text in a box. Dark mode styling (Unistyles).
       - Use `React.memo`.
       - If `status === 'cleared'`, render empty transparent view.
    2. Create `GameBoard` component:
       - Use `FlashList` with `numColumns={9}`.
       - Connect to `useGameStore` to get cells and selection state.
       - Handle `onPress` -> call `store.selectCell`.
    3. Update `App.tsx` to render `GameBoard`.
  </action>
  <verify>
    Run app. Tap cell -> should highlight.
    Tap matching cell -> should clear both (if connected).
    Tap non-matching -> should clear selection.
  </verify>
  <done>
    Grid renders 9 columns.
    Interaction works (select, match, clear).
    Cleared cells disappear visually but keep grid structure.
  </done>
</task>

</tasks>

<verification>
Play the game manually to confirm matching works.
</verification>

<success_criteria>
- [ ] Grid layout is correct (9 cols)
- [ ] Matching logic works (Equal / Sum=10)
- [ ] Connectivity logic skips empty cells
- [ ] UI updates immediately on match
</success_criteria>

<output>
After completion, create `.planning/phases/1-core-mechanics/1-core-mechanics-02-SUMMARY.md`
</output>
