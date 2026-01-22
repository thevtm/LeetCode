import _ from "lodash";

import { expect, test, describe } from "vitest";

function pivotIndex(nums: number[]): number {
  const cum_sum_left = new Array(nums.length + 1);
  cum_sum_left[0] = 0;

  const cum_sum_right = new Array(nums.length + 1);
  cum_sum_right[nums.length + 1 - 1] = 0;

  for (let i = 1; i < nums.length + 1; i++) {
    cum_sum_left[i] = cum_sum_left[i - 1] + nums[i - 1];
    cum_sum_right[cum_sum_right.length - 1 - i] = cum_sum_right[cum_sum_right.length - i] + nums[nums.length - i];
  }

  // console.log(cum_sum_left);
  // console.log(cum_sum_right);

  if (cum_sum_right[1] === 0) return 0;

  for (let i = 1; i < cum_sum_left.length - 1; i++) {
    if (cum_sum_left[i] === cum_sum_right[i + 1]) return i;
  }

  return -1;
}

type SolutionFunction = typeof pivotIndex;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 7, 3, 6, 5, 6]], expected_result: 3 },
  { input: [[1, 2, 3]], expected_result: -1 },
  { input: [[2, 1, -1]], expected_result: 0 },
];

const solutions = [{ name: "best", fn: pivotIndex }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
