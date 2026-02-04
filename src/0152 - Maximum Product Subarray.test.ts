import _ from "lodash";

import { expect, test, describe } from "vitest";

function maxProduct(nums: number[]): number {
  let min_prod = nums[0];
  let max_prod = nums[0];

  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    
    const a = min_prod * num;
    const b = max_prod * num;

    min_prod = Math.min(num, a, b);
    max_prod = Math.max(num, a, b);

    result = Math.max(result, max_prod);
  }

  return result;
}

type SolutionFunction = typeof maxProduct;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[2, 3, -2, 4]], expected_result: 6 },
  { input: [[-2, 0, -1]], expected_result: 0 },
  { input: [[-2]], expected_result: -2 },
];

const solutions = [{ name: "best", fn: maxProduct }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
