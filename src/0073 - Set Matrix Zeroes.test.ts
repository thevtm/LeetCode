import _ from "lodash";

import { expect, test, describe } from "vitest";

function setZeroes(matrix: number[][]): void {
  const m = matrix.length;
  const n = matrix[0].length;

  let is_first_row_zero = false;
  let is_first_col_zero = false;

  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      is_first_col_zero = true;
      break;
    }
  }

  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      is_first_row_zero = true;
      break;
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  if (is_first_col_zero) {
    for (let i = 0; i < m; i++) matrix[i][0] = 0;
  }

  if (is_first_row_zero) {
    for (let j = 0; j < n; j++) matrix[0][j] = 0;
  }
}

type SolutionFunction = typeof setZeroes;

type TestCase = {
  input: number[][];
  expected_result: number[][];
};

const test_cases: TestCase[] = [
  {
    input: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    expected_result: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ],
  },
  {
    input: [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ],
    expected_result: [
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0],
    ],
  },
  {
    input: [[1, 0]],
    expected_result: [[0, 0]],
  },
];

const solutions = [{ name: "best", fn: setZeroes }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    fn(input);
    expect(input).toStrictEqual(expected_result);
  });
});
