import _ from "lodash";

import { expect, test, describe } from "vitest";

function minPathSum(grid: number[][]): number {
  const rows = grid[0].length;
  const cols = grid.length;

  const dp = Array.from({ length: cols }, () => Array<number>(rows).fill(0));

  dp[0][0] = grid[0][0];

  for (let i = 1; i < rows; i++) {
    dp[0][i] = grid[0][i] + dp[0][i - 1];
  }

  for (let j = 1; j < cols; j++) {
    dp[j][0] = grid[j][0] + dp[j - 1][0];
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[j][i] = grid[j][i] + Math.min(dp[j][i - 1], dp[j - 1][i]);
    }
  }

  // console.log("dp", dp);

  return dp[cols - 1][rows - 1];
}

type SolutionFunction = typeof minPathSum;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [1, 3, 1],
        [1, 5, 1],
        [4, 2, 1],
      ],
    ],
    expected_result: 7,
  },
  {
    input: [
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
    ],
    expected_result: 12,
  },
];

const solutions = [{ name: "best", fn: minPathSum }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
