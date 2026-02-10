import { Cell } from '../types/game';
import { isMatch, areConnected } from './gameLogic';

export interface HintPair {
  idx1: number;
  idx2: number;
}

/** Find a valid matching pair to hint at. Returns null if no valid moves. */
export const findHint = (cells: Cell[]): HintPair | null => {
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
        return { idx1: a, idx2: b };
      }
    }
  }

  return null;
};
