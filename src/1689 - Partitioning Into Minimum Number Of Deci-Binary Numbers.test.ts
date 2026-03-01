import _ from "lodash";

import { expect, test, describe } from "vitest";

function minPartitions(n: string): number {
  let max = "";

  for (const d of n) {
    if (d === "9") return 9;
    if (d > max) max = d;
  }

  return parseInt(max);
}

type SolutionFunction = typeof minPartitions;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["32"], expected_result: 3 },
  { input: ["82734"], expected_result: 8 },
  { input: ["27346209830709182346"], expected_result: 9 },
];

const solutions = [{ name: "best", fn: minPartitions }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
