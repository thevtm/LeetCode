import _ from "lodash";

import { expect, test, describe } from "vitest";

function findKthBit(n: number, k: number): string {
  const s = [0];

  for (let i = 1; i <= n; i++) {
    s.push(1);

    for (let j = s.length - 1 - 1; j >= 0; j--) s.push(s[j] === 0 ? 1 : 0);

    if (s.length >= k) return s[k - 1].toString();
  }

  throw "Unreachable!";
}

type SolutionFunction = typeof findKthBit;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [3, 1], expected_result: "0" },
  { input: [4, 11], expected_result: "1" },
];

const solutions = [{ name: "best", fn: findKthBit }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
