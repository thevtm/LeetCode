import { expect, test, describe } from "vitest";

function findContentChildren(g: number[], s: number[]): number {
  g.sort((a, b) => b - a);
  s.sort((a, b) => b - a);

  let count = 0;
  let s_idx = 0;

  for (let g_idx = 0; g_idx < g.length && s_idx < s.length; g_idx++) {
    if (g[g_idx] <= s[s_idx]) {
      count++;
      s_idx++;
    }
  }

  return count;
}

type SolutionFunction = typeof findContentChildren;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [1, 2, 3],
      [1, 1],
    ],
    expected_result: 1,
  },
  {
    input: [
      [1, 2],
      [1, 2, 3],
    ],
    expected_result: 2,
  },
];

const solutions = [{ name: "best", fn: findContentChildren }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
