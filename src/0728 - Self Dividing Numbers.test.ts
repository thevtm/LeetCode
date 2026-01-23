import _ from "lodash";

import { expect, test, describe } from "vitest";

function selfDividingNumbers(left: number, right: number): number[] {
  const num_to_digits = (num: number): number[] => {
    const digits_count = num === 0 ? 0 : Math.floor(Math.log10(num)) + 1;
    return Array.from({ length: digits_count }, (_, i) => Math.floor(num / 10 ** (digits_count - i - 1)) % 10);
  };

  const is_self_dividing = (n: number): boolean => {
    if (n < 10) return true;

    const digits = num_to_digits(n);

    for (const digit of digits) {
      if (n % digit !== 0) return false;
    }

    return true;
  };

  const result: number[] = [];

  for (let i = left; i <= right; i++) {
    if (is_self_dividing(i)) result.push(i);
  }

  return result;
}

type SolutionFunction = typeof selfDividingNumbers;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1, 22], expected_result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22] },
  { input: [47, 85], expected_result: [48, 55, 66, 77] },
];

const solutions = [{ name: "best", fn: selfDividingNumbers }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
