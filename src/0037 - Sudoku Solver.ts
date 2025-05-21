export {}; // Necessary in order to avoid TS errors

function solveSudoku(board: string[][]): void {
  const EMPTY_CELL = ".";
  const MAX_INDEX = 9 * 9;

  const row_sets = Array.from({ length: 9}).map(() => new Set<string>());
  const col_sets = Array.from({ length: 9}).map(() => new Set<string>());
  const sqr_sets = Array.from({ length: 9}).map(() => new Set<string>());

  const index_row = (index: number) => Math.floor(index / 9);
  const index_col = (index: number) => index % 9;
  const index_sqr = (index: number) => Math.floor(index_row(index) / 3) * 3 + Math.floor(index_col(index) / 3);

  for (let i = 0; i < MAX_INDEX; i++) {
    const [row, col, sqr] = [index_row(i), index_col(i), index_sqr(i)];
    const n = board[row][col];

    if (n === EMPTY_CELL) {
      continue;
    }

    row_sets[row].add(n);
    col_sets[col].add(n);
    sqr_sets[sqr].add(n);
  }

  const backtrack = (index: number = 0): boolean => {
    if (index === MAX_INDEX) {
      return true;
    }

    const [row, col, sqr] = [index_row(index), index_col(index), index_sqr(index)];
    const cell = board[row][col];

    // console.log("index", index, "cell", cell, "row", row, "col", col, "sqr", sqr);

    if (cell !== EMPTY_CELL) {
      // console.log(">", index, "already filled", "cell", cell);
      return backtrack(index + 1);
    }

    for (let i = 1; i <= 9; i++) {
      const n = i.toString();

      // console.log(">", index, "try", "n", n);

      if (row_sets[row].has(n)) {
        // console.log(">", index, "failed row", "n", n);
        continue;
      }

      if (col_sets[col].has(n)) {
        // console.log(">", index, "failed col", "n", n);
        continue;
      }

      if (sqr_sets[sqr].has(n)) {
        // console.log(">", index, "failed sqr", "n", n);
        continue;
      }

      board[row][col] = n;
      row_sets[row].add(n);
      col_sets[col].add(n);
      sqr_sets[sqr].add(n);

      // console.log(">", index, "found", "n", n);
      if (backtrack(index + 1)) {
        return true;
      }
      // console.log(">", index, "failed", "n", n);

      board[row][col] = EMPTY_CELL;
      row_sets[row].delete(n);
      col_sets[col].delete(n);
      sqr_sets[sqr].delete(n);
    }

    // console.log(">", index, "return false");
    return false;
  };

  backtrack();
}
