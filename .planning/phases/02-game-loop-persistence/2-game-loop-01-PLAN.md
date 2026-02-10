---
phase: 02-game-loop-persistence
plan: 01
type: execute
wave: 1
depends_on: []
files_modified: [src/utils/gameLogic.ts, src/store/gameStore.ts, src/types/game.ts, src/components/GameHeader.tsx, src/components/GameFooter.tsx, src/components/GameOverModal.tsx, App.tsx]
autonomous: true
user_setup: []

must_haves:
  truths:
    - "Add Lines duplicates remaining active numbers to the bottom"
    - "Game detects Win (all cleared) and no-valid-moves states"
    - "Undo reverts the last match"
    - "Score tracks number of matched pairs"
  artifacts:
    - path: "src/utils/gameLogic.ts"
      provides: "hasValidMoves detection"
    - path: "src/components/GameHeader.tsx"
      provides: "Score display and title"
    - path: "src/components/GameFooter.tsx"
      provides: "Action buttons (Add Lines, Undo, Reset)"
    - path: "src/components/GameOverModal.tsx"
      provides: "Win/Lose overlay"
  key_links:
    - from: "src/components/GameFooter.tsx"
      to: "src/store/gameStore.ts"
      via: "useGameStore hook"
---

<objective>
Implement the full game loop: Add Lines, Win/Lose detection, Undo, Reset, and game UI (header with score, footer with action buttons, game over modal).

Purpose: Make the game a complete playable session.
Output: User can play from start to Win/Lose, undo mistakes, add lines, reset, and see their score.
</objective>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/01-core-mechanics/1-core-mechanics-02-SUMMARY.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Expand game types and logic</name>
  <files>src/types/game.ts, src/utils/gameLogic.ts</files>
  <action>
    1. Update `GameState` interface:
       - Add `score: number` (count of matched pairs)
       - Add `gameStatus: 'playing' | 'won' | 'lost'`
       - Add `history: Array<{ cells: Cell[], score: number }>` for undo (last N states, start with 1)
       - Add new actions: `addLines`, `undo`, `checkGameStatus`

    2. In `gameLogic.ts`, add `hasValidMoves(cells: Cell[]): boolean`:
       - Iterate all pairs of active cells
       - Check if any pair is both a match AND connected
       - Return true if at least one valid move exists
       - Optimization: early return on first found valid move

    3. In `gameLogic.ts`, add `getActiveCells(cells: Cell[]): Cell[]`:
       - Returns array of cells that are still active (not cleared)
  </action>
  <verify>
    Ensure `hasValidMoves` returns false when no moves exist and true when they do.
  </verify>
  <done>
    Types updated. hasValidMoves correctly detects valid/invalid board states.
  </done>
</task>

<task type="auto">
  <name>Task 2: Implement store actions (Add Lines, Undo, Reset, Game Status)</name>
  <files>src/store/gameStore.ts</files>
  <action>
    1. **Add Lines (`addLines`):**
       - Get all active (non-cleared) cells
       - Append duplicates to the end of the cells array with new IDs
       - Keep `status: 'active'` for duplicated cells
       - After adding, check if valid moves now exist

    2. **Undo (`undo`):**
       - Before each match in `selectCell`, push current `{ cells, score }` to history
       - On undo, pop last history entry and restore state
       - If no history, do nothing

    3. **Reset (`resetGame`):**
       - Already exists, but also clear history and set score to 0 and gameStatus to 'playing'

    4. **Check Game Status (`checkGameStatus`):**
       - If all cells cleared → gameStatus = 'won'
       - If no valid moves → gameStatus = 'lost' (user can still Add Lines or Reset)
       - Call this after every match

    5. **Score:**
       - Increment score by 1 on each successful match
  </action>
  <verify>
    Play through: match pairs (score goes up), undo (reverts), add lines (adds rows), clear all (win).
  </verify>
  <done>
    All store actions work correctly. Score tracks. Undo reverts. Add Lines appends. Game status updates.
  </done>
</task>

<task type="auto">
  <name>Task 3: Create Game UI components</name>
  <files>src/components/GameHeader.tsx, src/components/GameFooter.tsx, src/components/GameOverModal.tsx, App.tsx</files>
  <action>
    1. **GameHeader:**
       - Title: "Sleek Match"
       - Score display: "Score: {score}"
       - Minimal dark mode styling, clean typography

    2. **GameFooter:**
       - Three buttons: "Add Lines", "Undo", "New Game"
       - Use TouchableOpacity with dark mode styling
       - Undo disabled when history is empty
       - Add Lines disabled when gameStatus !== 'playing'

    3. **GameOverModal:**
       - Semi-transparent overlay
       - Shows "You Win!" or "No Moves Left" message
       - Shows final score
       - "New Game" button
       - "Add Lines" button (only on 'lost' state, allowing player to continue)

    4. **Update App.tsx:**
       - Add GameHeader above GameBoard
       - Add GameFooter below GameBoard
       - Render GameOverModal conditionally
  </action>
  <verify>
    App displays header with score, footer with working buttons, and modal on game over.
  </verify>
  <done>
    Complete game UI with header, footer, and game over modal.
  </done>
</task>

</tasks>

<verification>
Play a complete game session: match pairs, see score update, undo a move, add lines, play to win or encounter no-moves state, see game over modal, start new game.
</verification>

<success_criteria>
- [ ] Add Lines duplicates remaining numbers to bottom
- [ ] Win detection when all cells cleared
- [ ] No-moves detection when no valid pairs exist
- [ ] Undo reverts the last match
- [ ] Score tracks matched pairs
- [ ] Game over modal shows appropriate message
- [ ] Reset starts fresh game
</success_criteria>

<output>
After completion, create `.planning/phases/02-game-loop-persistence/2-game-loop-01-SUMMARY.md`
</output>
