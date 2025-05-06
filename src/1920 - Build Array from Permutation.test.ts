import { expect, test, describe } from "vitest";

function buildArray(nums: number[]): number[] {
  const result = new Array<number>();

  for (let i = 0; i < nums.length; i++) {
    result[i] = nums[nums[i]];
  }

  return result;
}

type SolutionFunction = typeof buildArray;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[0, 2, 1, 5, 3, 4]], expected_result: [0, 1, 2, 4, 5, 3] },
  { input: [[5, 0, 1, 2, 3, 4]], expected_result: [4, 5, 0, 1, 2, 3] },
];

const solutions = [{ name: "best", fn: buildArray }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
