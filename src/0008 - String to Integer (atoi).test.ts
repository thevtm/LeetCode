import _ from "lodash";

import { expect, test, describe } from "vitest";

function myAtoi(s: string): number {
  let i = 0;

  // 1. Whitespace
  while (s[i] === " ") i++;

  // 2. Signedness
  let sign = 1;

  if (s[i] === "+") {
    i++;
  } else if (s[i] === "-") {
    sign = -1;
    i++;
  }

  // 3. Conversion
  const MIN = -1 * 2 ** 31;
  const MAX = 2 ** 31 - 1;

  const digits_map = new Map([
    ["0", 0],
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
  ]);

  let num = 0;

  while (i < s.length) {
    const digit = digits_map.get(s[i]);

    if (digit === undefined) break;

    num = num * 10 + digit;
    i++;

    if (sign === 1 && num >= MAX) return MAX;
    if (sign === -1 && -num <= MIN) return MIN;
  }

  return num * sign;
}

type SolutionFunction = typeof myAtoi;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["42"], expected_result: 42 },
  { input: [" -042"], expected_result: -42 },
  { input: ["1337c0d3"], expected_result: 1337 },
  { input: ["0-1"], expected_result: 0 },
  { input: ["words and 987"], expected_result: 0 },
  { input: ["-91283472332"], expected_result: -2147483648 },
  { input: ["2147483648"], expected_result: 2147483647 },
];

const solutions = [{ name: "best", fn: myAtoi }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
