import _ from "lodash";

import { expect, test, describe } from "vitest";

function maxPower(s: string): number {
  let max = 1;
  let cur = 1;

  for (let i = 1; i < s.length; i++)
    if (s[i - 1] === s[i]) max = Math.max(max, ++cur);
    else cur = 1;

  return max;
}

type SolutionFunction = typeof maxPower;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["abc"], expected_result: 1 },
  { input: ["leetcode"], expected_result: 2 },
  { input: ["abbcccddddeeeeedcba"], expected_result: 5 },
];

const solutions = [{ name: "best", fn: maxPower }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
