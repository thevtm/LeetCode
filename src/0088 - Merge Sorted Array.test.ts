import _ from "lodash";

import { expect, test, describe } from "vitest";

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // Shift nums1 first
  for (let i = m - 1; i >= 0; i--) {
    nums1[n + i] = nums1[i];
  }

  let i = 0;
  let i1 = n;
  let i2 = 0;

  while (i < m + n) {
    if (i2 >= n || (i1 < m + n && nums1[i1] <= nums2[i2])) {
      nums1[i++] = nums1[i1++];
    } else {
      nums1[i++] = nums2[i2++];
    }
  }
}

type SolutionFunction = typeof merge;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: number[];
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3], expected_result: [1, 2, 2, 3, 5, 6] },
  { input: [[1], 1, [], 0], expected_result: [1] },
  { input: [[0], 0, [1], 1], expected_result: [1] },
];

const solutions = [{ name: "best", fn: merge }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    fn(...input);
    expect(input[0]).toStrictEqual(expected_result);
  });
});
