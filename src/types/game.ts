export interface Cell {
  id: string;
  value: number;
  status: 'active' | 'cleared';
}

export interface HistoryEntry {
  cells: Cell[];
  score: number;
}

export interface GameActions {
  resetGame: () => void;
  selectCell: (id: string) => void;
  addLines: () => void;
  undo: () => void;
}

export interface GameState {
  cells: Cell[];
  selectedId: string | null;
  score: number;
  highScore: number;
  gameStatus: 'playing' | 'won' | 'lost';
  history: HistoryEntry[];
  actions: GameActions;
}
