import _ from "lodash";

import { expect, test, describe } from "vitest";

function sortColors(nums: number[]): void {
  let good_index = nums.length - 1;

  while (good_index !== 0) {
    for (let i = 0; i <= good_index; i++) {
      if (nums[i] > nums[i + 1]) {
        const tmp = nums[i];

        nums[i] = nums[i + 1];
        nums[i + 1] = tmp;
      } else {
        if (i === good_index) good_index--;
      }
    }
  }
}

type SolutionFunction = typeof sortColors;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: number[];
};

const test_cases: TestCase[] = [
  { input: [[2, 0, 2, 1, 1, 0]], expected_result: [0, 0, 1, 1, 2, 2] },
  { input: [[2, 0, 1]], expected_result: [0, 1, 2] },
];

const solutions = [{ name: "best", fn: sortColors }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    fn(...input);
    expect(input[0]).toStrictEqual(expected_result);
  });
});
