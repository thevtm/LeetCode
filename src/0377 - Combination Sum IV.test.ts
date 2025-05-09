import _ from "lodash";

import { expect, test, describe } from "vitest";

function combinationSum4(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);

  const cache = new Map<number, number>();
  cache.set(0, 1);

  const dp = (remainder: number): number => {
    if (cache.has(remainder)) return cache.get(remainder)!;

    let combinations = 0;

    for (let i = 0; i < nums.length && remainder >= nums[i]; i++) {
      combinations += dp(remainder - nums[i]);
    }

    cache.set(remainder, combinations);
    return combinations;
  };

  const result = dp(target);

  return result;
}

type SolutionFunction = typeof combinationSum4;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 3], 4], expected_result: 7 },
  { input: [[9], 3], expected_result: 0 },
];

const solutions = [{ name: "best", fn: combinationSum4 }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
