export {}; // Necessary in order to avoid TS errors

function findChampion(grid: number[][]): number {
  const n = grid.length;

  for (const [index, row] of grid.entries()) {
    if (sum(row) === n - 1) {
      return index;
    }
  }

  return -1;
}

function sum(arr: number[]): number {
  return arr.reduce((acc, el) => acc + el, 0);
}
