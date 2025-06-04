import _ from "lodash";

import { expect, test, describe } from "vitest";

function answerString(word: string, numFriends: number): string {
  if (numFriends === 1) return word;

  let top = 0;
  const max_length = word.length - (numFriends - 1);

  for (let i = 1; i < word.length; i++) {
    for (let j = 0; j < max_length && i + j < word.length; j++) {
      if (word[top + j] < word[i + j]) {
        top = i;
        break;
      } else if (word[top + j] > word[i + j]) {
        break;
      }
    }
  }

  return word.substring(top, top + max_length);
}

type SolutionFunction = typeof answerString;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["dbca", 2], expected_result: "dbc" },
  { input: ["gggg", 4], expected_result: "g" },
  { input: ["gh", 1], expected_result: "gh" },
];

const solutions = [{ name: "best", fn: answerString }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
