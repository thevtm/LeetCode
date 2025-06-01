import _ from "lodash";

import { expect, test, describe } from "vitest";

function distributeCandies(n: number, limit: number): number {
  if (3 * limit < n) return 0;
  if (3 * limit === n) return 1;

  let count = 0;

  const min = Math.floor(Math.ceil(n / limit) / 3);
  const max = Math.min(n, limit);

  for (let i = min; i <= max; i++) {
    const remainder = n - i;

    if (remainder > 2 * limit) continue;

    if (remainder > limit) {
      count += 1 + limit * 2 - remainder;
    } else {
      count += 1 + remainder;
    }
  }

  return count;
}

type SolutionFunction = typeof distributeCandies;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [5, 2], expected_result: 3 },
  { input: [3, 3], expected_result: 10 },
  { input: [10007, 20006], expected_result: 100 },
];

const solutions = [{ name: "best", fn: distributeCandies }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
