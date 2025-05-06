import { expect, test, describe } from "vitest";

function countSubarrays(nums: number[], k: number): number {
  let count = 0;

  // Elements before this should not be include in the sub array
  let last_excluded_index = -1;

  let sum = 0;
  let length = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    sum += num;
    length++;

    while (sum * length >= k) {
      sum -= nums[++last_excluded_index];
      length--;
    }

    count += length;
  }

  return count;
}

type SolutionFunction = typeof countSubarrays;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[2, 1, 4, 3, 5], 10], expected_result: 6 },
  { input: [[1, 1, 1], 5], expected_result: 5 },
];

const solutions = [{ name: "best", fn: countSubarrays }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
