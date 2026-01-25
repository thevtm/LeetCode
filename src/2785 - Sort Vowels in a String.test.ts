import _ from "lodash";

import { expect, test, describe } from "vitest";

function sortVowels(s: string): string {
  const VOWELS = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"];
  const VOWELS_SET = new Set(VOWELS);
  const VOWELS_ORDER_MAP = new Map<string, number>(VOWELS.map((v, i) => [v, i]));

  const buckets = new Array(VOWELS.length).fill(0);

  for (const c of s) {
    const vowel_index = VOWELS_ORDER_MAP.get(c);
    if (vowel_index === undefined) continue;
    buckets[vowel_index]++;
  }

  const result = s.split("");
  let curr_bucket = 0;

  for (let i = 0; i < s.length; i++) {
    if (!VOWELS_SET.has(s[i])) continue;

    while (buckets[curr_bucket] === 0) curr_bucket++;

    result[i] = VOWELS[curr_bucket];
    buckets[curr_bucket]--;
  }

  return result.join("");
}

type SolutionFunction = typeof sortVowels;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["lEetcOde"], expected_result: "lEOtcede" },
  { input: ["lYmpH"], expected_result: "lYmpH" },
];

const solutions = [{ name: "best", fn: sortVowels }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
