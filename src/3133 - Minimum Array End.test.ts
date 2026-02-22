import _ from "lodash";

import { expect, test, describe } from "vitest";

function minEnd(n: number, x: number): number {
  let bn = BigInt(n);
  let bx = BigInt(x);

  bn = bn - 1n;

  let bits_added = 0n;
  let res = 0n;

  while (bx > 0) {
    if (bx & 1n) {
      res |= 1n << bits_added++;
    } else {
      res |= (bn & 1n) << bits_added++;
      bn = bn >> 1n;
    }

    bx = bx >> 1n;
  }

  res = res | (bn << bits_added);

  return Number(res);
}

type SolutionFunction = typeof minEnd;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [3, 4], expected_result: 6 },
  { input: [2, 7], expected_result: 15 },
  { input: [6715154, 7193485], expected_result: 55012476815 },
];

const solutions = [{ name: "best", fn: minEnd }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
