// https://www.spoj.com/problems/PR003004/

import { expect, test, describe } from "vitest";

function digit_sum(a: number, b: number): number {
  const num_to_digits = (num: number): number[] => {
    const digits_count = num === 0 ? 0 : Math.floor(Math.log10(num)) + 1;
    return Array.from({ length: digits_count }, (_, i) => Math.floor(num / 10 ** (digits_count - i - 1)) % 10);
  };

  const a_digits: number[] = num_to_digits(a - 1);
  const b_digits: number[] = num_to_digits(b);

  console.log("a_digits", a_digits);
  console.log("b_digits", b_digits);

  //////////////////////////////////////////////////////////////////////////////

  const dfs = (digits: number[], i: number, tight: boolean, sum: number): number => {
    if (i === digits.length) return sum;

    let answer = 0;
    const limit = tight ? digits[i] : 9;

    for (let digit = 0; digit <= limit; digit++) {
      answer += dfs(digits, i + 1, tight && digit === limit, sum + digit);
    }

    return answer;
  };

  const a_sum = dfs(a_digits, 0, true, 0);
  const b_sum = dfs(b_digits, 0, true, 0);

  return b_sum - a_sum;
}

type SolutionFunction = typeof digit_sum;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [0, 10], expected_result: 46 },
  { input: [28, 31], expected_result: 28 },
  { input: [1234, 56789], expected_result: 1128600 },
];

const solutions = [{ name: "best", fn: digit_sum }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
