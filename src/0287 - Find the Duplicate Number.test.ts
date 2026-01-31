import _ from "lodash";

import { expect, test, describe } from "vitest";

function findDuplicate(nums: number[]): number {
  let slow = 0;
  let fast = 0;

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = 0;
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}

type SolutionFunction = typeof findDuplicate;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 3, 4, 2, 2]], expected_result: 2 },
  { input: [[3, 1, 3, 4, 2]], expected_result: 3 },
  { input: [[3, 3, 3, 3, 3]], expected_result: 3 },
];

const solutions = [{ name: "best", fn: findDuplicate }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
