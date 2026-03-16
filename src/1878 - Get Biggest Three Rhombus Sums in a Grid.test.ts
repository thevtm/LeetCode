import _ from "lodash";

import { expect, test, describe } from "vitest";

type Point2D = [number, number];

function getBiggestThree(grid: number[][]): number[] {
  const rows = grid.length;
  const cols = grid[0].length;

  const val = (p: Point2D): number => grid[p[0]][p[1]];

  // Right Prefix Sum

  const grid_prefix_sum_right = Array.from({ length: rows }, () => Array<number>(cols).fill(0));

  for (let i = 0; i < rows; i++) grid_prefix_sum_right[i][cols - 1] = grid[i][cols - 1];
  for (let j = 0; j < cols; j++) grid_prefix_sum_right[0][j] = grid[0][j];

  for (let i = 1; i < rows; i++) {
    for (let j = 0; j < cols - 1; j++) {
      grid_prefix_sum_right[i][j] = grid[i][j] + grid_prefix_sum_right[i - 1][j + 1];
    }
  }

  const sum_right = (left: Point2D, right: Point2D): number =>
    grid_prefix_sum_right[left[0]][left[1]] -
    (right[0] > 0 && right[1] < cols - 1 ? grid_prefix_sum_right[right[0] - 1][right[1] + 1] : 0);

  // Left Prefix Sum

  const grid_prefix_sum_left = Array.from({ length: rows }, () => Array<number>(cols).fill(0));

  for (let i = 0; i < rows; i++) grid_prefix_sum_left[i][0] = grid[i][0];
  for (let j = 0; j < cols; j++) grid_prefix_sum_left[0][j] = grid[0][j];

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      grid_prefix_sum_left[i][j] = grid[i][j] + grid_prefix_sum_left[i - 1][j - 1];
    }
  }

  const sum_left = (left: Point2D, right: Point2D): number =>
    grid_prefix_sum_left[left[0]][left[1]] -
    (right[0] > 0 && right[1] > 0 ? grid_prefix_sum_left[right[0] - 1][right[1] - 1] : 0);

  // Calculate the Rhombus Sums

  const sums = new Set<number>();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const max_width = Math.min(j, cols - 1 - j);
      const max_height = Math.floor((rows - 1 - i) / 2);
      const max_size = Math.min(max_width, max_height);

      const top: Point2D = [i, j];

      // Size === 0
      sums.add(val(top));

      for (let hs = 1; hs <= max_size; hs++) {
        const left: Point2D = [i + hs, j - hs];
        const right: Point2D = [i + hs, j + hs];
        const bottom: Point2D = [i + hs + hs, j];

        const sum =
          sum_left(right, top) +
          sum_right(left, top) +
          sum_left(bottom, left) +
          sum_right(bottom, right) -
          val(top) -
          val(right) -
          val(bottom) -
          val(left);

        sums.add(sum);
      }
    }
  }

  return [...sums].sort((a, b) => b - a).slice(0, 3);
}

type SolutionFunction = typeof getBiggestThree;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [3, 4, 5, 1, 3],
        [3, 3, 4, 2, 3],
        [20, 30, 200, 40, 10],
        [1, 5, 5, 4, 1],
        [4, 3, 2, 2, 5],
      ],
    ],
    expected_result: [228, 216, 211],
  },
  {
    input: [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    ],
    expected_result: [20, 9, 8],
  },
  { input: [[[7, 7, 7]]], expected_result: [7] },
];

const solutions = [{ name: "best", fn: getBiggestThree }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
