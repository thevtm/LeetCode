import _ from "lodash";

import { expect, test, describe } from "vitest";

function hammingWeight(n: number): number {
  let bits = 0;

  while (n > 0) {
    n &= n - 1;
    bits++;
  }

  return bits;
}

type SolutionFunction = typeof hammingWeight;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [11], expected_result: 3 },
  { input: [128], expected_result: 1 },
  { input: [2147483645], expected_result: 30 },
];

const solutions = [{ name: "best", fn: hammingWeight }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
