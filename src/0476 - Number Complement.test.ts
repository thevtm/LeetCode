import _ from "lodash";

import { expect, test, describe } from "vitest";

function findComplement(num: number): number {
  if (num === 0) return 1;

  const highest_bit_index = 31 - Math.clz32(num);
  const mask = 2 ** (highest_bit_index + 1) - 1;

  return Math.abs(num ^ mask);
}

type SolutionFunction = typeof findComplement;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1], expected_result: 0 },
  { input: [5], expected_result: 2 },
];

const solutions = [{ name: "best", fn: findComplement }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
