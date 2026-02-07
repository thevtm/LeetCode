import _ from "lodash";

import { expect, test, describe } from "vitest";

function minimumChairs(s: string): number {
  let max = 0;
  let cur = 0;

  for (let c of s) {
    cur = cur + (c === "E" ? 1 : -1);
    max = Math.max(max, cur);
  }

  return max;
}

type SolutionFunction = typeof minimumChairs;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["EEEEEEE"], expected_result: 7 },
  { input: ["ELELEEL"], expected_result: 2 },
  { input: ["ELEELEELLL"], expected_result: 3 },
];

const solutions = [{ name: "best", fn: minimumChairs }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
