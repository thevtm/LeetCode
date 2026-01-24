import _ from "lodash";

import { expect, test, describe } from "vitest";

function dominantIndex(nums: number[]): number {
  let index = -1;
  let first = -1;
  let second = -2;

  for (const [i, num] of nums.entries()) {
    if (num > first) {
      second = first;
      first = num;
      index = i;
    } else if (num > second) {
      second = num;
    }
  }

  return first >= second * 2 ? index : -1;
}

type SolutionFunction = typeof dominantIndex;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[3, 6, 1, 0]], expected_result: 1 },
  { input: [[1, 2, 3, 4]], expected_result: -1 },
  { input: [[0, 0, 0, 1]], expected_result: 3 },
];

const solutions = [{ name: "best", fn: dominantIndex }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
