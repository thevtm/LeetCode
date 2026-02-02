import _ from "lodash";

import { expect, test, describe } from "vitest";

function convertToTitle(columnNumber: number): string {
  const A = "A".charCodeAt(0);
  const Z = "Z".charCodeAt(0);
  const radix = Z - A + 1;

  // Columns start at 1
  let remaining = columnNumber;

  const result: number[] = [];

  do {
    remaining--;
    const digit = remaining % radix;
    remaining = (remaining - digit) / radix;
    result.push(digit);
  } while (remaining > 0);

  return String.fromCharCode(...result.reverse().map((x) => x + A));
}

type SolutionFunction = typeof convertToTitle;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1], expected_result: "A" },
  { input: [28], expected_result: "AB" },
  { input: [701], expected_result: "ZY" },
];

const solutions = [{ name: "best", fn: convertToTitle }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
