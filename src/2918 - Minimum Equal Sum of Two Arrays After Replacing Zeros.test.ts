import _, { sum } from "lodash";

import { expect, test, describe } from "vitest";

function minSum(nums1: number[], nums2: number[]): number {
  const sum1 = _.sum(nums1);
  const sum2 = _.sum(nums2);

  // console.log("sums1", sum1);
  // console.log("sums2", sum2);

  const zeroes1 = _.reduce(nums1, (acc, x) => (x === 0 ? acc + 1 : acc), 0);
  const zeroes2 = _.reduce(nums2, (acc, x) => (x === 0 ? acc + 1 : acc), 0);

  // console.log("zeroes1", zeroes1);
  // console.log("zeroes2", zeroes2);

  if (zeroes1 > 0 && zeroes2 > 0) return Math.max(sum1 + zeroes1, sum2 + zeroes2);

  if (zeroes1 === 0 && sum1 < sum2 + zeroes2) return -1;
  if (zeroes2 === 0 && sum2 < sum1 + zeroes1) return -1;

  return Math.max(sum1, sum2);
}

type SolutionFunction = typeof minSum;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [3, 2, 0, 1, 0],
      [6, 5, 0],
    ],
    expected_result: 12,
  },
  {
    input: [
      [2, 0, 2, 0],
      [1, 4],
    ],
    expected_result: -1,
  },
];

const solutions = [{ name: "best", fn: minSum }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
