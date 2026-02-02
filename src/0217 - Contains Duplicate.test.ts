import _ from "lodash";

import { expect, test, describe } from "vitest";

function containsDuplicate(nums: number[]): boolean {
  const set = new Set<number>();

  for (const num of nums) {
    if (set.has(num)) return true;
    set.add(num);
  }

  return false;
}

type SolutionFunction = typeof containsDuplicate;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 3, 1]], expected_result: true },
  { input: [[1, 2, 3, 4]], expected_result: false },
  { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected_result: true },
];

const solutions = [{ name: "best", fn: containsDuplicate }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
