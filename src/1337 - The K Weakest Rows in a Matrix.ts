export {};

function kWeakestRows(mat: number[][], k: number): number[] {
  const row_strengths = new Array<[number, number]>(mat.length);

  for (let i = 0; i < mat.length; i++) {
    const first_zero_index = mat[i].findIndex((x) => x == 0);
    row_strengths[i] = [i, first_zero_index === -1 ? Infinity : first_zero_index];
  }

  row_strengths.sort((a, b) => a[1] - b[1]);

  return row_strengths.slice(0, k).map((x) => x[0]);
}
