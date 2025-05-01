import { expect, test, describe } from "vitest";
import _ from "lodash";

function maxProfitAssignment(difficulties: number[], profits: number[], workers: number[]): number {
  const dep = (_.zip(difficulties, profits) as [number, number][]).sort((a, b) => b[1]! - a[1]!);

  console.log("difficulties_and_profits", dep);

  workers = workers.sort((a, b) => b - a);

  console.log("workers", workers);

  let profit = 0;
  let dep_it = 0;

  for (let i = 0; i < workers.length; i++) {
    const worker = workers[i];

    while (dep_it < dep.length && worker < dep[dep_it][0]) dep_it++;

    if (dep_it === dep.length) break;

    profit += dep[dep_it][1];
  }

  return profit;
}

type SolutionFunction = typeof maxProfitAssignment;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [2, 4, 6, 8, 10],
      [10, 20, 30, 40, 50],
      [4, 5, 6, 7],
    ],
    expected_result: 100,
  },
  {
    input: [
      [85, 47, 57],
      [24, 66, 99],
      [40, 25, 25],
    ],
    expected_result: 0,
  },
];

const solutions = [{ name: "best", fn: maxProfitAssignment }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
