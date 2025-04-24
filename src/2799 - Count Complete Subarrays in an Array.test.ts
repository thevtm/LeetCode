import { expect, test, describe } from "vitest";

function countCompleteSubarrays(nums: number[]): number {
  const total_distinct_elements = new Set(nums).size;

  console.log("total_distinct_elements", total_distinct_elements);

  let result = 0;
  let left = 0;
  let frequencies = new Map<number, number>();
  let current_distinct_elements = 0;

  for (let right = 0; right < nums.length; right++) {
    const right_num = nums[right];

    const right_frequency = frequencies.get(right_num) ?? 0;
    frequencies.set(right_num, right_frequency + 1);
    if (right_frequency === 0) current_distinct_elements++;

    while (current_distinct_elements === total_distinct_elements && left <= right) {
      const left_num = nums[left++];

      const left_frequency = frequencies.get(left_num)!;
      frequencies.set(left_num, left_frequency - 1);
      if (left_frequency === 1) current_distinct_elements--;

      result += nums.length - right;
    }
  }

  return result;
}

type SolutionFunction = typeof countCompleteSubarrays;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 3, 1, 2, 2]], expected_result: 4 },
  { input: [[5, 5, 5, 5]], expected_result: 10 },
];

const solutions = [{ name: "best", fn: countCompleteSubarrays }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
