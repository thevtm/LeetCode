import _ from "lodash";

import { expect, test, describe } from "vitest";

function longestPalindrome(words: string[]): number {
  const map = new Map<string, number>();

  let count = 0;

  for (const word of words) {
    const reversed_word = word[1] + word[0];

    if ((map.get(reversed_word) ?? 0) === 0) {
      map.set(word, (map.get(word) ?? 0) + 1);
      continue;
    }

    count += 4;
    map.set(reversed_word, map.get(reversed_word)! - 1);
  }

  // Middle one
  for (const [word, freq] of map.entries()) {
    if (freq === 0) continue;
    if (word[0] === word[1]) {
      count += 2;
      break;
    }
  }

  return count;
}

type SolutionFunction = typeof longestPalindrome;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [["lc", "cl", "gg"]], expected_result: 6 },
  { input: [["ab", "ty", "yt", "lc", "cl", "ab"]], expected_result: 8 },
  { input: [["cc", "ll", "xx"]], expected_result: 2 },
  {
    input: [
      [
        "ll",
        "lb",
        "bb",
        "bx",
        "xx",
        "lx",
        "xx",
        "lx",
        "ll",
        "xb",
        "bx",
        "lb",
        "bb",
        "lb",
        "bl",
        "bb",
        "bx",
        "xl",
        "lb",
        "xx",
      ],
    ],
    expected_result: 26,
  },
  {
    input: [
      [
        "mm",
        "mm",
        "yb",
        "by",
        "bb",
        "bm",
        "ym",
        "mb",
        "yb",
        "by",
        "mb",
        "mb",
        "bb",
        "yb",
        "by",
        "bb",
        "yb",
        "my",
        "mb",
        "ym",
      ],
    ],
    expected_result: 30,
  },
  {
    input: [["qo", "fo", "fq", "qf", "fo", "ff", "qq", "qf", "of", "of", "oo", "of", "of", "qf", "qf", "of"]],
    expected_result: 14,
  },
];

const solutions = [{ name: "best", fn: longestPalindrome }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});

/*
[

"fq"
"qf"

"fo"
"of"

"fo"
"of"

"qo"

"of"
"of"
"of"

"qf"
"qf"
"qf"

"qq"
"ff"
"oo"
]
*/
