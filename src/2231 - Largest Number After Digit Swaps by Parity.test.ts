import _ from "lodash";

import { expect, test, describe } from "vitest";

function largestInteger(num: number): number {
  const num_to_digits = (num: number): number[] => {
    const digits_count = num === 0 ? 0 : Math.floor(Math.log10(num)) + 1;
    return Array.from({ length: digits_count }, (_, i) => Math.floor(num / 10 ** (digits_count - i - 1)) % 10);
  };

  const digits_to_num = (digits: number[]): number => digits.reduce((acc, x) => acc * 10 + x, 0);

  const digits = num_to_digits(num);

  for (let i = 0; i < digits.length; i++) {
    const arity = digits[i] % 2;
    let largest_index = i;

    for (let j = i + 1; j < digits.length; j++) {
      if (digits[j] % 2 !== arity) continue;
      if (digits[j] <= digits[largest_index]) continue;

      largest_index = j;
    }

    [digits[i], digits[largest_index]] = [digits[largest_index], digits[i]];
  }

  return digits_to_num(digits);
}

type SolutionFunction = typeof largestInteger;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1234], expected_result: 3412 },
  { input: [65875], expected_result: 87655 },
  { input: [2481], expected_result: 8421 },
];

const solutions = [{ name: "best", fn: largestInteger }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
