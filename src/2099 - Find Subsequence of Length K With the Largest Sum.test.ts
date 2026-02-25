import _ from "lodash";

import { expect, test, describe } from "vitest";

function maxSubsequence(nums: number[], k: number): number[] {
  // Using a set is slower than sorting them again by index
  const indexes_to_keep = new Set(
    nums
      .map((v, i) => [v, i])
      .toSorted(([a, _], [b]) => b - a)
      .slice(0, k)
      .map(([_, i]) => i),
  );

  return nums.filter((_, i) => indexes_to_keep.has(i));
}

type SolutionFunction = typeof maxSubsequence;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[2, 1, 3, 3], 2], expected_result: [3, 3] },
  { input: [[-1, -2, 3, 4], 3], expected_result: [-1, 3, 4] },
  { input: [[3, 4, 3, 3], 2], expected_result: [3, 4] },
];

const solutions = [{ name: "best", fn: maxSubsequence }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
