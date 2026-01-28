import _ from "lodash";

import { expect, test, describe } from "vitest";

function reverse(x: number): number {
  const sign = Math.sign(x);
  let reversed_num = 0;
  let remainder = Math.abs(x);

  while (remainder > 0) {
    const digit = remainder % 10;
    remainder = (remainder - digit) / 10;

    if (digit === 0 && reversed_num === 0) {
      continue;
    }

    reversed_num = reversed_num * 10 + digit;
  }

  if (reversed_num > Math.pow(2, 31)) {
    return 0;
  }

  return reversed_num * sign;
}

type SolutionFunction = typeof reverse;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [123], expected_result: 321 },
  { input: [-123], expected_result: -321 },
  { input: [120], expected_result: 21 },
];

const solutions = [{ name: "best", fn: reverse }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
