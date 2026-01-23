import _ from "lodash";

import { expect, test, describe } from "vitest";

function sortArrayByParityII(nums: number[]): number[] {
  const result = new Array(nums.length);

  let even_count = 0;
  let odd_count = 0;

  for (const num of nums) {
    if (num % 2 === 0) {
      result[even_count++ * 2] = num;
    } else {
      result[odd_count++ * 2 + 1] = num;
    }
  }

  return result;
}

type SolutionFunction = typeof sortArrayByParityII;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[4, 2, 5, 7]], expected_result: [4, 5, 2, 7] },
  { input: [[2, 3]], expected_result: [2, 3] },
];

const solutions = [{ name: "best", fn: sortArrayByParityII }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
