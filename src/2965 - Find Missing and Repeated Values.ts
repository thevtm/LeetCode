export {};

function findMissingAndRepeatedValues(grid: number[][]): number[] {
  const n = grid.length;
  const max_n = n ** 2;
  const all_nums = new Set<number>();

  for (let i = 1; i <= max_n; i++) all_nums.add(i);

  let duplicate = -1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (all_nums.has(grid[i][j])) {
        all_nums.delete(grid[i][j]);
      } else {
        duplicate = grid[i][j];
      }
    }
  }

  return [duplicate, all_nums.values().next().value];
}
