export {};

function minOperations(grid: number[][], x: number): number {
  const m = grid.length;
  const n = grid[0].length;

  // console.log("m", m, "n", n);

  if (m * n === 1) return 0;

  const arr = new Array<number>(m * n);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      arr[i * n + j] = grid[i][j];
    }
  }

  // console.log("arr", arr);

  arr.sort((a, b) => a - b);

  // console.log("arr", arr);

  const mean = arr[Math.floor(arr.length / 2)];

  // console.log("mean", mean);

  let operations = 0;

  for (let i = 0; i < m * n; i++) {
    const delta = Math.abs(mean - arr[i]);
    if (delta % x !== 0) return -1;
    operations += delta / x;
  }

  return operations;
}
