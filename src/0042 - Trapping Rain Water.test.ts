import _ from "lodash";

import { expect, test, describe } from "vitest";

function trap(heights: number[]): number {
  const highest_left = new Array<number>(heights.length + 1);
  const highest_right = new Array<number>(heights.length + 1);

  highest_left[0] = 0;
  highest_right[highest_right.length - 1] = 0;

  for (let i = 0; i < heights.length; i++) highest_left[i + 1] = Math.max(highest_left[i], heights[i]);
  // console.log("highest_left", highest_left);

  for (let i = heights.length - 1; i >= 0; i--) highest_right[i] = Math.max(highest_right[i + 1], heights[i]);
  // console.log("highest_right", highest_right);

  let sum = 0;

  for (let i = 0; i < heights.length; i++) {
    const height = heights[i];
    const left = highest_left[i];
    const right = highest_right[i];

    sum += Math.max(Math.min(left, right) - height, 0);
  }

  return sum;
}

type SolutionFunction = typeof trap;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected_result: 6 },
  { input: [[4, 2, 0, 3, 2, 5]], expected_result: 9 },
];

const solutions = [{ name: "best", fn: trap }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
