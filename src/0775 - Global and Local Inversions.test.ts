import _ from "lodash";

import { expect, test, describe } from "vitest";

function isIdealPermutation(nums: number[]): boolean {
  let max = nums[0];

  for (let i = 2; i < nums.length; i++) {
    if (nums[i] < max) return false;
    max = Math.max(max, nums[i - 1]);
  }

  return true;
}

type SolutionFunction = typeof isIdealPermutation;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 0, 2]], expected_result: true },
  { input: [[1, 2, 0]], expected_result: false },
];

const solutions = [{ name: "best", fn: isIdealPermutation }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
