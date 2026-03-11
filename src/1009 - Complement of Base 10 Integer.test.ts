import _ from "lodash";

import { expect, test, describe } from "vitest";

function bitwiseComplement(n: number): number {
  if (n === 0) return 1;

  const bit_count = 31 - Math.clz32(n) + 1;
  const mask = 2 ** bit_count - 1;

  return Math.abs(~n & mask);
}

type SolutionFunction = typeof bitwiseComplement;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [0], expected_result: 1 },
  { input: [5], expected_result: 2 },
  { input: [7], expected_result: 0 },
  { input: [10], expected_result: 5 },
];

const solutions = [{ name: "best", fn: bitwiseComplement }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
