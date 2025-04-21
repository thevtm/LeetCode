import { expect, test, describe } from "vitest";

function numberOfArrays(differences: number[], lower: number, upper: number): number {
  let min = 0;
  let max = 0;
  let previous = 0;

  for (let i = differences.length - 1; i >= 0; i--) {
    const num = previous - differences[i];

    min = Math.min(min, num);
    max = Math.max(max, num);

    previous = num;
  }

  // console.log("min", min, "max", max);

  const sequence_range = upper - lower;
  const difference_range = max - min;

  // console.log("sequence_range", sequence_range, "difference_range", difference_range);

  return Math.max(0, sequence_range - difference_range + 1);
}

type SolutionFunction = typeof numberOfArrays;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, -3, 4], 1, 6], expected_result: 2 },
  { input: [[3, -4, 5, 1, -2], -4, 5], expected_result: 4 },
  { input: [[4, -7, 2], 3, 6], expected_result: 0 },
];

const solutions = [{ name: "best", fn: numberOfArrays }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
