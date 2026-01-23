import _ from "lodash";

import { expect, test, describe } from "vitest";

function isUgly(n: number): boolean {
  const PRIMES = [2, 3, 5];

  if (n === 0) return false;

  for (const prime of PRIMES) while (n % prime === 0) n /= prime;

  return n === 1;
}

type SolutionFunction = typeof isUgly;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [0], expected_result: false },
  { input: [6], expected_result: true },
  { input: [1], expected_result: true },
  { input: [14], expected_result: false },
];

const solutions = [{ name: "best", fn: isUgly }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
