import { expect, test, describe } from "vitest";

/*
nums     1 3 5 2 7 5
< min k  0 0 0 0 0 0
= min k  1 1 1 1 1 1
> high k 0 0 0 0 1 1
= high k 0 0 1 1 1 2

at least 1 difference when `= min/max k`
no difference when `>/< min/max k`
*/

function countSubarrays(nums: number[], minK: number, maxK: number): number {
  let count = 0;

  let last_min_k_index = -1;
  let last_max_k_index = -1;

  // Elements before this should not be include in the sub array
  let last_excluded_index = -1;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (num === minK) last_min_k_index = i;
    if (num === maxK) last_max_k_index = i;

    if (num > maxK || num < minK) last_excluded_index = i;

    const first_valid_window_index = Math.min(last_min_k_index, last_max_k_index);

    count += Math.max(0, first_valid_window_index - last_excluded_index);
  }

  return count;
}

function countSubarrays_old(nums: number[], minK: number, maxK: number): number {
  let count = 0;
  let last_min_k_index = -1;
  let last_max_k_index = -1;
  let first_good_num_index = -1;

  for (let right = 0; right < nums.length; right++) {
    const right_num = nums[right];

    if (right_num === minK) last_min_k_index = right;
    if (right_num === maxK) last_max_k_index = right;
    if (right_num > maxK || right_num < minK) first_good_num_index = right;

    const left = Math.min(last_min_k_index, last_max_k_index);

    count += Math.max(0, left - first_good_num_index);
  }

  return count;
}

function countSubarrays_alt(nums: number[], minK: number, maxK: number): number {
  let res = 0;
  let [j1, j2, k] = [-1, -1, -1];
  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] < minK || nums[i] > maxK) k = i;
    if (nums[i] === minK) j1 = i;
    if (nums[i] === maxK) j2 = i;
    res += Math.max(0, Math.min(j1, j2) - k);
  }
  return res;
}

type SolutionFunction = typeof countSubarrays;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 3, 5, 2, 7, 5], 1, 5], expected_result: 2 },
  { input: [[1, 1, 1, 1], 1, 1], expected_result: 10 },
  { input: [[4, 3], 3, 3], expected_result: 1 },
];

const solutions = [
  { name: "best", fn: countSubarrays },
  { name: "old", fn: countSubarrays_old },
  { name: "alt", fn: countSubarrays_alt },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
