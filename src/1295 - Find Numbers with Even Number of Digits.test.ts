import { expect, test, describe } from "vitest";

function findNumbers(nums: number[]): number {
  let count = 0;

  for (const num of nums) {
    const digits_count = Math.floor(Math.log10(num)) + 1;
    if (digits_count % 2 === 0) count++;
  }

  return count;
}

type SolutionFunction = typeof findNumbers;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[12, 345, 2, 6, 7896]], expected_result: 2 },
  { input: [[555, 901, 482, 1771]], expected_result: 1 },
  { input: [[100000]], expected_result: 1 },
];

const solutions = [{ name: "best", fn: findNumbers }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
