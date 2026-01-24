import _ from "lodash";

import { expect, test, describe } from "vitest";

function possibleStringCount(word: string): number {
  let duplicates = 0;

  for (let i = 0; i < word.length - 1; i++) {
    if (word[i] === word[i + 1]) duplicates++;
  }

  return duplicates + 1;
}

type SolutionFunction = typeof possibleStringCount;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["abbcccc"], expected_result: 5 },
  { input: ["abcd"], expected_result: 1 },
  { input: ["aaaa"], expected_result: 4 },
];

const solutions = [{ name: "best", fn: possibleStringCount }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
