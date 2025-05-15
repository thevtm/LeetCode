import _ from "lodash";

import { expect, test, describe } from "vitest";

function hammingDistance(x: number, y: number): number {
  const MAX_LENGTH = 32;

  const x_bin_str = x.toString(2).padStart(MAX_LENGTH, "0");
  const y_bin_str = y.toString(2).padStart(MAX_LENGTH, "0");

  let count = 0;

  for (let i = 0; i < MAX_LENGTH; i++) {
    if (x_bin_str[i] !== y_bin_str[i]) count++;
  }

  return count;
}

type SolutionFunction = typeof hammingDistance;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1, 4], expected_result: 2 },
  { input: [3, 1], expected_result: 1 },
  { input: [4, 14], expected_result: 2 },
];

const solutions = [{ name: "best", fn: hammingDistance }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
