export {}; // Necessary in order to avoid TS errors

function generate(numRows: number): number[][] {
  if (numRows === 1) {
    return [[1]];
  }

  const previous = generate(numRows - 1);
  const above_row = last(previous);

  const row = [...Array(numRows)].map((_, i) => (above_row[i - 1] ?? 0) + (above_row[i] ?? 0));

  return [...previous, row];
}

function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}
