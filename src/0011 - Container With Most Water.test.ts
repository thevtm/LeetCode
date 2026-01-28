import _ from "lodash";

import { expect, test, describe } from "vitest";

function maxArea(heights: number[]): number {
  let max_area = -Infinity;

  let left = 0;
  let right = heights.length - 1;

  while (left < right) {
    const curr_left_height = heights[left];
    const curr_right_height = heights[right];

    const area = Math.min(curr_left_height, curr_right_height) * (right - left);
    max_area = Math.max(max_area, area);

    if (curr_left_height <= curr_right_height) {
      while (left < right && heights[left] <= curr_left_height) left++;
    } else {
      while (left < right && heights[right] <= curr_right_height) right--;
    }
  }

  return max_area;
}

type SolutionFunction = typeof maxArea;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected_result: 49 },
  { input: [[1, 1]], expected_result: 1 },
  { input: [[1, 2, 4, 3]], expected_result: 4 },
];

const solutions = [{ name: "best", fn: maxArea }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
