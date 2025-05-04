import _ from "lodash";

import { expect, test, describe } from "vitest";

function numEquivDominoPairs(dominoes: number[][]): number {
  let count = 0;

  const dominoes_freq = new Map<number, number>();

  for (const [a, b] of dominoes) {
    const id = a <= b ? b * 10 + a : a * 10 + b;
    const freq = dominoes_freq.get(id) ?? 0;

    count += freq;

    dominoes_freq.set(id, freq + 1);
  }

  return count;
}

type SolutionFunction = typeof numEquivDominoPairs;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [1, 2],
        [2, 1],
        [3, 4],
        [5, 6],
      ],
    ],
    expected_result: 1,
  },
  {
    input: [
      [
        [1, 2],
        [1, 2],
        [1, 1],
        [1, 2],
        [2, 2],
      ],
    ],
    expected_result: 3,
  },
];

const solutions = [{ name: "best", fn: numEquivDominoPairs }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
