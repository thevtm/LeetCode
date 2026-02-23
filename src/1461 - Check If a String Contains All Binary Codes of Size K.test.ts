import _ from "lodash";

import { expect, test, describe } from "vitest";

function hasAllCodes(s: string, k: number): boolean {
  const set = new Set<string>();

  for (let i = 0; i <= s.length - k; i++) {
    set.add(s.slice(i, i + k));
  }

  return set.size === 2 ** k;
}

type SolutionFunction = typeof hasAllCodes;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["00110110", 2], expected_result: true },
  { input: ["0110", 1], expected_result: true },
  { input: ["0110", 2], expected_result: false },
];

const solutions = [{ name: "best", fn: hasAllCodes }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
