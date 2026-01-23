import _ from "lodash";

import { expect, test, describe } from "vitest";

function countDigits(num: number): number {
  let remainder = num;
  let count = 0;

  while (remainder > 0) {
    const digit = remainder % 10;
    remainder = (remainder - digit) / 10;

    if (num % digit === 0) count++;
  }

  return count;
}

type SolutionFunction = typeof countDigits;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [7], expected_result: 1 },
  { input: [121], expected_result: 2 },
  { input: [1248], expected_result: 4 },
];

const solutions = [{ name: "best", fn: countDigits }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
