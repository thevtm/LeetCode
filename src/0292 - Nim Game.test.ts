import _ from "lodash";

import { expect, test, describe } from "vitest";

function canWinNim(n: number): boolean {
  return n % 4 !== 0;
}

type SolutionFunction = typeof canWinNim;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [4], expected_result: false },
  { input: [1], expected_result: true },
  { input: [2], expected_result: true },
];

const solutions = [{ name: "best", fn: canWinNim }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
