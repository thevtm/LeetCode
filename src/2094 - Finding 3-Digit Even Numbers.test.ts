import _ from "lodash";

import { expect, test, describe } from "vitest";

function findEvenNumbers(digits: number[]): number[] {
  digits.sort((a, b) => a - b);

  const numbers_set = new Set<number>();
  const numbers = new Array<number>();

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] === 0) continue;
    const a = digits[i] * 100;

    for (let j = 0; j < digits.length; j++) {
      if (j === i) continue;

      const b = digits[j] * 10;

      for (let k = 0; k < digits.length; k++) {
        if (k == i || k === j) continue;

        if (digits[k] % 2 !== 0) continue;

        const num = a + b + digits[k];

        if (numbers_set.has(num)) continue;

        numbers_set.add(num);
        numbers.push(num);
      }
    }
  }

  return numbers;
}

type SolutionFunction = typeof findEvenNumbers;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[2, 1, 3, 0]], expected_result: [102, 120, 130, 132, 210, 230, 302, 310, 312, 320] },
  { input: [[2, 2, 8, 8, 2]], expected_result: [222, 228, 282, 288, 822, 828, 882] },
  { input: [[3, 7, 5]], expected_result: [] },
];

const solutions = [{ name: "best", fn: findEvenNumbers }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
