export {}; // Necessary in order to avoid TS errors

function getRow(rowIndex: number): number[] {
  rowIndex++;

  const row: number[] = new Array(rowIndex).fill(0);

  row[0] = 1;

  for (let i = 1; i < rowIndex; i++) {
    row[i] = (row[i - 1] * (rowIndex - i)) / i;

    // console.log([row[i - 1], "*", rowIndex - i, "/", i]);

    // console.log(row);
  }

  return row;
}

function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}
