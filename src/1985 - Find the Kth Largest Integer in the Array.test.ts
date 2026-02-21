import _ from "lodash";

import { expect, test, describe } from "vitest";

function kthLargestNumber(nums: string[], k: number): string {
  nums.sort((a, b) => {
    if (a.length === b.length) {
      if (a === b) return 0;
      else if (a < b) return 1;
      else return -1;
    } else {
      return a.length < b.length ? 1 : -1;
    }
  });

  return nums[k - 1];
}

type SolutionFunction = typeof kthLargestNumber;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [["3", "6", "7", "10"], 4], expected_result: "3" },
  { input: [["2", "21", "12", "1"], 3], expected_result: "2" },
  { input: [["0", "0"], 2], expected_result: "0" },
];

const solutions = [{ name: "best", fn: kthLargestNumber }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
