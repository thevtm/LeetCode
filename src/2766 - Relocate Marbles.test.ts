import _ from "lodash";

import { expect, test, describe } from "vitest";

function relocateMarbles(nums: number[], moveFrom: number[], moveTo: number[]): number[] {
  const positions = new Set(nums);

  for (let i = 0; i < moveFrom.length; i++) {
    positions.delete(moveFrom[i]);
    positions.add(moveTo[i]);
  }

  return Array.from(positions.values()).toSorted((a, b) => a - b);
}

type SolutionFunction = typeof relocateMarbles;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [1, 6, 7, 8],
      [1, 7, 2],
      [2, 9, 5],
    ],
    expected_result: [5, 6, 8, 9],
  },
  {
    input: [
      [1, 1, 3, 3],
      [1, 3],
      [2, 2],
    ],
    expected_result: [2],
  },
];

const solutions = [{ name: "best", fn: relocateMarbles }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
