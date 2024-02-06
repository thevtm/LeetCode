export {}; // Necessary in order to avoid TS errors

function isValidSudoku(board: string[][]): boolean {
  const STR_TO_STR_MAP: Record<string, number> = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
  };

  const BITMASKS = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];

  const squares = new Array(9).fill(0);
  const colunms = new Array(9).fill(0);

  for (let i = 0; i < board.length; i++) {
    let row = 0;

    for (let j = 0; j < board[i].length; j++) {
      const numStr = board[i][j];

      if (numStr === "") {
        continue;
      }

      const num = STR_TO_STR_MAP[numStr];
      const numBitmask = BITMASKS[num];

      if (row & numBitmask) {
        return false;
      } else {
        row = row | numBitmask;
      }

      if (colunms[j] & numBitmask) {
        return false;
      } else {
        colunms[j] = colunms[j] | numBitmask;
      }

      const squareIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      if (squares[squareIndex] & numBitmask) {
        return false;
      } else {
        squares[squareIndex] = squares[squareIndex] | numBitmask;
      }
    }
  }

  return true;
}
