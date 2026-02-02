import _ from "lodash";

import { expect, test, describe } from "vitest";

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const window = new Map<number, number>();

  for (let i = 0; i <= k && i < nums.length; i++) {
    window.set(nums[i], 1 + (window.get(nums[i]) ?? 0));
  }

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const count = window.get(num)!;

    if (count > 1) return true;

    window.set(num, 0);

    const window_next_index = i + k + 1;

    if (window_next_index < nums.length) {
      window.set(nums[window_next_index], 1 + (window.get(nums[window_next_index]) ?? 0));
    }
  }

  return false;
}

type SolutionFunction = typeof containsNearbyDuplicate;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 3, 1], 3], expected_result: true },
  { input: [[1, 0, 1, 1], 1], expected_result: true },
  { input: [[1, 2, 3, 1, 2, 3], 2], expected_result: false },
];

const solutions = [{ name: "best", fn: containsNearbyDuplicate }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
