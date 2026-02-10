import { Cell } from '../types/game';

export const generateLevel = (): Cell[] => {
  const cells: Cell[] = [];
  const totalCells = 81; // 9x9 grid

  for (let i = 0; i < totalCells; i++) {
    const value = Math.floor(Math.random() * 9) + 1; // Random 1-9
    cells.push({
      id: `cell-${i}`,
      value,
      status: 'active',
    });
  }

  return cells;
};
