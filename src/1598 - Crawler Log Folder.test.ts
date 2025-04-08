import { expect, test, describe } from "vitest";

function minOperations(logs: string[]): number {
  let depth = 0;

  for (const log of logs) {
    if (log === "../") {
      depth = Math.max(0, depth - 1);
    } else if (log === "./") {
      // NOOP
    } else {
      depth++;
    }
  }

  return depth;
}

type SolutionsFunction = typeof minOperations;

type TestCase = {
  input: Parameters<SolutionsFunction>;
  expected_result: ReturnType<SolutionsFunction>;
};

const test_cases: TestCase[] = [
  { input: [["d1/", "d2/", "../", "d21/", "./"]], expected_result: 2 },
  { input: [["d1/", "d2/", "./", "d3/", "../", "d31/"]], expected_result: 3 },
  { input: [["d1/", "../", "../", "../"]], expected_result: 0 },
];

const solutions = [{ name: "minOperations", fn: minOperations }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
