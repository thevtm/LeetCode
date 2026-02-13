import _ from "lodash";

import { expect, test, describe } from "vitest";

function hasGroupsSizeX(deck: number[]): boolean {
  if (deck.length === 1) return false;

  const frequencies = deck.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) ?? 0)), new Map<number, number>());

  // console.log("frequencies", frequencies);

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  let divisor = frequencies.entries().next().value![1];

  for (const [_, frequency] of frequencies.entries()) {
    divisor = gcd(divisor, frequency);
    if (divisor === 1) return false;
  }

  return true;
}

type SolutionFunction = typeof hasGroupsSizeX;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 3, 4, 4, 3, 2, 1]], expected_result: true },
  { input: [[1, 1, 1, 2, 2, 2, 3, 3]], expected_result: false },
  { input: [[1]], expected_result: false },
  { input: [[1, 1, 2, 2, 2, 2]], expected_result: true },
];

const solutions = [{ name: "best", fn: hasGroupsSizeX }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
