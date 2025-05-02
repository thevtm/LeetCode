import _ from "lodash";
import { expect, test, describe } from "vitest";

function pushDominoes(dominoes: string): string {
  let arr_a = dominoes.split("");
  let arr_b: string[] = [];

  let changed = true;

  while (changed) {
    changed = false;
    arr_b = _.clone(arr_a);

    for (let i = 0; i < arr_a.length; i++) {
      if (arr_a[i] !== ".") continue;
      if (arr_a[i - 1] === "R" && arr_a[i + 1] !== "L") {
        arr_b[i] = "R";
        changed = true;
      } else if (arr_a[i + 1] === "L" && arr_a[i - 1] !== "R") {
        arr_b[i] = "L";
        changed = true;
      }
    }

    arr_a = arr_b;
  }

  return arr_a.join("");
}

type SolutionFunction = typeof pushDominoes;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["RR.L"], expected_result: "RR.L" },
  { input: [".L.R...LR..L.."], expected_result: "LL.RR.LLRRLL.." },
];

const solutions = [{ name: "best", fn: pushDominoes }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
