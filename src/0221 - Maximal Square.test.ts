import _ from "lodash";

import { expect, test, describe } from "vitest";

function maximalSquare(matrix: string[][]): number {
  const m = matrix[0].length;
  const n = matrix.length;

  const horizontal = Array.from({ length: n }, () => Array<number>(m));

  for (let j = 0; j < n; j++) {
    horizontal[j][0] = matrix[j][0] === "1" ? 1 : 0;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      horizontal[j][i] = matrix[j][i] === "1" ? horizontal[j][i - 1] + 1 : 0;
    }
  }

  // console.log("horizontal", horizontal);

  const vertical = Array.from({ length: n }, () => Array<number>(m));

  for (let i = 0; i < m; i++) {
    vertical[0][i] = matrix[0][i] === "1" ? 1 : 0;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 1; j < n; j++) {
      vertical[j][i] = matrix[j][i] === "1" ? vertical[j - 1][i] + 1 : 0;
    }
  }

  // console.log("vertical", vertical);

  let max = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let lsp = Math.min(horizontal[j][i], vertical[j][i]);

      if (lsp <= max) continue;

      for (let k = 1; k < lsp && i - k >= 0 && j - k >= 0; k++) {
        const new_lsp = Math.min(horizontal[j - k][i - k], vertical[j - k][i - k]);
        lsp = Math.min(lsp, new_lsp + k);
      }

      max = Math.max(max, lsp);
    }
  }

  return max * max;
}

type SolutionFunction = typeof maximalSquare;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        ["1", "0", "1", "0", "0"],
        ["1", "0", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "0", "0", "1", "0"],
      ],
    ],
    expected_result: 4,
  },
  {
    input: [
      [
        ["0", "1"],
        ["1", "0"],
      ],
    ],
    expected_result: 1,
  },
  { input: [[["0"]]], expected_result: 0 },
];

const solutions = [{ name: "best", fn: maximalSquare }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
