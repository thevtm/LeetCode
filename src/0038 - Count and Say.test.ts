import { expect, test, describe } from "vitest";

function countAndSay(n: number): string {
  let result: number[] = [1];

  for (let i = 1; i < n; i++) {
    const new_result: number[] = [];
    let count = 1;

    for (let j = 1; j < result.length; j++) {
      if (result[j - 1] === result[j]) {
        count++;
      } else {
        new_result.push(count);
        new_result.push(result[j - 1]);
        count = 1;
      }
    }

    new_result.push(count);
    new_result.push(result[result.length - 1]);
    result = new_result;
  }

  return result.join("");
}

function countAndSay_recursive(n: number): string {
  if (n === 1) return "1";

  const result: (number | string)[] = [];

  const prev = countAndSay_recursive(n - 1);

  let count = 1;

  for (let i = 1; i < prev.length; i++) {
    if (prev[i - 1] === prev[i]) {
      count++;
    } else {
      result.push(count);
      result.push(prev[i - 1]);
      count = 1;
    }
  }

  result.push(count);
  result.push(prev[prev.length - 1]);

  return result.join("");
}

type SolutionFunction = typeof countAndSay_recursive;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1], expected_result: "1" },
  { input: [2], expected_result: "11" },
  { input: [3], expected_result: "21" },
  { input: [4], expected_result: "1211" },
];

const solutions = [
  { name: "best", fn: countAndSay },
  { name: "recursive", fn: countAndSay_recursive },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
