import _ from "lodash";

import { expect, test, describe } from "vitest";

function canThreePartsEqualSum(arr: number[]): boolean {
  const total = arr.reduce((a, b) => a + b);

  if (total % 3 !== 0) return false;

  const target = total / 3;

  let partition_acc = arr[0];
  let partition_index = 1;

  for (let i = 0; i < 3; i++) {
    while (partition_acc !== target && partition_index < arr.length) partition_acc += arr[partition_index++];

    // console.log("partition_index", partition_index);

    if (partition_acc !== target) return false;

    partition_acc = arr[partition_index++];
  }

  return true;
}

type SolutionFunction = typeof canThreePartsEqualSum;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1]], expected_result: true },
  { input: [[0, 2, 1, -6, 6, 7, 9, -1, 2, 0, 1]], expected_result: false },
  { input: [[3, 3, 6, 5, -2, 2, 5, 1, -9, 4]], expected_result: true },
  { input: [[18, 12, -18, 18, -19, -1, 10, 10]], expected_result: true },
  { input: [[1, -1, 1, -1]], expected_result: false },
];

const solutions = [{ name: "best", fn: canThreePartsEqualSum }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
