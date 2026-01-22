import _ from "lodash";

import { expect, test, describe } from "vitest";

function leftRightDifference(nums: number[]): number[] {
  const res = new Array(nums.length);

  let left_sum = 0;
  let right_sum = _.sum(nums);

  for (let i = 0; i < nums.length; i++) {
    right_sum -= nums[i];
    res[i] = Math.abs(left_sum - right_sum);
    left_sum += nums[i];
  }

  return res;
}

type SolutionFunction = typeof leftRightDifference;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[10, 4, 8, 3]], expected_result: [15, 1, 11, 22] },
  { input: [[1]], expected_result: [0] },
];

const solutions = [{ name: "best", fn: leftRightDifference }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
