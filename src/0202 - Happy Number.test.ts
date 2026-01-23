import _ from "lodash";

import { expect, test, describe } from "vitest";

function isHappy(n: number): boolean {
  const num_to_digits = (num: number): number[] => {
    const digits_count = num === 0 ? 0 : Math.floor(Math.log10(num)) + 1;
    return Array.from({ length: digits_count }, (_, i) => Math.floor(num / 10 ** (digits_count - i - 1)) % 10);
  };

  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);

    n = num_to_digits(n)
      .map((x) => x * x)
      .reduce((acc, x) => acc + x);
  }

  return n === 1;
}

type SolutionFunction = typeof isHappy;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [19], expected_result: true },
  { input: [2], expected_result: false },
];

const solutions = [{ name: "best", fn: isHappy }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
