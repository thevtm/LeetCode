import _ from "lodash";

import { expect, test, describe } from "vitest";

function imageSmoother(img: number[][]): number[][] {
  const rows = img.length;
  const cols = img[0].length;

  const result = Array.from({ length: rows }, () => Array<number>(cols).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x_min = Math.max(0, i - 1);
      const y_min = Math.max(0, j - 1);
      const x_max = Math.min(rows - 1, i + 1);
      const y_max = Math.min(cols - 1, j + 1);

      let count = 0;
      let sum = 0;

      for (let x = x_min; x <= x_max; x++) {
        for (let y = y_min; y <= y_max; y++) {
          sum += img[x][y];
          count++;
        }
      }

      result[i][j] = Math.floor(sum / count);
    }
  }

  return result;
}

type SolutionFunction = typeof imageSmoother;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    ],
    expected_result: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  },
  {
    input: [
      [
        [100, 200, 100],
        [200, 50, 200],
        [100, 200, 100],
      ],
    ],
    expected_result: [
      [137, 141, 137],
      [141, 138, 141],
      [137, 141, 137],
    ],
  },
  {
    input: [
      [
        [2, 3, 4],
        [5, 6, 7],
        [8, 9, 10],
        [11, 12, 13],
        [14, 15, 16],
      ],
    ],
    expected_result: [
      [4, 4, 5],
      [5, 6, 6],
      [8, 9, 9],
      [11, 12, 12],
      [13, 13, 14],
    ],
  },
];

const solutions = [{ name: "best", fn: imageSmoother }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
