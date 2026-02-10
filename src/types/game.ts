export interface Cell {
  id: string;
  value: number;
  status: 'active' | 'cleared' | 'selected';
}

export interface GameState {
  cells: Cell[];
  selectedId: string | null;
  actions: {
    resetGame: () => void;
    selectCell: (id: string) => void;
  };
}
