import _ from "lodash";

import { expect, test, describe } from "vitest";

function lengthAfterTransformations(s: string, t: number): number {
  const MOD = 1e9 + 7;
  const A_CHAR_CODE = "a".charCodeAt(0);
  const ALPHABET_LENGTH = "z".charCodeAt(0) - A_CHAR_CODE + 1;

  const arr = new Array<number>(ALPHABET_LENGTH).fill(0);

  for (const c of s) {
    const char_index = c.charCodeAt(0) - A_CHAR_CODE;
    arr[char_index]++;
  }

  let z_index = ALPHABET_LENGTH - 1;

  for (let i = 0; i < t; i++) {
    const b_index = (z_index + 1) % ALPHABET_LENGTH;
    arr[b_index] = (arr[b_index] + arr[z_index]) % MOD;
    z_index = (z_index - 1 + ALPHABET_LENGTH) % ALPHABET_LENGTH;
  }

  return _.sum(arr) % MOD;
}

type SolutionFunction = typeof lengthAfterTransformations;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["abcyy", 2], expected_result: 7 },
  { input: ["azbk", 1], expected_result: 5 },
  { input: ["abcdefghijklmnopqrstuvwxyz", 1], expected_result: 27 },
  { input: ["jqktcurgdvlibczdsvnsg", 7517], expected_result: 79033769 },
];

const solutions = [{ name: "best", fn: lengthAfterTransformations }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
