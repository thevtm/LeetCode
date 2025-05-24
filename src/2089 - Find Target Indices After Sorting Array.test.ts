import _ from "lodash";

import { expect, test, describe } from "vitest";

function targetIndices(nums: number[], target: number): number[] {
  nums.sort((a, b) => a - b);

  const result: number[] = [];

  let i = 0;
  while (nums[i] < target) i++;
  while (nums[i] === target) result.push(i++);

  return result;
}

type SolutionFunction = typeof targetIndices;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 5, 2, 3], 2], expected_result: [1, 2] },
  { input: [[1, 2, 5, 2, 3], 3], expected_result: [3] },
  { input: [[1, 2, 5, 2, 3], 5], expected_result: [4] },
];

const solutions = [{ name: "best", fn: targetIndices }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
