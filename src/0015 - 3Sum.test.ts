import _ from "lodash";

import { expect, test, describe } from "vitest";

function threeSum(nums: number[]): [number, number, number][] {
  const frequencies = new Map<number, number>();

  for (const num of nums) frequencies.set(num, (frequencies.get(num) ?? 0) + 1);

  const keys = Array.from(frequencies.keys()).sort((a, b) => a - b);

  // console.log("frequencies", frequencies);
  // console.log("keys", keys);

  const triplets: [number, number, number][] = [];

  for (let i = 0; i < keys.length; i++) {
    const a = keys[i];
    frequencies.set(a, frequencies.get(a)! - 1);

    for (let j = i; j < keys.length; j++) {
      const b = keys[j];
      const bf = frequencies.get(b)!;

      if (bf === 0) continue;

      const c = -1 * (a + b);

      if (c < b) continue;

      if (c === b) {
        if (bf >= 2) triplets.push([a, b, c]);
      } else {
        const cf = frequencies.get(c);
        if (cf !== undefined && cf > 0) triplets.push([a, b, c]);
      }
    }

    frequencies.set(a, frequencies.get(a)! - 1);
  }

  return triplets;
}

type SolutionFunction = typeof threeSum;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [[-1, 0, 1, 2, -1, -4]],
    expected_result: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  { input: [[0, 1, 1]], expected_result: [] },
  { input: [[0, 0, 0]], expected_result: [[0, 0, 0]] },
];

const solutions = [{ name: "best", fn: threeSum }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(JSON.stringify(fn(...input))).toStrictEqual(JSON.stringify(expected_result));
  });
});
