import _ from "lodash";

import { expect, test, describe } from "vitest";

function reverseOnlyLetters(s: string): string {
  const re = /[a-z]/i;
  const result = s.split("");

  let left = 0;
  let right = result.length - 1;

  while (left < right) {
    while (left < right && re.test(result[left]) === false) left++;
    while (left < right && re.test(result[right]) === false) right--;

    [result[left], result[right]] = [result[right], result[left]];

    left++;
    right--;
  }

  return result.join("");
}

type SolutionFunction = typeof reverseOnlyLetters;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["ab-cd"], expected_result: "dc-ba" },
  { input: ["a-bC-dEf-ghIj"], expected_result: "j-Ih-gfE-dCba" },
  { input: ["Test1ng-Leet=code-Q!"], expected_result: "Qedo1ct-eeLg=ntse-T!" },
];

const solutions = [{ name: "best", fn: reverseOnlyLetters }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
