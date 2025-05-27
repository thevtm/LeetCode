import _ from "lodash";

import { expect, test, describe } from "vitest";

function differenceOfSums(n: number, m: number): number {
  let diff = 0;

  for (let i = 1; i <= n; i++)
    if (i % m === 0) diff -= i;
    else diff += i;

  return diff;
}

type SolutionFunction = typeof differenceOfSums;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [10, 3], expected_result: 19 },
  { input: [5, 6], expected_result: 15 },
  { input: [5, 1], expected_result: -15 },
];

const solutions = [{ name: "best", fn: differenceOfSums }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
