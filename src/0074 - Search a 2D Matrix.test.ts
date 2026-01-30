import _ from "lodash";

import { expect, test, describe } from "vitest";

function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix[0].length;
  const n = matrix.length;

  let begin = 0;
  let end = m * n - 1;

  while (begin <= end) {
    const mid_point = begin + Math.floor((end - begin) / 2);
    const cell_index = [Math.floor(mid_point / m), mid_point % m];
    const cell_value = matrix[cell_index[0]][cell_index[1]];

    // console.log("begin", begin, "end", end, "mid_point", mid_point, "cell_index", cell_index, "cell_value", cell_value);

    if (cell_value === target) return true;
    else if (cell_value < target) begin = mid_point + 1;
    else end = mid_point - 1;
  }

  console.log("begin", begin, "end", end);

  return false;
}

type SolutionFunction = typeof searchMatrix;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
      ],
      3,
    ],
    expected_result: true,
  },
  {
    input: [
      [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
      ],
      13,
    ],
    expected_result: false,
  },
  {
    input: [[[1, 1]], 2],
    expected_result: false,
  },
  {
    input: [[[1, 3]], 3],
    expected_result: true,
  },
];

const solutions = [{ name: "best", fn: searchMatrix }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
