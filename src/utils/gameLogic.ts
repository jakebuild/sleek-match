import { Cell } from '../types/game';

export const isMatch = (v1: number, v2: number): boolean => {
  return v1 === v2 || v1 + v2 === 10;
};

const COLS = 9;

export const areConnected = (idx1: number, idx2: number, cells: Cell[]): boolean => {
  if (idx1 === idx2) return false;
  
  const start = Math.min(idx1, idx2);
  const end = Math.max(idx1, idx2);
  const diff = end - start;

  // 1. Linear check (horizontal + row wrapping)
  // All cells between start and end in flat sequence are cleared
  let allCleared = true;
  for (let i = start + 1; i < end; i++) {
    if (cells[i].status !== 'cleared') {
      allCleared = false;
      break;
    }
  }
  if (allCleared) return true;

  // 2. Vertical (same column, step = 9)
  const col1 = start % COLS;
  const col2 = end % COLS;
  
  if (col1 === col2 && diff % COLS === 0) {
    let isVertical = true;
    for (let i = start + COLS; i < end; i += COLS) {
      if (cells[i].status !== 'cleared') {
        isVertical = false;
        break;
      }
    }
    if (isVertical) return true;
  }

  // 3. Diagonal down-right (step = COLS + 1 = 10)
  // Column increases by 1 per row
  const stepDR = COLS + 1;
  if (diff % stepDR === 0) {
    const steps = diff / stepDR;
    if (col2 - col1 === steps) {
      let isDiag = true;
      for (let i = start + stepDR; i < end; i += stepDR) {
        if (cells[i].status !== 'cleared') {
          isDiag = false;
          break;
        }
      }
      if (isDiag) return true;
    }
  }

  // 4. Diagonal down-left (step = COLS - 1 = 8)
  // Column decreases by 1 per row
  const stepDL = COLS - 1;
  if (diff % stepDL === 0) {
    const steps = diff / stepDL;
    if (col1 - col2 === steps) {
      let isDiag = true;
      for (let i = start + stepDL; i < end; i += stepDL) {
        if (cells[i].status !== 'cleared') {
          isDiag = false;
          break;
        }
      }
      if (isDiag) return true;
    }
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
