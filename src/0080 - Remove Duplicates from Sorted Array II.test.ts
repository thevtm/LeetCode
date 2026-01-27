import _ from "lodash";

import { expect, test, describe } from "vitest";

function removeDuplicates(nums: number[]): number {
  let duplicates_count = 0;

  for (let i = 2; i < nums.length; i++) {
    if (nums[i] === nums[i - 2 - duplicates_count]) {
      duplicates_count++;
    } else {
      nums[i - duplicates_count] = nums[i];
    }
  }

  return nums.length - duplicates_count;
}

type SolutionFunction = typeof removeDuplicates;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 1, 1, 2, 2, 3]], expected_result: 5 },
  { input: [[0, 0, 1, 1, 1, 1, 2, 3, 3]], expected_result: 7 },
];

const solutions = [{ name: "best", fn: removeDuplicates }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
