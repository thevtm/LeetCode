import _ from "lodash";

import { expect, test, describe } from "vitest";

function triangleType(nums: [number, number, number]): string {
  const [a, b, c] = nums;

  const is_triangle = a + b > c && a + c > b && b + c > a;

  if (!is_triangle) {
    return "none";
  } else if (a === b && b === c) {
    return "equilateral";
  } else if (a === b || a === c || b === c) {
    return "isosceles";
  } else {
    return "scalene";
  }
}

type SolutionFunction = typeof triangleType;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[3, 3, 3]], expected_result: "equilateral" },
  { input: [[3, 4, 5]], expected_result: "scalene" },
  { input: [[8, 4, 2]], expected_result: "none" },
  { input: [[8, 4, 4]], expected_result: "none" },
];

const solutions = [{ name: "best", fn: triangleType }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
