# Architecture Patterns

**Domain:** Grid-based Puzzle Game (Number Match / Ten Pair)
**Researched:** 2026-02-10

## Recommended Architecture

The system follows a **Flux-like unidirectional data flow** using **Zustand** for state management, with a **component-based UI** structured around a high-performance list renderer.

### Core Architecture Diagram

```mermaid
graph TD
    Store[Zustand Store] -->|State Updates| GameScreen
    GameScreen -->|Props| Header[HUD / Header]
    GameScreen -->|Data Slice| Grid[Game Grid (FlashList)]
    Grid -->|Cell Data| Cell[Cell Component]
    
    Cell -->|OnPress Action| Store
    Header -->|Undo/Hint Action| Store
    
    subgraph Logic Layer
        Validator[Match Validator]
        Pathfinder[Connectivity Logic]
        Generator[Board Generator]
    end
    
    Store -.->|Validates Move| Validator
    Validator -.->|Checks Path| Pathfinder
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `GameContainer` | Top-level layout, initializes game state, handles navigation. | `useGameStore`, Navigation |
| `GameGrid` | Renders the scrollable grid using `FlashList`. Handles layout configuration (9 columns). | `Cell`, `useGameStore` |
| `Cell` | Renders individual number/status. **Must be memoized** to prevent grid-wide re-renders. | `useGameStore` (actions) |
| `HUD` | Displays score, current level, and action buttons (Undo, Hint, Add Lines). | `useGameStore` (selectors) |
| `GameOverModal` | Displays end-game stats and "Revive/Restart" options. | `useGameStore` |

### Data Flow

**State Management:** `Zustand` + `Immer` + `Zundo`
- **Why:** 
  - **Zustand:** Minimal boilerplate, transient updates (doesn't trigger full react render cycle if not needed).
  - **Immer:** Simplifies complex array mutations (crucial for "Add Lines" and cell updates).
  - **Zundo:** Built-in, robust Undo/Redo middleware essential for puzzle games.

**Store Structure:**
```typescript
interface GameState {
  grid: CellData[];        // 1D array of { value, status, id }
  selectedId: string | null;
  history: HistoryState;   // Managed by Zundo
  score: number;
  
  // Actions
  selectCell: (id: string) => void;
  checkMatch: () => void;
  addLines: () => void;
  undo: () => void;
}
```

## Patterns to Follow

### Pattern 1: 1D Array as Source of Truth
**What:** Store the grid as a flat 1D array, not a 2D matrix.
**When:** Always. The "Add Lines" feature appends data to the end, and the "Wrap-around" match logic treats the board as a continuous sequence.
**Example:**
```typescript
// Good
const grid = [1, 5, 3, 9, 2, ...]; // Index = Row * 9 + Col

// Bad
const grid = [[1, 5, ...], [3, 9, ...]]; // Hard to "wrap" logic
```

### Pattern 2: Selective Rendering (Performance)
**What:** Use `React.memo` for Cells and `FlashList` for the Grid.
**When:** Rendering potentially 1000+ cells.
**Rationale:** A naive `map` render will lag on low-end Android devices when the grid grows. `FlashList` recycles views.
**Example:**
```tsx
const Cell = React.memo(({ value, status, onPress }) => {
  return <TouchableOpacity onPress={onPress}... />;
}, (prev, next) => prev.status === next.status && prev.selected === next.selected);
```

### Pattern 3: Connectivity Logic (The "Skip" Algorithm)
**What:** Separated pure functions to validate paths.
**When:** Validating a user's selection of two cells.
**Logic:**
1.  **Horizontal:** Slice array `grid[min..max]`. Check if all intermediates are `CLEARED`.
2.  **Vertical:** Calculate `col_index`. Iterate `grid[i]` where `i % 9 === col_index`. Check intermediates.
3.  **Diagonal:** Calculate slope. Step through indices `i += (9 + 1)` (TL-BR) or `i += (9 - 1)` (TR-BL).

## Anti-Patterns to Avoid

### Anti-Pattern 1: Derived State in Components
**What:** Calculating "Is Match?" inside the `Cell` component.
**Why bad:** Causes logic fragmentation and unnecessary re-renders.
**Instead:** Dispatch `selectCell(id)` to the store; let the store compute the match and update the `status` of affected cells.

### Anti-Pattern 2: Deep Object Nesting in State
**What:** Storing cells as `{ position: { x, y }, data: { val: 5 } }`.
**Why bad:** Complexity for the "Add Lines" reflow (positions change).
**Instead:** Store flat data. Position is derived from the **index** in the array.

## Scalability Considerations

| Concern | At 100 cells | At 10K cells | At 100K cells |
|---------|--------------|--------------|---------------|
| **Rendering** | Standard `FlatList` / `View` map | **Must use `FlashList`** | `FlashList` + Windowing |
| **Logic (Hint)** | Brute force O(N^2) | **Web Worker** or Time-slicing | Spatial Hashing / Worker |
| **State** | Single object | **Immer** patches | Database / Persistence |

*Note: Number Match games rarely exceed 2-3k cells before game over or clear.*

## Suggested Build Order

1.  **Core Logic:** Implement `isValidMatch(a, b, grid)` and `findPath(a, b, grid)` pure functions.
2.  **State Shell:** Set up Zustand with `Zundo` and a basic static grid.
3.  **Grid Renderer:** Implement `FlashList` rendering of the store data.
4.  **Interaction Loop:** Connect `onPress` -> `selectCell` -> `checkMatch` -> Update Grid.
5.  **Add Lines:** Implement the logic to copy active numbers and append to grid.
6.  **Refinement:** Add animations, Hint system, and persistence.

## Sources

- React Native FlashList Documentation
- Zustand + Zundo Documentation
- Common "Number Match" Algorithm Analysis
