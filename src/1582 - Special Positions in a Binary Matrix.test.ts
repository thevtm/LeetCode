import _ from "lodash";

import { expect, test, describe } from "vitest";

function numSpecial(mat: number[][]): number {
  const m = mat.length;
  const n = mat[0].length;

  const row_sum = _.memoize((row: number): number => mat[row].reduce((acc, v) => acc + v));
  const col_sum = _.memoize((col: number): number => {
    let sum = 0;
    for (let i = 0; i < m; i++) sum += mat[i][col];
    return sum;
  });

  let res = 0;

  for (let i = 0; i < m; i++) {
    // console.log("i", i, "row_sum(i)", row_sum(i));
    if (row_sum(i) !== 1) continue;

    for (let j = 0; j < n; j++) {
      // console.log("\t", "j", j, "col_sum(j)", col_sum(j));
      if (col_sum(j) !== 1) continue;

      if (mat[i][j] === 1) {
        res++;
        break;
      }
    }
  }

  return res;
}

type SolutionFunction = typeof numSpecial;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [1, 0, 0],
        [0, 0, 1],
        [1, 0, 0],
      ],
    ],
    expected_result: 1,
  },
  {
    input: [
      [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
    ],
    expected_result: 3,
  },
  {
    input: [
      [
        [0, 0],
        [0, 0],
        [1, 0],
      ],
    ],
    expected_result: 1,
  },
];

const solutions = [{ name: "best", fn: numSpecial }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
