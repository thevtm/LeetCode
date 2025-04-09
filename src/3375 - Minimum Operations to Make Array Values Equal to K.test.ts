import _ from "lodash";

import { expect, test, describe } from "vitest";

function minOperations(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);

  if (_.first(nums)! < k) return -1;

  let nums_equal_k_count = 0;

  while (nums[nums_equal_k_count] === k) nums_equal_k_count++;

  let uniq_count = 0;

  for (let i = nums_equal_k_count; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) continue;
    uniq_count++;
  }

  return uniq_count;
}

function minOperations_slow(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  const sorted_uniq_nums = _.sortedUniq(nums);
  // console.log("sorted_uniq_nums", sorted_uniq_nums);

  if (_.first(sorted_uniq_nums)! < k) return -1;

  if (_.first(sorted_uniq_nums) === k) return sorted_uniq_nums.length - 1;

  return sorted_uniq_nums.length;
}

type SolutionFunction = typeof minOperations;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[5, 2, 5, 4, 5], 2], expected_result: 2 },
  { input: [[2, 1, 2], 2], expected_result: -1 },
  { input: [[9, 7, 5, 3], 1], expected_result: 4 },
];

const solutions = [
  { name: "best", fn: minOperations },
  { name: "slow", fn: minOperations_slow },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
