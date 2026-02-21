import _ from "lodash";

import { expect, test, describe } from "vitest";

function removeDigit(number: string, digit: string): string {
  let last_match_index = -1;

  for (let i = 0; i < number.length; i++) {
    if (number[i] !== digit) continue;

    last_match_index = i;

    if (i + 1 === number.length) continue;

    if (number[i + 1] > number[i]) return number.slice(0, i) + number.slice(i + 1);
  }

  return number.slice(0, last_match_index) + number.slice(last_match_index + 1);
}

function removeDigit_string(number: string, digit: string): string {
  const options = new Array<string>();

  for (let i = 0; i < number.length; i++) {
    if (number[i] !== digit) continue;

    options.push(number.slice(0, i) + number.slice(i + 1));
  }

  options.sort();

  return options[options.length - 1];
}

type SolutionFunction = typeof removeDigit;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["123", "3"], expected_result: "12" },
  { input: ["1231", "1"], expected_result: "231" },
  { input: ["551", "5"], expected_result: "51" },
];

const solutions = [
  { name: "best", fn: removeDigit },
  { name: "string", fn: removeDigit_string },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
