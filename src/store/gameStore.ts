import { create } from 'zustand';
import { GameState, Cell } from '../types/game';
import { generateLevel } from '../utils/board';
import { areConnected, isMatch, hasValidMoves, getActiveCellCount } from '../utils/gameLogic';
import { saveGameState, loadGameState, clearGameState, saveHighScore, loadHighScore } from '../utils/storage';

let nextId = 1000;

const createFreshState = () => ({
  cells: generateLevel(),
  selectedId: null as string | null,
  score: 0,
  gameStatus: 'playing' as const,
  history: [] as Array<{ cells: Cell[]; score: number }>,
});

// Try to restore previous session
const getInitialState = () => {
  const saved = loadGameState();
  const highScore = loadHighScore();

  if (saved) {
    // Compute nextId from restored cells to avoid ID collisions
    const maxId = saved.cells.reduce((max, c) => {
      const num = parseInt(c.id.replace('cell-', ''), 10);
      return isNaN(num) ? max : Math.max(max, num);
    }, 0);
    nextId = maxId + 1;

    return {
      cells: saved.cells,
      selectedId: null as string | null,
      score: saved.score,
      highScore,
      gameStatus: saved.gameStatus,
      history: saved.history,
    };
  }

  return {
    ...createFreshState(),
    highScore,
  };
};

export const useGameStore = create<GameState>((set, get) => ({
  ...getInitialState(),
  actions: {
    resetGame: () => {
      nextId = 1000;
      clearGameState();
      set({
        ...createFreshState(),
        highScore: get().highScore, // preserve high score
      });
    },

    selectCell: (id: string) => {
      const state = get();
      const { selectedId, cells, gameStatus } = state;

      if (gameStatus !== 'playing') return;

      // If no cell is selected, select the current one
      if (!selectedId) {
        set({ selectedId: id });
        return;
      }

      // If clicking the same cell, deselect it
      if (selectedId === id) {
        set({ selectedId: null });
        return;
      }

      // Find indices
      const idx1 = cells.findIndex(c => c.id === selectedId);
      const idx2 = cells.findIndex(c => c.id === id);

      if (idx1 === -1 || idx2 === -1) return;

      const cell1 = cells[idx1];
      const cell2 = cells[idx2];

      // Check for match and connectivity
      const match = isMatch(cell1.value, cell2.value);
      const connected = areConnected(idx1, idx2, cells);

      if (match && connected) {
        // Save history for undo
        const historyEntry = { cells: [...cells], score: state.score };

        // Clear cells
        const newCells = [...cells];
        newCells[idx1] = { ...cell1, status: 'cleared' as const };
        newCells[idx2] = { ...cell2, status: 'cleared' as const };

        const newScore = state.score + 1;
        const newHighScore = Math.max(newScore, state.highScore);

        // Check game status
        const activeCount = getActiveCellCount(newCells);
        let newStatus: 'playing' | 'won' | 'lost' = 'playing';

        if (activeCount === 0) {
          newStatus = 'won';
        } else if (!hasValidMoves(newCells)) {
          newStatus = 'lost';
        }

        // Persist high score if beaten
        if (newHighScore > state.highScore) {
          saveHighScore(newHighScore);
        }

        const newState = {
          cells: newCells,
          selectedId: null,
          score: newScore,
          highScore: newHighScore,
          gameStatus: newStatus,
          history: [...state.history, historyEntry],
        };

        set(newState);

        // Auto-save game state
        saveGameState({
          cells: newState.cells,
          score: newState.score,
          gameStatus: newState.gameStatus,
          history: newState.history,
        });
      } else {
        // Invalid match, switch selection to new cell
        set({ selectedId: id });
      }
    },

    addLines: () => {
      const state = get();
      if (state.gameStatus === 'won') return;

      // Save history for undo
      const historyEntry = { cells: [...state.cells], score: state.score };

      // Get active cells and duplicate them at the end
      const activeCells = state.cells.filter(c => c.status === 'active');
      const duplicates: Cell[] = activeCells.map(c => ({
        id: `cell-${nextId++}`,
        value: c.value,
        status: 'active' as const,
      }));

      const newCells = [...state.cells, ...duplicates];

      // Check if valid moves exist after adding lines
      const newStatus = hasValidMoves(newCells) ? 'playing' : 'lost';

      const newState = {
        cells: newCells,
        selectedId: null,
        gameStatus: newStatus as 'playing' | 'won' | 'lost',
        history: [...state.history, historyEntry],
      };

      set(newState);

      // Auto-save
      saveGameState({
        cells: newState.cells,
        score: state.score,
        gameStatus: newState.gameStatus,
        history: newState.history,
      });
    },

    undo: () => {
      const state = get();
      if (state.history.length === 0) return;

      const lastEntry = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);

      // Recheck game status after undo
      const activeCount = getActiveCellCount(lastEntry.cells);
      let newStatus: 'playing' | 'won' | 'lost' = 'playing';
      if (activeCount === 0) {
        newStatus = 'won';
      } else if (!hasValidMoves(lastEntry.cells)) {
        newStatus = 'lost';
      }

      const newState = {
        cells: lastEntry.cells,
        score: lastEntry.score,
        selectedId: null,
        gameStatus: newStatus,
        history: newHistory,
      };

      set(newState);

      // Auto-save
      saveGameState({
        cells: newState.cells,
        score: newState.score,
        gameStatus: newState.gameStatus,
        history: newState.history,
      });
    },
  },
}));

export const useGameActions = () => useGameStore((state) => state.actions);
