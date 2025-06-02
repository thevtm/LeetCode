import _ from "lodash";

import { expect, test, describe } from "vitest";

function candy(ratings: number[]): number {
  const n = ratings.length;
  const candies = new Array<number>(n).fill(1);

  while (true) {
    let change_made = false;

    for (let i = 1; i < n; i++) {
      if (ratings[i] > ratings[i - 1] && candies[i] <= candies[i - 1]) {
        candies[i] = candies[i - 1] + 1;
        change_made = true;
      }
    }

    // console.log("candies", candies);

    for (let i = n - 2; i >= 0; i--) {
      if (ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {
        candies[i] = candies[i + 1] + 1;
        change_made = true;
      }
    }

    // console.log("candies", candies);

    if (change_made === false) break;
  }

  return _.sum(candies);
}

type SolutionFunction = typeof candy;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 0, 2]], expected_result: 5 },
  { input: [[1, 2, 2]], expected_result: 4 },
  { input: [[100, 80, 70, 60, 70, 80, 90, 100, 90, 80, 70, 60, 60]], expected_result: 35 },
  { input: [[6, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 1, 0]], expected_result: 42 },
  {
    input: [
      [
        20000, 20000, 16001, 16001, 16002, 16002, 16003, 16003, 16004, 16004, 16005, 16005, 16006, 16006, 16007, 16007,
        16008, 16008, 16009, 16009, 16010, 16010, 16011, 16011, 16012, 16012, 16013, 16013, 16014, 16014, 16015, 16015,
        16016, 16016, 16017, 16017, 16018, 16018, 16019, 16019, 16020, 16020, 16021, 16021, 16022, 16022, 16023, 16023,
        16024, 16024,
      ],
    ],
    expected_result: 74,
  },
];

const solutions = [{ name: "best", fn: candy }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
