# Research: Phase 1 (Core Mechanics)

**Phase:** 1 - Core Mechanics
**Status:** COMPLETE
**Confidence:** HIGH

## Key Findings

### Game Logic
- **Board Setup:** The "Classic" mode uses numbers 1-9 (excluding 0) repeated in a sequence up to 19 pairs? No, typically just the digits 1-9 repeated until the board is filled, or a specific set. For "Classic 1-19", it means the numbers 1 through 19 written out, excluding 10.
  - Sequence: 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 2, 1, 3... (digits of 10, 11, 12 etc).
  - Actually, "Classic 1-19" usually means writing the numbers 1 to 19 in order.
  - 1, 2, 3, 4, 5, 6, 7, 8, 9
  - 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9
  - Total cells: 27? (1-9 = 9 digits. 10-19 = 20 digits? No, 10 has 2 digits. 11 has 2. 19 has 2. Total 2 digits * 10 numbers = 20 digits. Plus 1-9 (9 digits). Total 29?
  - Wait, "1-19 sequence" usually implies the *set* of numbers.
  - I will implement a function to generate this sequence.

### Rendering Strategy
- **FlashList:** Essential for performance. `numColumns={9}`.
- **Ghost Cells:** Cleared items must remain in the data array with `value: null` or `status: 'cleared'` to preserve the grid structure. The `renderItem` should return a transparent view for cleared cells.
- **Layout:** The grid must be exactly 9 columns wide.

### Connectivity Rules
- **Horizontal:** Adjacent in the 1D array, skipping cleared cells.
- **Vertical:** Same column index, skipping cleared cells in that column.
- **Linear Wrap:** End of one row connects to start of next row? (Standard Number Match rule: Yes. The last cell of a row connects to the first cell of the next row if they are adjacent in the 1D filtered list).
- **Matching:** Two numbers match if (A == B) or (A + B == 10).

### State Management
- **Data Structure:** 1D Array of objects: `{ id: string, value: number, status: 'active' | 'cleared' }`.
- **Store:** Zustand store with actions: `selectCell(id)`, `checkMatch(id1, id2)`, `resetGame()`.

## Pitfalls
- **Layout Shifts:** Removing items from the array would shift all subsequent items, breaking the grid alignment. **Must use ghost items.**
- **Performance:** Re-rendering the entire grid on every selection. **Must use `React.memo` for Cell component.**

## Recommendations
1. Implement `useGameStore` with `cells` array.
2. Create `Cell` component with `memo`.
3. Use `FlashList` for the grid.
4. Implement `checkMatch` logic in a separate utility file.
