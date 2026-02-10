import { create } from 'zustand';
import { GameState, Cell } from '../types/game';
import { generateLevel } from '../utils/board';
import { areConnected, isMatch } from '../utils/gameLogic';

export const useGameStore = create<GameState>((set, get) => ({
  cells: generateLevel(),
  selectedId: null,
  actions: {
    resetGame: () => set({ cells: generateLevel(), selectedId: null }),
    selectCell: (id: string) => {
      const state = get();
      const { selectedId, cells } = state;
      
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
      
      if (idx1 === -1 || idx2 === -1) return; // Should not happen
      
      const cell1 = cells[idx1];
      const cell2 = cells[idx2];
      
      // Check for match and connectivity
      const match = isMatch(cell1.value, cell2.value);
      const connected = areConnected(idx1, idx2, cells);
      
      if (match && connected) {
        // Clear cells
        const newCells = [...cells];
        newCells[idx1] = { ...cell1, status: 'cleared' };
        newCells[idx2] = { ...cell2, status: 'cleared' };
        set({ cells: newCells, selectedId: null });
      } else {
        // Invalid match, switch selection to new cell
        set({ selectedId: id });
      }
    },
  },
}));

export const useGameActions = () => useGameStore((state) => state.actions);
