import _ from "lodash";

import { expect, test, describe } from "vitest";

function finalString(s: string): string {
  const res: string[] = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "i") {
      res.push(s[i]);
      continue;
    }

    if (s[i + 1] === "i") {
      i++;
      continue;
    }

    res.reverse();
  }

  return res.join("");
}

type SolutionFunction = typeof finalString;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["string"], expected_result: "rtsng" },
  { input: ["poiinter"], expected_result: "ponter" },
];

const solutions = [{ name: "best", fn: finalString }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
