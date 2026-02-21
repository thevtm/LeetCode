import _ from "lodash";

import { expect, test, describe } from "vitest";

function countPrimeSetBits(left: number, right: number): number {
  const PRIMES_SET = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23]);

  let res = 0;

  for (let i = left; i <= right; i++) {
    const bit_count =
      ((i >> 0) & 1) +
      ((i >> 1) & 1) +
      ((i >> 2) & 1) +
      ((i >> 3) & 1) +
      ((i >> 4) & 1) +
      ((i >> 5) & 1) +
      ((i >> 6) & 1) +
      ((i >> 7) & 1) +
      ((i >> 8) & 1) +
      ((i >> 9) & 1) +
      ((i >> 10) & 1) +
      ((i >> 11) & 1) +
      ((i >> 12) & 1) +
      ((i >> 13) & 1) +
      ((i >> 14) & 1) +
      ((i >> 15) & 1) +
      ((i >> 16) & 1) +
      ((i >> 17) & 1) +
      ((i >> 18) & 1) +
      ((i >> 19) & 1) +
      ((i >> 20) & 1);

    if (PRIMES_SET.has(bit_count)) res++;
  }

  return res;
}

type SolutionFunction = typeof countPrimeSetBits;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [6, 10], expected_result: 4 },
  { input: [10, 15], expected_result: 5 },
];

const solutions = [{ name: "best", fn: countPrimeSetBits }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
