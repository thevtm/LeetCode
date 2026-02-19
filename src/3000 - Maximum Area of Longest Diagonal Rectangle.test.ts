import _ from "lodash";

import { expect, test, describe } from "vitest";

function areaOfMaxDiagonal(dimensions: number[][]): number {
  let diagonal_max = 0;
  let area_max = 0;

  for (const [width, height] of dimensions) {
    const diagonal = Math.sqrt(width ** 2 + height ** 2);

    if (diagonal > diagonal_max) {
      diagonal_max = diagonal;
      area_max = width * height;
    } else if (diagonal === diagonal_max) {
      area_max = Math.max(area_max, width * height);
    }
  }

  return area_max;
}

type SolutionFunction = typeof areaOfMaxDiagonal;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [9, 3],
        [8, 6],
      ],
    ],
    expected_result: 48,
  },
  {
    input: [
      [
        [3, 4],
        [4, 3],
      ],
    ],
    expected_result: 12,
  },
];

const solutions = [{ name: "best", fn: areaOfMaxDiagonal }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
