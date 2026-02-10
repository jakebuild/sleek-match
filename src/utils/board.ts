import { Cell } from '../types/game';

export const generateLevel = (): Cell[] => {
  const cells: Cell[] = [];
  let idCounter = 0;

  // 1-9
  for (let i = 1; i <= 9; i++) {
    cells.push({
      id: `cell-${idCounter++}`,
      value: i,
      status: 'active',
    });
  }

  // Digits of 10-19
  for (let i = 10; i <= 19; i++) {
    const digits = i.toString().split('').map(Number);
    digits.forEach(digit => {
      cells.push({
        id: `cell-${idCounter++}`,
        value: digit,
        status: 'active',
      });
    });
  }

  return cells;
};
