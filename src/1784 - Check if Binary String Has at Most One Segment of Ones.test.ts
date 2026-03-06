import _ from "lodash";

import { expect, test, describe } from "vitest";

function checkOnesSegment(s: string): boolean {
  let segment_already_found = false;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1" && (i === 0 || s[i - 1] === "0")) {
      if (segment_already_found) return false;
      else segment_already_found = true;
    }
  }

  return true;
}

type SolutionFunction = typeof checkOnesSegment;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["1001"], expected_result: false },
  { input: ["110"], expected_result: true },
];

const solutions = [{ name: "best", fn: checkOnesSegment }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
