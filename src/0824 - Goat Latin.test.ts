import _ from "lodash";

import { expect, test, describe } from "vitest";

function toGoatLatin(sentence: string): string {
  const VOWELS = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"];

  const translated_sentence: string[] = [];

  const word_boundaries: number[] = [-1];

  for (let i = 0; i < sentence.length; i++) {
    if (sentence[i] === " ") word_boundaries.push(i);
  }

  word_boundaries.push(sentence.length);

  // console.log(word_boundaries);

  for (let i = 0; i < word_boundaries.length - 1; i++) {
    const word_start = word_boundaries[i] + 1;
    const word_end = word_boundaries[i + 1];

    const first_letter_is_vowel = VOWELS.includes(sentence[word_start]);

    if (first_letter_is_vowel) translated_sentence.push(sentence[word_start]);

    for (let j = word_start + 1; j < word_end; j++) translated_sentence.push(sentence[j]);

    if (!first_letter_is_vowel) translated_sentence.push(sentence[word_start]);

    translated_sentence.push("m");
    translated_sentence.push("a");

    let trailing_a_count = i + 1;
    while (trailing_a_count-- > 0) translated_sentence.push("a");

    translated_sentence.push(" ");
  }

  translated_sentence.pop();

  return translated_sentence.join("");
}

type SolutionFunction = typeof toGoatLatin;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["I speak Goat Latin"], expected_result: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa" },
  {
    input: ["The quick brown fox jumped over the lazy dog"],
    expected_result:
      "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa",
  },
];

const solutions = [{ name: "best", fn: toGoatLatin }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
