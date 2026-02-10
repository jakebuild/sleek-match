import { create } from 'zustand';
import { GameState, Cell } from '../types/game';
import { generateLevel } from '../utils/board';
import { areConnected, isMatch, hasValidMoves, getActiveCellCount } from '../utils/gameLogic';
import { saveGameState, loadGameState, clearGameState, saveHighScore, loadHighScore } from '../utils/storage';
import { findHint } from '../utils/hint';
import { setSoundEnabled, isSoundEnabled } from '../utils/sound';

let nextId = 1000;

const createFreshState = () => ({
  cells: generateLevel(),
  selectedId: null as string | null,
  score: 0,
  gameStatus: 'playing' as const,
  history: [] as Array<{ cells: Cell[]; score: number }>,
  hintIds: null as string[] | null,
  soundEnabled: isSoundEnabled(),
});

// Try to restore previous session
const getInitialState = () => {
  const saved = loadGameState();
  const highScore = loadHighScore();

  if (saved) {
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
      hintIds: null as string[] | null,
      soundEnabled: isSoundEnabled(),
    };
  }

  return {
    ...createFreshState(),
    highScore,
  };
};

const persistState = (state: {
  cells: Cell[];
  score: number;
  gameStatus: 'playing' | 'won' | 'lost';
  history: Array<{ cells: Cell[]; score: number }>;
}) => {
  saveGameState({
    cells: state.cells,
    score: state.score,
    gameStatus: state.gameStatus,
    history: state.history,
  });
};

export const useGameStore = create<GameState>((set, get) => ({
  ...getInitialState(),
  actions: {
    resetGame: () => {
      nextId = 1000;
      clearGameState();
      set({
        ...createFreshState(),
        highScore: get().highScore,
      });
    },

    selectCell: (id: string) => {
      const state = get();
      const { selectedId, cells, gameStatus } = state;

      if (gameStatus !== 'playing') return;

      // Clear hint on any selection
      if (state.hintIds) {
        set({ hintIds: null });
      }

      if (!selectedId) {
        set({ selectedId: id });
        return;
      }

      if (selectedId === id) {
        set({ selectedId: null });
        return;
      }

      const idx1 = cells.findIndex(c => c.id === selectedId);
      const idx2 = cells.findIndex(c => c.id === id);

      if (idx1 === -1 || idx2 === -1) return;

      const cell1 = cells[idx1];
      const cell2 = cells[idx2];

      const match = isMatch(cell1.value, cell2.value);
      const connected = areConnected(idx1, idx2, cells);

      if (match && connected) {
        const historyEntry = { cells: [...cells], score: state.score };

        const newCells = [...cells];
        newCells[idx1] = { ...cell1, status: 'cleared' as const };
        newCells[idx2] = { ...cell2, status: 'cleared' as const };

        const newScore = state.score + 1;
        const newHighScore = Math.max(newScore, state.highScore);

        const activeCount = getActiveCellCount(newCells);
        let newStatus: 'playing' | 'won' | 'lost' = 'playing';

        if (activeCount === 0) {
          newStatus = 'won';
        } else if (!hasValidMoves(newCells)) {
          newStatus = 'lost';
        }

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
          hintIds: null,
        };

        set(newState);
        persistState(newState);
      } else {
        set({ selectedId: id });
      }
    },

    addLines: () => {
      const state = get();
      if (state.gameStatus === 'won') return;

      const historyEntry = { cells: [...state.cells], score: state.score };

      const activeCells = state.cells.filter(c => c.status === 'active');
      const duplicates: Cell[] = activeCells.map(c => ({
        id: `cell-${nextId++}`,
        value: c.value,
        status: 'active' as const,
      }));

      const newCells = [...state.cells, ...duplicates];
      const newStatus = hasValidMoves(newCells) ? 'playing' : 'lost';

      const newState = {
        cells: newCells,
        selectedId: null,
        gameStatus: newStatus as 'playing' | 'won' | 'lost',
        history: [...state.history, historyEntry],
        hintIds: null,
        score: state.score,
      };

      set(newState);
      persistState(newState);
    },

    undo: () => {
      const state = get();
      if (state.history.length === 0) return;

      const lastEntry = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);

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
        hintIds: null,
      };

      set(newState);
      persistState(newState);
    },

    showHint: () => {
      const state = get();
      if (state.gameStatus !== 'playing') return;

      const hint = findHint(state.cells);
      if (hint) {
        const id1 = state.cells[hint.idx1].id;
        const id2 = state.cells[hint.idx2].id;
        set({ hintIds: [id1, id2], selectedId: null });
      }
    },

    toggleSound: () => {
      const current = get().soundEnabled;
      const newValue = !current;
      setSoundEnabled(newValue);
      set({ soundEnabled: newValue });
    },
  },
}));

export const useGameActions = () => useGameStore((state) => state.actions);
