import _ from "lodash";

import { expect, test, describe } from "vitest";

function isPowerOfThree(n: number): boolean {
  // There's another way

  const x = Math.log(n) / Math.log(3);
  const delta = Math.abs(Math.round(x) - x);

  // console.log("x", x, "delta", delta);

  return delta < 1e-12; // Number.EPSILON;
}

type SolutionFunction = typeof isPowerOfThree;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [27], expected_result: true },
  { input: [0], expected_result: false },
  { input: [-1], expected_result: false },
  { input: [45], expected_result: false },
];

const solutions = [{ name: "best", fn: isPowerOfThree }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
