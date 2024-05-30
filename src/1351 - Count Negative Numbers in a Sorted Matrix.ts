export {}; // Necessary in order to avoid TS errors

function countNegatives(grid: number[][]): number {
  let result = 0;

  for (const row of grid) {
    for (const cell of row) {
      if (cell < 0) {
        result++;
      }
    }
  }

  return result;
}
