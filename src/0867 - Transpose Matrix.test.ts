import _ from "lodash";

import { expect, test, describe } from "vitest";

function transpose(matrix: number[][]): number[][] {
  const m = matrix.length;
  const n = matrix[0].length;

  const res = Array.from({ length: n }, () => Array(m));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res[j][i] = matrix[i][j];
    }
  }

  return res;
}

type SolutionFunction = typeof transpose;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    ],
    expected_result: [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ],
  },
  {
    input: [
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
    ],
    expected_result: [
      [1, 4],
      [2, 5],
      [3, 6],
    ],
  },
];

const solutions = [{ name: "best", fn: transpose }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
