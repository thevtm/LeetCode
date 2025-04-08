import { expect, test, describe } from "vitest";

function modifiedMatrix(matrix: number[][]): number[][] {
  const m = matrix.length;
  const n = matrix[0].length;

  for (let j = 0; j < n; j++) {
    let max = matrix[0][j];

    for (let i = 1; i < m; i++) {
      max = Math.max(max, matrix[i][j]);
    }

    for (let i = 0; i < m; i++) {
      if (matrix[i][j] === -1) matrix[i][j] = max;
    }
  }

  return matrix;
}

type SolutionsFunction = typeof modifiedMatrix;

type TestCase = {
  input: Parameters<SolutionsFunction>;
  expected_result: ReturnType<SolutionsFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [1, 2, -1],
        [4, -1, 6],
        [7, 8, 9],
      ],
    ],
    expected_result: [
      [1, 2, 9],
      [4, 8, 6],
      [7, 8, 9],
    ],
  },
  {
    input: [
      [
        [3, -1],
        [5, 2],
      ],
    ],
    expected_result: [
      [3, 2],
      [5, 2],
    ],
  },
];

const solutions = [{ name: "modifiedMatrix", fn: modifiedMatrix }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
