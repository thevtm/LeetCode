import _ from "lodash";

import { expect, test, describe } from "vitest";

function maximumDifference(nums: number[]): number {
  let min = nums[0];
  let difference = 0;

  for (let i = 1; i < nums.length; i++) {
    min = Math.min(min, nums[i]);
    difference = Math.max(difference, nums[i] - min);
  }

  return difference === 0 ? -1 : difference;
}

type SolutionFunction = typeof maximumDifference;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[7, 1, 5, 4]], expected_result: 4 },
  { input: [[9, 4, 3, 2]], expected_result: -1 },
  { input: [[1, 5, 2, 10]], expected_result: 9 },
];

const solutions = [{ name: "best", fn: maximumDifference }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
