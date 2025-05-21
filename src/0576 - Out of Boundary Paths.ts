export {}; // Necessary in order to avoid TS errors

// 1 -> [0 1 0] * [3 2 3] = [0 2 0] + PREVIOUS = [0 2 0] . SUM = 02
// 2 -> [1 0 1] * [3 2 3] = [3 0 3] + PREVIOUS = [3 2 3] . SUM = 08
// 3 -> [0 2 0] * [3 2 3] = [0 4 0] + PREVIOUS = [3 6 0] . SUM = 12
// 4 -> [2 0 2] * [3 2 3] = [6 0 6] + PREVIOUS = [9 6 9] . SUM = 24

function findPaths(m: number, n: number, maxMove: number, startRow: number, startColumn: number): number {
  const possible_moves: Position[][][] = Array.from({ length: m }, () => Array(n));
  const number_of_exits: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const isTop = i === 0;
      const isBottom = i === m - 1;
      const isLeftEdge = j === 0;
      const isRightEdge = j === n - 1;

      possible_moves[i][j] = [
        ...(isTop ? [] : [[i - 1, j] as Position]),
        ...(isBottom ? [] : [[i + 1, j] as Position]),
        ...(isLeftEdge ? [] : [[i, j - 1] as Position]),
        ...(isRightEdge ? [] : [[i, j + 1] as Position]),
      ];

      number_of_exits[i][j] = boolToNum(isTop) + boolToNum(isBottom) + boolToNum(isLeftEdge) + boolToNum(isRightEdge);

      // console.log([[i, j], number_of_exits[i][j], possible_moves[i][j]]);
    }
  }

  let possible_paths = BigInt(0);

  const visiting_matrix_pool: [bigint[][], bigint[][]] = [
    Array.from({ length: m }, () => Array(n).fill(BigInt(0))),
    Array.from({ length: m }, () => Array(n).fill(BigInt(0))),
  ];
  let visiting_matrix_swap_index = 0;
  const previous_visiting_matrix = () => visiting_matrix_pool[visiting_matrix_swap_index];
  const visiting_matrix = () => visiting_matrix_pool[(visiting_matrix_swap_index + 1) % visiting_matrix_pool.length];
  const visiting_matrix_swap = () => {
    visiting_matrix_swap_index = (visiting_matrix_swap_index + 1) % visiting_matrix_pool.length;
  };

  s(previous_visiting_matrix(), [startRow, startColumn], BigInt(1));

  for (let move = 0; move < maxMove; move++) {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const pos: Position = [i, j];
        const visitors = g(previous_visiting_matrix(), pos);

        // console.log(["x", pos, "vis:", visitors, "exits:", g(number_of_exits, pos), "moves", g(possible_moves, pos)]);

        possible_paths = possible_paths + visitors * BigInt(g(number_of_exits, pos));

        g(possible_moves, pos).forEach((vpos) => u(visiting_matrix(), vpos, (n) => n + visitors));
      }
    }

    // console.log(["move", move, possible_paths]);
    // for (const row of visiting_matrix()) {
    //   console.log(row);
    // }

    visiting_matrix_swap();
    resetMatrix(visiting_matrix(), BigInt(0));
  }

  return Number(possible_paths % BigInt(Math.pow(10, 9) + 7));
}

type Position = [number, number];

function boolToNum(x: boolean): number {
  return x ? 1 : 0;
}

function g<T>(matrix: T[][], position: Position): T {
  return matrix[position[0]][position[1]];
}

function s<T>(matrix: T[][], position: Position, value: T): void {
  matrix[position[0]][position[1]] = value;
}

function u<T>(matrix: T[][], position: Position, fn: (T) => T): T {
  return (matrix[position[0]][position[1]] = fn(matrix[position[0]][position[1]]));
}

function resetMatrix<T>(mut_matrix: T[][], value: T): void {
  for (const [i, row] of mut_matrix.entries()) {
    for (const [j] of row.entries()) {
      mut_matrix[i][j] = value;
    }
  }
}
