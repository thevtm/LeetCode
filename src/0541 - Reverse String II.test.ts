import _ from "lodash";

import { expect, test, describe } from "vitest";

function reverseStr(s: string, k: number): string {
  const result = s.split("");

  for (let i = 0; i < s.length; i += 2 * k) {
    let left = i;
    let right = Math.min(i + k, s.length) - 1;

    while (left < right) {
      [result[left], result[right]] = [result[right], result[left]];

      left++;
      right--;
    }
  }

  return result.join("");
}

type SolutionFunction = typeof reverseStr;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["abcdefg", 2], expected_result: "bacdfeg" },
  { input: ["abcd", 2], expected_result: "bacd" },
];

const solutions = [{ name: "best", fn: reverseStr }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
