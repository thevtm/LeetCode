import _ from "lodash";

import { expect, test, describe } from "vitest";

function sortEvenOdd(nums: number[]): number[] {
  // Insertion sort
  for (let i = 2; i < nums.length; i++) {
    const key = nums[i];
    let j = i - 2;

    const is_even = i % 2 === 0;
    const is_odd = !is_even;

    while (j >= 0 && ((is_even && nums[j] > key) || (is_odd && nums[j] < key))) {
      nums[j + 2] = nums[j];
      j -= 2;
    }

    nums[j + 2] = key;
  }

  return nums;
}

function sortEvenOdd_insertion_double_loop(nums: number[]): number[] {
  // Insertion sort for evens
  for (let i = 2; i < nums.length; i += 2) {
    const key = nums[i];
    let j = i - 2;

    while (j >= 0 && nums[j] > key) {
      nums[j + 2] = nums[j];
      j -= 2;
    }

    nums[j + 2] = key;
  }

  // Insertion sort for odds
  for (let i = 3; i < nums.length; i += 2) {
    const key = nums[i];
    let j = i - 2;

    while (j >= 1 && nums[j] < key) {
      nums[j + 2] = nums[j];
      j -= 2;
    }

    nums[j + 2] = key;
  }

  return nums;
}

function sortEvenOdd_bubble(nums: number[]): number[] {
  // Bubble sort for evens
  for (let i = 0; i < nums.length; i += 2) {
    for (let j = 0; j < nums.length - i - 2; j += 2) {
      if (nums[j] > nums[j + 2]) [nums[j], nums[j + 2]] = [nums[j + 2], nums[j]];
    }
  }

  // Bubble sort for odds
  for (let i = 0; i < nums.length; i += 2) {
    for (let j = 1; j < nums.length - i - 2; j += 2) {
      if (nums[j] < nums[j + 2]) [nums[j], nums[j + 2]] = [nums[j + 2], nums[j]];
    }
  }

  return nums;
}

type SolutionFunction = typeof sortEvenOdd;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[4, 1, 2, 3]], expected_result: [2, 3, 4, 1] },
  { input: [[2, 1]], expected_result: [2, 1] },
];

const solutions = [
  { name: "best", fn: sortEvenOdd },
  { name: "bubble", fn: sortEvenOdd_bubble },
  { name: "insertion_double_loop", fn: sortEvenOdd_insertion_double_loop },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
