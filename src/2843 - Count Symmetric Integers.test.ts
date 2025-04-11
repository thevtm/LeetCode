import { expect, test, describe } from "vitest";

function countSymmetricIntegers(low: number, high: number): number {
  const count_digits = (num: number) => (num === 0 ? 0 : Math.floor(Math.log10(num)) + 1);

  const num_to_digits = (num: number): number[] => {
    const digits_count = count_digits(num);
    return Array.from({ length: digits_count }, (_, i) => Math.floor(num / 10 ** (digits_count - i - 1)) % 10);
  };

  //////////////////////////////////////////////////////////////////////////////

  const low_digits_count = count_digits(low);
  const high_digits_count = count_digits(high);

  if (low_digits_count % 2 === 1) low = 10 ** low_digits_count + 1;
  if (high_digits_count % 2 === 1) high = 10 ** (high_digits_count - 1) - 1;

  //////////////////////////////////////////////////////////////////////////////

  let count = 0;

  for (let i = low; i <= high; i++) {
    const digits = num_to_digits(i);

    if (digits.length % 2 === 1) continue;

    let delta = 0;

    for (let i = 0; i < digits.length / 2; i++) {
      delta += digits[i] - digits[digits.length - 1 - i];
    }

    if (delta === 0) {
      count++;
    }
  }

  return count;
}

type SolutionFunction = typeof countSymmetricIntegers;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1, 100], expected_result: 9 },
  { input: [1200, 1230], expected_result: 4 },
];

const solutions = [{ name: "best", fn: countSymmetricIntegers }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
