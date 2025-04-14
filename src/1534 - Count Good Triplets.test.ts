import { expect, test, describe } from "vitest";

function countGoodTriplets(arr: number[], a: number, b: number, c: number): number {
  let count = 0;

  for (let i = 0; i < arr.length - 2; i++) {
    for (let j = i + 1; j < arr.length - 1; j++) {
      if (Math.abs(arr[i] - arr[j]) > a) continue;

      for (let k = j + 1; k < arr.length; k++) {
        if (Math.abs(arr[j] - arr[k]) > b) continue;
        if (Math.abs(arr[i] - arr[k]) > c) continue;
        count++;
      }
    }
  }

  return count;
}

type SolutionFunction = typeof countGoodTriplets;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[3, 0, 1, 1, 9, 7], 7, 2, 3], expected_result: 4 },
  { input: [[1, 1, 2, 2, 3], 0, 0, 1], expected_result: 0 },
];

const solutions = [{ name: "best", fn: countGoodTriplets }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
