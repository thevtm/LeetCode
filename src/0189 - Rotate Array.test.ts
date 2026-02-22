import _, { stubFalse } from "lodash";

import { expect, test, describe } from "vitest";

function rotate(nums: number[], k: number): void {
  k = k % nums.length;

  if (k === 0) return;

  const reverse = (arr: number[], start: number, end: number): void => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };

  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
}

type SolutionFunction = typeof rotate;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: number[];
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 3, 4, 5, 6, 7], 3], expected_result: [5, 6, 7, 1, 2, 3, 4] },
  { input: [[-1, -100, 3, 99], 2], expected_result: [3, 99, -1, -100] },
];

const solutions = [{ name: "best", fn: rotate }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    const cloned_input = _.clone(input[0]);

    fn(cloned_input, input[1]);

    expect(cloned_input).toStrictEqual(expected_result);
  });
});

/*

1 2 3 4 k=2
3 4 1 2

1 2 3 4 5 6 7 k = 3
5 6 7 1 2 3 4

4 3 2 1 5 6 7

7 6 5 4 3 2 1


*/
