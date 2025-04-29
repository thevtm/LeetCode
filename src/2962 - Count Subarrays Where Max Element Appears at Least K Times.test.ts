import { expect, test, describe } from "vitest";

function countSubarrays(nums: number[], k: number): number {
  const max_element = Math.max(...nums);

  console.log("max_element", max_element);

  let count = 0;
  let left = 0;
  let max_element_count = 0;

  for (let right = 0; right < nums.length; right++) {
    const right_num = nums[right];

    if (right_num === max_element) max_element_count++;

    while (max_element_count >= k && left <= right) {
      if (nums[left++] === max_element) max_element_count--;
    }

    count += left;
  }

  return count;
}

type SolutionFunction = typeof countSubarrays;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 3, 2, 3, 3], 2], expected_result: 6 },
  { input: [[1, 4, 2, 1], 3], expected_result: 0 },
  { input: [[0, 1, 1, 0], 2], expected_result: 4 },
];

const solutions = [{ name: "best", fn: countSubarrays }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
