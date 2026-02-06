import _ from "lodash";

import { expect, test, describe } from "vitest";

function jump(nums: number[]): number {
  const jumps = new Array(nums.length).fill(Infinity);
  jumps[0] = 0;

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i] && i + j + 1 < nums.length; j++) {
      jumps[i + j + 1] = Math.min(jumps[i + j + 1], jumps[i] + 1);
    }
  }

  return jumps[jumps.length - 1];
}

type SolutionFunction = typeof jump;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[2, 3, 1, 1, 4]], expected_result: 2 },
  { input: [[2, 3, 0, 1, 4]], expected_result: 2 },
];

const solutions = [{ name: "best", fn: jump }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
