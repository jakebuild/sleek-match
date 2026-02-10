import { Cell } from '../types/game';

export const isMatch = (v1: number, v2: number): boolean => {
  return v1 === v2 || v1 + v2 === 10;
};

export const areConnected = (idx1: number, idx2: number, cells: Cell[]): boolean => {
  if (idx1 === idx2) return false;
  
  const start = Math.min(idx1, idx2);
  const end = Math.max(idx1, idx2);

  // Horizontal (Linear check)
  // Check if all cells between start and end are cleared
  let isHorizontal = true;
  for (let i = start + 1; i < end; i++) {
    if (cells[i].status !== 'cleared') {
      isHorizontal = false;
      break;
    }
  }
  if (isHorizontal) return true;

  // Vertical (Column check)
  // Must be in same column
  const col1 = start % 9;
  const col2 = end % 9;
  
  if (col1 === col2) {
    // Check if all cells between them in the column are cleared
    let isVertical = true;
    for (let i = start + 9; i < end; i += 9) {
      if (cells[i].status !== 'cleared') {
        isVertical = false;
        break;
      }
    }
    if (isVertical) return true;
  }

  return false;
};
