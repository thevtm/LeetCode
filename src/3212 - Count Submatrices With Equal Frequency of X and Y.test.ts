import _ from "lodash";

import { expect, test, describe } from "vitest";

function numberOfSubmatrices(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const grid_x = Array.from({ length: rows }, () => Array<number>(cols));
  const grid_y = Array.from({ length: rows }, () => Array<number>(cols));

  let count = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid_x[i][j] = grid[i][j] === "X" ? 1 : 0;
      grid_y[i][j] = grid[i][j] === "Y" ? 1 : 0;

      if (i > 0) {
        grid_x[i][j] += grid_x[i - 1][j];
        grid_y[i][j] += grid_y[i - 1][j];
      }

      if (j > 0) {
        grid_x[i][j] += grid_x[i][j - 1];
        grid_y[i][j] += grid_y[i][j - 1];
      }

      if (i > 0 && j > 0) {
        grid_x[i][j] -= grid_x[i - 1][j - 1];
        grid_y[i][j] -= grid_y[i - 1][j - 1];
      }

      if (grid_x[i][j] > 0 && grid_x[i][j] === grid_y[i][j]) count++;
    }
  }

  // console.log("grid_x", grid_x);
  // console.log("grid_y", grid_y);

  return count;
}

type SolutionFunction = typeof numberOfSubmatrices;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        ["X", "Y", "."],
        ["Y", ".", "."],
      ],
    ],
    expected_result: 3,
  },
  {
    input: [
      [
        ["X", "X"],
        ["X", "Y"],
      ],
    ],
    expected_result: 0,
  },
  {
    input: [
      [
        [".", "."],
        [".", "."],
      ],
    ],
    expected_result: 0,
  },
  {
    input: [[["X"]]],
    expected_result: 0,
  },
];

const solutions = [{ name: "best", fn: numberOfSubmatrices }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
