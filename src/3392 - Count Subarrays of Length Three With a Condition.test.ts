import { expect, test, describe } from "vitest";

function countSubarrays(nums: number[]): number {
  let count = 0;

  for (let i = 0; i < nums.length - 2; i++) {
    if ((nums[i] + nums[i + 2]) * 2 === nums[i + 1]) count++;
  }

  return count;
}

type SolutionFunction = typeof countSubarrays;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 1, 4, 1]], expected_result: 1 },
  { input: [[1, 1, 1]], expected_result: 0 },
];

const solutions = [{ name: "best", fn: countSubarrays }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
