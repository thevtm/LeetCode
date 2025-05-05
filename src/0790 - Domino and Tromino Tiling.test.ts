import _ from "lodash";

import { expect, test, describe } from "vitest";

enum ColumnBlock {
  None,
  Top,
  Bottom,
}

function numTilings(n: number): number {
  const MOD = 1e9 + 7;

  const recur = _.memoize(
    (remainder: number, col: ColumnBlock = ColumnBlock.None): number => {
      if (remainder < 0) {
        return 0;
      }

      if (remainder === 0) {
        return col === ColumnBlock.None ? 1 : 0;
      }

      let count = 0;

      if (col === ColumnBlock.None) {
        count += recur(remainder - 1, ColumnBlock.None); // |
        count += recur(remainder - 2, ColumnBlock.None); // =
        count += recur(remainder - 1, ColumnBlock.Bottom); // L
        count += recur(remainder - 1, ColumnBlock.Top); // ⅂
      } else if (col === ColumnBlock.Bottom) {
        count += recur(remainder - 1, ColumnBlock.Top); // -
        count += recur(remainder - 2, ColumnBlock.None); // ⅂
      } else if (col === ColumnBlock.Top) {
        count += recur(remainder - 1, ColumnBlock.Bottom); // -
        count += recur(remainder - 2, ColumnBlock.None); // L
      } else {
        throw "Unreachable!";
      }

      return count % MOD;
    },
    (...args) => args.join("-")
  );

  return recur(n);
}

type SolutionFunction = typeof numTilings;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1], expected_result: 1 },
  { input: [3], expected_result: 5 },
  { input: [4], expected_result: 11 },
  { input: [5], expected_result: 24 },
  { input: [8], expected_result: 258 },
  { input: [30], expected_result: 312342182 },
];

const solutions = [{ name: "best", fn: numTilings }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
