import _ from "lodash";

import { expect, test, describe } from "vitest";

function canSortArray(nums: number[]): boolean {
  const count_bits = (num: number) => {
    let count = 0;

    while (num > 0) {
      if ((num & 1) === 1) count++;
      num = num >> 1;
    }

    return count;
  };

  let segment_bits = -1;
  let segment_min = Infinity;
  let segment_max = -Infinity;
  let previous_segment_max = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const bits = count_bits(num);

    if (segment_bits === bits) {
      segment_min = Math.min(segment_min, num);
      segment_max = Math.max(segment_max, num);
    } else {
      if (previous_segment_max > segment_min) return false;
      previous_segment_max = segment_max;
      segment_min = segment_max = num;
      segment_bits = bits;
    }
  }

  if (previous_segment_max > segment_min) return false;

  return true;
}

function canSortArray_BubbleSort(nums: number[]): boolean {
  const count_bits = (num: number) => {
    let count = 0;

    while (num > 0) {
      if ((num & 1) === 1) count++;
      num = num >> 1;
    }

    return count;
  };

  for (let last = nums.length; last > 0; last--) {
    let swapped = false;

    for (let j = 0; j < last - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        if (count_bits(nums[j]) !== count_bits(nums[j + 1])) return false;
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        swapped = true;
      }
    }

    if (swapped === false) break;
  }

  return true;
}

type SolutionFunction = typeof canSortArray;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[8, 4, 2, 30, 15]], expected_result: true },
  { input: [[1, 2, 3, 4, 5]], expected_result: true },
  { input: [[3, 16, 8, 4, 2]], expected_result: false },
  { input: [[75, 34, 30]], expected_result: false },
];

const solutions = [
  { name: "best", fn: canSortArray },
  { name: "bubble sort", fn: canSortArray_BubbleSort },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
