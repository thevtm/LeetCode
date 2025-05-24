import _ from "lodash";

import { expect, test, describe } from "vitest";

function searchRange(nums: number[], target: number): [number, number] {
  let first_position = -1;

  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const middle_index = Math.floor((end + start) / 2);
    const middle_num = nums[middle_index];

    if (middle_num === target && nums[middle_index - 1] !== target) {
      first_position = middle_index;
      break;
    } else if (middle_num < target) {
      start = middle_index + 1;
    } else {
      end = middle_index - 1;
    }
  }

  if (first_position === -1) return [-1, -1];

  //////////////////////////////////////////////////////////////////////////////

  let last_position = -1;

  start = first_position;
  end = nums.length - 1;

  while (start <= end) {
    const middle_index = Math.floor((end + start) / 2);
    const middle_num = nums[middle_index];

    if (middle_num === target && nums[middle_index + 1] !== target) {
      last_position = middle_index;
      break;
    } else if (middle_num > target) {
      end = middle_index - 1;
    } else {
      start = middle_index + 1;
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  return [first_position, last_position];
}

type SolutionFunction = typeof searchRange;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[5, 7, 7, 8, 8, 10], 8], expected_result: [3, 4] },
  { input: [[5, 7, 7, 8, 8, 10], 6], expected_result: [-1, -1] },
  { input: [[], 0], expected_result: [-1, -1] },
  { input: [[2, 2], 2], expected_result: [0, 1] },
];

const solutions = [{ name: "best", fn: searchRange }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
