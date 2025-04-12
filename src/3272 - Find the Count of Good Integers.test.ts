// https://leetcode.com/problems/find-the-count-of-good-integers/

import { expect, test, describe } from "vitest";

function countGoodIntegers(n: number, k: number): number {
  // We only need FACTORIAL(0...10)
  const FACTORIAL = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];

  const max_half_length = Math.floor(n / 2);
  const max_index = max_half_length + (n % 2 === 1 ? 1 : 0);

  let acc: number = 0;
  const frequencies = new Array(10).fill(0);
  const visited = new Set<string>();

  let count = 0;

  const backtrack = (index: number = 0): void => {
    if (index === max_index) {
      // Not K divisible
      if (acc % k !== 0) return;

      // Don't recount the same permutations
      const key = frequencies.join("");
      if (visited.has(key)) return;
      visited.add(key);

      // Total Permutations - Leading 0 Permutations = Valid Permutations
      const factorial_frequencies_sum = frequencies.reduce((acc, f) => acc * FACTORIAL[f], 1);

      const total_permutations = FACTORIAL[n] / factorial_frequencies_sum;

      const zeros = frequencies[0];
      const leading_0_permutations =
        zeros === 0 ? 0 : FACTORIAL[n - 1] / (factorial_frequencies_sum / (FACTORIAL[zeros] / FACTORIAL[zeros - 1]));

      count += total_permutations - leading_0_permutations;

      return;
    }

    const min = index === 0 ? 1 : 0;

    for (let i = min; i <= 9; i++) {
      const is_middle = index === max_half_length;
      const num = i * 10 ** index + (is_middle ? 0 : i * 10 ** (n - index - 1));
      const num_digits_added = is_middle ? 1 : 2;

      acc += num;
      frequencies[i] += num_digits_added;

      backtrack(index + 1);

      frequencies[i] -= num_digits_added;
      acc -= num;
    }
  };

  backtrack();

  return count;
}

type SolutionFunction = typeof countGoodIntegers;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [3, 5], expected_result: 27 },
  { input: [1, 4], expected_result: 2 },
  { input: [5, 6], expected_result: 2468 },
  { input: [2, 1], expected_result: 9 },
  { input: [3, 3], expected_result: 69 },
  { input: [5, 1], expected_result: 10935 },
  { input: [10, 1], expected_result: 41457024 },
];

const solutions = [{ name: "best", fn: countGoodIntegers }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
