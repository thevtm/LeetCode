import _ from "lodash";

import { expect, test, describe } from "vitest";

function reverseSubmatrix(grid: number[][], x: number, y: number, k: number): number[][] {
  const hk = Math.floor(k / 2);

  for (let i = 0; i < hk; i++) {
    for (let j = 0; j < k; j++) {
      const mi = k - i - 1;
      [grid[x + i][y + j], grid[x + mi][y + j]] = [grid[x + mi][y + j], grid[x + i][y + j]];
    }
  }

  return grid;
}

type SolutionFunction = typeof reverseSubmatrix;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ],
      1,
      0,
      3,
    ],
    expected_result: [
      [1, 2, 3, 4],
      [13, 14, 15, 8],
      [9, 10, 11, 12],
      [5, 6, 7, 16],
    ],
  },
  {
    input: [
      [
        [3, 4, 2, 3],
        [2, 3, 4, 2],
      ],
      0,
      2,
      2,
    ],
    expected_result: [
      [3, 4, 4, 2],
      [2, 3, 2, 3],
    ],
  },
  {
    input: [
      [
        [1, 2],
        [3, 4],
      ],
      0,
      0,
      2,
    ],
    expected_result: [
      [3, 4],
      [1, 2],
    ],
  },
];

const solutions = [{ name: "best", fn: reverseSubmatrix }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
