import { expect, test, describe } from "vitest";

function countGood(nums: number[], k: number): number {
  const frequencies = new Map<number, number>();

  let pairs = 0;
  let left = 0;
  let result = 0;

  for (let right = 0; right < nums.length; right++) {
    const right_num = nums[right];

    const frequency = frequencies.get(right_num) ?? 0;
    frequencies.set(right_num, frequency + 1);

    if (frequency === 0) continue;

    pairs += frequency;

    while (pairs >= k) {
      const left_num = nums[left++];

      const frequency = frequencies.get(left_num) ?? 0;
      frequencies.set(left_num, frequency - 1);

      pairs -= frequency - 1;

      result += nums.length - right;
    }
  }

  return result;
}

type SolutionFunction = typeof countGood;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 1, 1, 1, 1], 10], expected_result: 1 },
  { input: [[3, 1, 4, 3, 2, 2, 4], 2], expected_result: 4 },
  { input: [[2, 3, 3, 3, 3, 1, 3, 1, 3, 2], 19], expected_result: 0 },
];

const solutions = [{ name: "best", fn: countGood }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
