import _ from "lodash";

import { expect, test, describe } from "vitest";

function countOdds(low: number, high: number): number {
  return Math.floor((high - low) / 2) + (low % 2 === 1 || high % 2 === 1 ? 1 : 0);
}

type SolutionFunction = typeof countOdds;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [3, 7], expected_result: 3 },
  { input: [8, 10], expected_result: 1 },
];

const solutions = [{ name: "best", fn: countOdds }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
