import _ from "lodash";

import { expect, test, describe } from "vitest";

function sortArrayByParity(nums: number[]): number[] {
  const result = [];

  for (const num of nums) if (num % 2 === 0) result.push(num);
  for (const num of nums) if (num % 2 === 1) result.push(num);

  return result;
}

type SolutionFunction = typeof sortArrayByParity;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[3, 1, 2, 4]], expected_result: [2, 4, 3, 1] },
  { input: [[0]], expected_result: [0] },
];

const solutions = [{ name: "best", fn: sortArrayByParity }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
