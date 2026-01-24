import _ from "lodash";

import { expect, test, describe } from "vitest";

function reverseVowels(s: string): string {
  const VOWELS = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

  const result = s.split("");

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && VOWELS.has(result[left]) === false) left++;
    while (left < right && VOWELS.has(result[right]) === false) right--;

    [result[left], result[right]] = [result[right], result[left]];

    left++;
    right--;
  }

  return result.join("");
}

type SolutionFunction = typeof reverseVowels;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["IceCreAm"], expected_result: "AceCreIm" },
  { input: ["leetcode"], expected_result: "leotcede" },
];

const solutions = [{ name: "best", fn: reverseVowels }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
