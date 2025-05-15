import _ from "lodash";

import { expect, test, describe } from "vitest";

function getLongestSubsequence(words: string[], groups: number[]): string[] {
  const result: string[] = [words[0]];
  let last_group = groups[0];

  for (let i = 1; i < words.length; i++) {
    if (groups[i] !== last_group) {
      last_group = groups[i];
      result.push(words[i]);
    }
  }

  return result;
}

type SolutionFunction = typeof getLongestSubsequence;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [["c"], [0]], expected_result: ["c"] },
  { input: [["d"], [1]], expected_result: ["d"] },
  {
    input: [
      ["e", "a", "b"],
      [0, 0, 1],
    ],
    expected_result: ["e", "b"],
  },
  {
    input: [
      ["a", "b", "c", "d"],
      [1, 0, 1, 1],
    ],
    expected_result: ["a", "b", "c"],
  },
];

const solutions = [{ name: "best", fn: getLongestSubsequence }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
