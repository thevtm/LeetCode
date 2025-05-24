import _ from "lodash";

import { expect, test, describe } from "vitest";

function findWordsContaining(words: string[], x: string): number[] {
  return words.map((s, i) => (s.includes(x) ? i : -1)).filter((v) => v !== -1);
}

type SolutionFunction = typeof findWordsContaining;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [["leet", "code"], "e"], expected_result: [0, 1] },
  { input: [["abc", "bcd", "aaaa", "cbc"], "a"], expected_result: [0, 2] },
  { input: [["abc", "bcd", "aaaa", "cbc"], "z"], expected_result: [] },
];

const solutions = [{ name: "best", fn: findWordsContaining }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
