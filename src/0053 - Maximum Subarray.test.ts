import _ from "lodash";

import { expect, test, describe } from "vitest";

function maxSubArray(nums: number[]): number {
  let res = nums[0];
  let max_res = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    res = Math.max(res + num, num);
    max_res = Math.max(res, max_res);
  }

  return max_res;
}

type SolutionFunction = typeof maxSubArray;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected_result: 6 },
  { input: [[1]], expected_result: 1 },
  { input: [[5, 4, -1, 7, 8]], expected_result: 23 },
];

const solutions = [{ name: "best", fn: maxSubArray }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
