import _ from "lodash";

import { expect, test, describe } from "vitest";

function sumCounts(nums: number[]): number {
  const seen = new Set<number>();
  let result = nums.length;

  for (let i = 0; i < nums.length; i++) {
    seen.add(nums[i]);

    for (let j = i + 1; j < nums.length; j++) {
      seen.add(nums[j]);
      result += seen.size ** 2;
    }

    seen.clear();
  }

  return result;
}

type SolutionFunction = typeof sumCounts;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 1]], expected_result: 15 },
  { input: [[1, 1]], expected_result: 3 },
  { input: [[1]], expected_result: 1 },
];

const solutions = [{ name: "best", fn: sumCounts }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
