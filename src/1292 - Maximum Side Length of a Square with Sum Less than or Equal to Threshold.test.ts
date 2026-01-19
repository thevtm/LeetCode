import _ from "lodash";

import { expect, test, describe } from "vitest";

function maxSideLength(mat: number[][], threshold: number): number {
  const m = mat[0].length;
  const n = mat.length;

  const prefix_sum = Array.from({ length: n + 1 }, () => Array<number>(m + 1));

  for (let x = 0; x < m + 1; x++) prefix_sum[0][x] = 0;
  for (let y = 0; y < n + 1; y++) prefix_sum[y][0] = 0;

  for (let x = 0; x < m; x++) prefix_sum[1][x + 1] = mat[0][x] + prefix_sum[1][x];
  for (let y = 0; y < n; y++) prefix_sum[y + 1][1] = mat[y][0] + prefix_sum[y][1];

  for (let x = 1; x < m; x++)
    for (let y = 1; y < n; y++)
      prefix_sum[y + 1][x + 1] = mat[y][x] + prefix_sum[y + 1][x] + prefix_sum[y][x + 1] - prefix_sum[y][x];

  let max = 0;

  for (let x = 0; x < m; x++) {
    for (let y = 0; y < n; y++) {
      const max_length = Math.min(m - x, n - y);
      if (max_length <= max) continue;

      let begin = max;
      let end = max_length - 1;

      const top_left_prefix_sum = prefix_sum[y][x];

      while (begin <= end) {
        const mid = Math.floor((end + begin) / 2);

        const bottom_left_prefix_sum = prefix_sum[y + 1 + mid][x];
        const top_right_prefix_sum = prefix_sum[y][x + 1 + mid];
        const bottom_right_prefix_sum = prefix_sum[y + 1 + mid][x + 1 + mid];

        const sum = top_left_prefix_sum - top_right_prefix_sum - bottom_left_prefix_sum + bottom_right_prefix_sum;

        if (sum <= threshold) {
          max = Math.max(max, mid + 1);
          begin = mid + 1;
        } else {
          end = mid - 1;
        }
      }
    }
  }

  return max;
}

type SolutionFunction = typeof maxSideLength;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [1, 1, 3, 2, 4, 3, 2],
        [1, 1, 3, 2, 4, 3, 2],
        [1, 1, 3, 2, 4, 3, 2],
      ],
      4,
    ],
    expected_result: 2,
  },
  {
    input: [
      [
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
      ],
      1,
    ],
    expected_result: 0,
  },
  {
    input: [
      [
        [10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 1, 1],
        [10, 10, 10, 10, 1, 1],
      ],
      4,
    ],
    expected_result: 2,
  },
  {
    input: [
      [
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
      ],
      6,
    ],
    expected_result: 3,
  },
  {
    input: [[[0]], 0],
    expected_result: 1,
  },
];

const solutions = [{ name: "best", fn: maxSideLength }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
