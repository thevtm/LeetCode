export {};

function maxMatrixSum(matrix: number[][]): number {
  const n = matrix.length;

  let lowest_absolute_number = Infinity;
  let negative_count = 0;
  let absolute_sum = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const val = matrix[i][j];
      const val_abs = Math.abs(val);
      absolute_sum += val_abs;
      if (val < 0) negative_count++;
      lowest_absolute_number = Math.min(lowest_absolute_number, val_abs);
    }
  }

  const odd_negative_count = negative_count % 2 === 1;

  if (odd_negative_count) {
    absolute_sum -= lowest_absolute_number * 2;
  }

  return absolute_sum;
}
