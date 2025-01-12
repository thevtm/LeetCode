export {};

// [0,0]
// [1,0] [0,1]
// [0,2] [1,1] [2,0]
// [2,1] [1,2]
// [2,2]

function findDiagonalOrder(mat: number[][]): number[] {
  const width = mat[0].length;
  const height = mat.length;

  const result = new Array<number>(width * height);
  let index = 0;

  for (let i = 0; i < height + width - 1; i++) {
    const is_zig = i % 2 == 0;

    if (is_zig) {
      let x = Math.max(0, i - (height - 1));
      let y = Math.min(i, height - 1);

      result[index++] = mat[y][x];

      while (y > 0 && x < width - 1) {
        x++;
        y--;

        result[index++] = mat[y][x];
      }
    } else {
      let x = Math.min(i, width - 1);
      let y = Math.max(0, i - x);

      result[index++] = mat[y][x];

      while (x > 0 && y < height - 1) {
        x--;
        y++;

        result[index++] = mat[y][x];
      }
    }
  }

  return result;
}
