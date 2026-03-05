import _ from "lodash";

import { expect, test, describe } from "vitest";

function minOperations(s: string): number {
  let pattern_01 = 0;
  let pattern_10 = 0;

  for (let i = 0; i < s.length; i++) {
    if (i % 2 === 0) {
      if (s[i] === "1") pattern_01++;
      else pattern_10++;
    } else {
      if (s[i] === "0") pattern_01++;
      else pattern_10++;
    }
  }

  // console.log("pattern_01", pattern_01, "pattern_10", pattern_10);

  return s.length - Math.max(pattern_01, pattern_10);
}

type SolutionFunction = typeof minOperations;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["0100"], expected_result: 1 },
  { input: ["10"], expected_result: 0 },
  { input: ["1111"], expected_result: 2 },
  { input: ["101101111"], expected_result: 4 },
];

const solutions = [{ name: "best", fn: minOperations }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});

/*
  1 0 1 1 0 1 1 1 1
  1 - 1 - 0 - 1 - 1
  - 0 - 1 - 1 - 1 -

  - - - 1 0 1 - 1 - === 4
  1 0 1 - - - 1 - 1 === 5
*/
