import { expect, test, describe } from "vitest";

function countGoodNumbers(n: number): number {
  const MOD = BigInt(1e9 + 7);

  const half = n / 2;
  const evens = BigInt(Math.floor(half));
  const odds = BigInt(Math.ceil(half));

  // console.log("half", half, "evens", evens, "odds", odds);

  const fast_modular_exponentiation = (base: bigint, exponent: bigint, modulus: bigint): bigint => {
    base = base % modulus;

    let result = 1n;

    while (exponent > 0) {
      if (exponent % 2n === 1n) {
        result = (result * base) % modulus;
      }

      base = (base * base) % modulus;
      exponent /= 2n;
    }

    return result;
  };

  const count = (fast_modular_exponentiation(5n, odds, MOD) * fast_modular_exponentiation(4n, evens, MOD)) % MOD;

  return Number(count);
}

type SolutionFunction = typeof countGoodNumbers;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1], expected_result: 5 },
  { input: [4], expected_result: 400 },
  { input: [50], expected_result: 564908303 },
  { input: [806166225460393], expected_result: 643535977 },
];

const solutions = [{ name: "best", fn: countGoodNumbers }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
