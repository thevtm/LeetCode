import _ from "lodash";

import { expect, test, describe } from "vitest";

function findMiddleIndex(nums: number[]): number {
  let left_sum = 0;
  let right_sum = _.sum(nums);

  for (let i = 0; i < nums.length; i++) {
    right_sum -= nums[i];
    if (left_sum === right_sum) return i;
    left_sum += nums[i];
  }

  return -1;
}

type SolutionFunction = typeof findMiddleIndex;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[2, 3, -1, 8, 4]], expected_result: 3 },
  { input: [[1, -1, 4]], expected_result: 2 },
  { input: [[2, 5]], expected_result: -1 },
];

const solutions = [{ name: "best", fn: findMiddleIndex }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
