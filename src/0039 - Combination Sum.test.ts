import _ from "lodash";

import { expect, test, describe } from "vitest";

function combinationSum(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);

  const acc: number[] = [];
  let sum: number = 0;
  const result: number[][] = [];

  const backtrack = (index: number = 0): void => {
    if (sum === target) {
      result.push([...acc]);
      return;
    } else if (sum > target) {
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      const n = candidates[i];

      sum += n;
      acc.push(n);

      backtrack(i);

      sum -= n;
      acc.pop();
    }
  };

  backtrack();

  return result;
}

type SolutionFunction = typeof combinationSum;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[2, 3, 6, 7], 7], expected_result: [[2, 2, 3], [7]] },
  {
    input: [[2, 3, 5], 8],
    expected_result: [
      [2, 2, 2, 2],
      [2, 3, 3],
      [3, 5],
    ],
  },
  { input: [[2], 1], expected_result: [] },
];

const solutions = [{ name: "best", fn: combinationSum }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
