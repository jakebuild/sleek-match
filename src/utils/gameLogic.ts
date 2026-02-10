import { Cell } from '../types/game';

export const isMatch = (v1: number, v2: number): boolean => {
  return v1 === v2 || v1 + v2 === 10;
};

export const areConnected = (idx1: number, idx2: number, cells: Cell[]): boolean => {
  if (idx1 === idx2) return false;
  
  const start = Math.min(idx1, idx2);
  const end = Math.max(idx1, idx2);

  // Horizontal / Linear check
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

/** Check if any valid move exists on the board */
export const hasValidMoves = (cells: Cell[]): boolean => {
  const activeIndices: number[] = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].status === 'active') {
      activeIndices.push(i);
    }
  }

  for (let i = 0; i < activeIndices.length; i++) {
    for (let j = i + 1; j < activeIndices.length; j++) {
      const a = activeIndices[i];
      const b = activeIndices[j];
      if (isMatch(cells[a].value, cells[b].value) && areConnected(a, b, cells)) {
        return true;
      }
    }
  }

  return false;
};

/** Get count of active (non-cleared) cells */
export const getActiveCellCount = (cells: Cell[]): number => {
  let count = 0;
  for (const cell of cells) {
    if (cell.status === 'active') count++;
  }
  return count;
};
