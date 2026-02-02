import _ from "lodash";

import { expect, test, describe } from "vitest";

function threeSumClosest(nums: number[], target: number): number {
  const sorted_nums = nums.toSorted((a, b) => a - b);

  let lowest_delta = Infinity;
  let lowest_delta_sum = Infinity;

  for (let i = 0; i < sorted_nums.length - 2; i++) {
    let left = i + 1;
    let right = sorted_nums.length - 1;

    while (left < right) {
      const sum = sorted_nums[i] + sorted_nums[left] + sorted_nums[right];
      const delta = Math.abs(sum - target);

      if (delta < lowest_delta) {
        lowest_delta = delta;
        lowest_delta_sum = sum;
      }

      if (sum === target) return target;
      else if (sum > target) right--;
      else left++;
    }
  }

  return lowest_delta_sum;
}

type SolutionFunction = typeof threeSumClosest;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[-1, 2, 1, -4], 1], expected_result: 2 },
  { input: [[0, 0, 0], 1], expected_result: 0 },
];

const solutions = [{ name: "best", fn: threeSumClosest }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
