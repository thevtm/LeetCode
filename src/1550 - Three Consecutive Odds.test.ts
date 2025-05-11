import _ from "lodash";

import { expect, test, describe } from "vitest";

function threeConsecutiveOdds(arr: number[]): boolean {
  let odd_counter = 0;

  for (const n of arr) {
    if (n % 2 === 1) odd_counter++;
    else odd_counter = 0;

    if (odd_counter === 3) return true;
  }

  return false;
}

type SolutionFunction = typeof threeConsecutiveOdds;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[2, 6, 4, 1]], expected_result: false },
  { input: [[1, 2, 34, 3, 4, 5, 7, 23, 12]], expected_result: true },
];

const solutions = [{ name: "best", fn: threeConsecutiveOdds }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
