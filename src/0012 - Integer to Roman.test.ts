import _ from "lodash";

import { expect, test, describe } from "vitest";

function intToRoman(num: number): string {
  const output: string[] = [];

  let remaining = num;
  let decimals = 10 ** Math.floor(Math.log10(num));

  const roman_num = (digit: number, one: string, five: string, ten: string): string => {
    if (digit === 0) return "";
    else if (digit === 1) return one;
    else if (digit === 2) return one + one;
    else if (digit === 3) return one + one + one;
    else if (digit === 4) return one + five;
    else if (digit === 5) return five;
    else if (digit === 6) return five + one;
    else if (digit === 7) return five + one + one;
    else if (digit === 8) return five + one + one + one;
    else if (digit === 9) return one + ten;

    throw "Unreachable!";
  };

  while (decimals >= 1) {
    const digit = Math.floor(remaining / decimals);
    remaining = remaining % decimals;

    if (decimals === 1000) {
      output.push(roman_num(digit, "M", "!", "!"));
    } else if (decimals === 100) {
      output.push(roman_num(digit, "C", "D", "M"));
    } else if (decimals === 10) {
      output.push(roman_num(digit, "X", "L", "C"));
    } else {
      output.push(roman_num(digit, "I", "V", "X"));
    }

    decimals = decimals / 10;
  }

  return output.join("");
}

type SolutionFunction = typeof intToRoman;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [3749], expected_result: "MMMDCCXLIX" },
  { input: [58], expected_result: "LVIII" },
  { input: [1994], expected_result: "MCMXCIV" },
];

const solutions = [{ name: "best", fn: intToRoman }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
