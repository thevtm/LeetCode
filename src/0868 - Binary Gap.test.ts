import _ from "lodash";

import { expect, test, describe } from "vitest";

function binaryGap(n: number): number {
  let max = 0;
  let gap = -Infinity;

  while (n > 0) {
    if ((n & 1) === 1) {
      max = Math.max(max, gap);
      gap = 1;
    } else {
      gap++;
    }

    n = n >> 1;
  }

  return max;
}

type SolutionFunction = typeof binaryGap;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [22], expected_result: 2 },
  { input: [8], expected_result: 0 },
  { input: [5], expected_result: 2 },
];

const solutions = [{ name: "best", fn: binaryGap }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
