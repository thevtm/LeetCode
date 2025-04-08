import * as _ from "lodash";

import { expect, test, describe } from "vitest";

function numPrimeArrangements(n: number): number {
  const MOD = BigInt(1e9 + 7);
  const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

  const primes_count = _.sortedLastIndex(PRIMES, n);
  const non_primes_count = n - primes_count;
  console.log("primes_count", primes_count, "non_primes_count", non_primes_count);

  let primes_factorial = 1n;
  for (let i = 2n; i <= primes_count; i++) primes_factorial = (primes_factorial * i) % MOD;
  console.log("factorial", primes_factorial);

  let non_primes_factorial = 1n;
  for (let i = 2n; i <= non_primes_count; i++) non_primes_factorial = (non_primes_factorial * i) % MOD;
  console.log("non_primes_factorial", non_primes_factorial);

  return Number((primes_factorial * non_primes_factorial) % MOD);
}

type SolutionFunction = typeof numPrimeArrangements;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1], expected_result: 1 },
  { input: [2], expected_result: 1 },
  { input: [3], expected_result: 2 },
  { input: [4], expected_result: 4 },
  { input: [5], expected_result: 12 },
  { input: [100], expected_result: 682289015 },
];

const solutions = [{ name: "numPrimeArrangements", fn: numPrimeArrangements }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});

/*
1 => 1 - 0 = 1
2 => 1 - 1 = 1
3 => 1 - 2 = 2
4 => 2 - 2 = 4
5 => 2 - 3 = 12
*/
