import _ from "lodash";

import { expect, test, describe } from "vitest";

function minAbsDiff(grid: number[][], k: number): number[][] {
  const rows = grid.length;
  const cols = grid[0].length;

  const max_i = rows - k + 1;
  const max_j = cols - k + 1;

  const answer = Array.from({ length: max_i }, () => new Array(max_j));

  const nums = new Array(k * k);

  for (let i = 0; i < max_i; i++) {
    for (let j = 0; j < max_j; j++) {
      for (let ik = 0; ik < k; ik++) {
        for (let jk = 0; jk < k; jk++) {
          nums[ik * k + jk] = grid[i + ik][j + jk];
        }
      }

      nums.sort((a, b) => a - b);

      let smallest_abs_diff = Infinity;

      for (let n = 0; n < k * k - 1; n++) {
        if (nums[n] === nums[n + 1]) continue;
        smallest_abs_diff = Math.min(smallest_abs_diff, Math.abs(nums[n] - nums[n + 1]));
      }

      answer[i][j] = smallest_abs_diff === Infinity ? 0 : smallest_abs_diff;
    }
  }

  return answer;
}

type SolutionFunction = typeof minAbsDiff;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [1, 8],
        [3, -2],
      ],
      2,
    ],
    expected_result: [[2]],
  },
  { input: [[[3, -1]], 1], expected_result: [[0, 0]] },
  {
    input: [
      [
        [1, -2, 3],
        [2, 3, 5],
      ],
      2,
    ],
    expected_result: [[1, 2]],
  },
];

const solutions = [{ name: "best", fn: minAbsDiff }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
