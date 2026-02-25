import _ from "lodash";

import { expect, test, describe } from "vitest";

function sortByBits(arr: number[]): number[] {
  const MAX_NUM = 10 ** 4;

  const num_of_bits = (num: number): number => {
    let count = 0;
    for (let i = 1; i < MAX_NUM && i <= num; i = i << 1) if ((num & i) !== 0) count++;
    return count;
  };

  const sorted_arr = arr.toSorted((a, b) => num_of_bits(a) - num_of_bits(b) || a - b);

  return sorted_arr;
}

type SolutionFunction = typeof sortByBits;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[0, 1, 2, 3, 4, 5, 6, 7, 8]], expected_result: [0, 1, 2, 4, 8, 3, 5, 6, 7] },
  {
    input: [[1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]],
    expected_result: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
  },
];

const solutions = [{ name: "best", fn: sortByBits }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
