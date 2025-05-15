import _ from "lodash";

import { expect, test, describe } from "vitest";

function getWordsInLongestSubsequence(words: string[], groups: number[]): string[] {
  const n = words.length;

  const hamming_distance = (a: string, b: string): number => {
    const min_length = Math.min(a.length, b.length);
    let distance = Math.max(a.length, b.length);

    for (let i = 0; i < min_length; i++) {
      if (a[i] === b[i]) distance--;
    }

    return distance;
  };

  let best: string[] = [];
  const dp = new Array<string[]>(n);

  for (let i = n - 1; i >= 0; i--) {
    let current_best: string[] = [];

    for (let j = i + 1; j < n; j++) {
      if (groups[j] === groups[i]) continue;
      if (words[j].length !== words[i].length) continue;
      if (dp[j].length <= current_best.length) continue;
      if (hamming_distance(words[j], words[i]) !== 1) continue;
      current_best = dp[j];
    }

    current_best = [words[i], ...current_best];
    dp[i] = current_best;

    if (current_best.length > best.length) best = current_best;
  }

  return best;
}

type SolutionFunction = typeof getWordsInLongestSubsequence;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      ["bab", "dab", "cab"],
      [1, 2, 2],
    ],
    expected_result: ["bab", "dab"],
  },
  {
    input: [
      ["a", "b", "c", "d"],
      [1, 2, 3, 4],
    ],
    expected_result: ["a", "b", "c", "d"],
  },
  {
    input: [
      ["cbb", "db", "bdd", "bd"],
      [2, 3, 4, 3],
    ],
    expected_result: ["bd"],
  },
  {
    input: [
      ["bad", "dc", "bc", "ccd", "dd", "da", "cad", "dba", "aba"],
      [9, 7, 1, 2, 6, 8, 3, 7, 2],
    ],
    expected_result: ["dc", "dd", "da"],
  },
];

const solutions = [{ name: "best", fn: getWordsInLongestSubsequence }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
