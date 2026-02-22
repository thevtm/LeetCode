import _ from "lodash";

import { expect, test, describe } from "vitest";

function smallestRepunitDivByK(k: number): number {
  if (k % 2 === 0) return -1;
  if (k % 5 === 0) return -1;

  let mod = 0;

  for (let i = 0n; i <= k; i++) {
    mod = (mod * 10 + 1) % k;
    if (mod === 0) return Number(i + 1n);
  }

  return -1;
}

type SolutionFunction = typeof smallestRepunitDivByK;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1], expected_result: 1 },
  { input: [2], expected_result: -1 },
  { input: [3], expected_result: 3 },
  { input: [18], expected_result: -1 },
  { input: [99989], expected_result: 99988 },
];

const solutions = [{ name: "best", fn: smallestRepunitDivByK }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
