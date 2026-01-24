import _ from "lodash";

import { expect, test, describe } from "vitest";

function findWords(words: string[]): string[] {
  const kb_row_map = new Map<string, number>();

  "qwertyuiop".split("").map((x) => kb_row_map.set(x, 0));
  "asdfghjkl".split("").map((x) => kb_row_map.set(x, 1));
  "zxcvbnm".split("").map((x) => kb_row_map.set(x, 2));

  const result: string[] = [];

  Outer: for (const word of words) {
    const word_lower_case = word.toLowerCase();
    const first_letter_row = kb_row_map.get(word_lower_case[0]);

    for (let i = 1; i < word_lower_case.length; i++) {
      if (first_letter_row !== kb_row_map.get(word_lower_case[i])) continue Outer;
    }

    result.push(word);
  }

  return result;
}

type SolutionFunction = typeof findWords;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [["Hello", "Alaska", "Dad", "Peace"]], expected_result: ["Alaska", "Dad"] },
  { input: [["omk"]], expected_result: [] },
  { input: [["adsdf", "sfd"]], expected_result: ["adsdf", "sfd"] },
];

const solutions = [{ name: "best", fn: findWords }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
