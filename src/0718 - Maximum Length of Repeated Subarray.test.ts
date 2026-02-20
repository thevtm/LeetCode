import _ from "lodash";

import { expect, test, describe } from "vitest";

function findLength(nums1: number[], nums2: number[]): number {
  const matrix = Array.from({ length: nums1.length }, () => new Array(nums2.length));

  let max = 0;

  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      if (nums1[i] !== nums2[j]) {
        matrix[i][j] = 0;
      } else {
        if (i === 0 || j === 0) matrix[i][j] = 1;
        else matrix[i][j] = 1 + matrix[i - 1][j - 1];
      }

      max = Math.max(max, matrix[i][j]);
    }
  }

  return max;
}

function findLength_map(nums1: number[], nums2: number[]): number {
  const cache = new Map<number, number>();

  const dp = (i: number = 0, j: number = 0): number => {
    if (i >= nums1.length || j >= nums2.length) return 0;
    if (nums1[i] !== nums2[j]) return 0;

    const cache_key = i * 1000 + j;
    const cache_res = cache.get(cache_key);
    if (cache_res !== undefined) return cache_res;

    const res = 1 + dp(i + 1, j + 1);
    cache.set(cache_key, res);
    return res;
  };

  let max = 0;

  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      max = Math.max(max, dp(i, j));
    }
  }

  return max;
}

type SolutionFunction = typeof findLength;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [1, 2, 3, 2, 1],
      [3, 2, 1, 4, 7],
    ],
    expected_result: 3,
  },
  {
    input: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    expected_result: 5,
  },
];

const solutions = [
  { name: "best", fn: findLength },
  { name: "map", fn: findLength_map },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
