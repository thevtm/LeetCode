import { expect, test, describe } from "vitest";

function countFairPairs(nums: number[], lower: number, upper: number): number {
  nums.sort((a, b) => a - b);

  // console.log("lower", lower);
  // console.log("upper", upper);
  // console.log("nums", nums);
  // console.log();

  let count = 0;
  let left = nums.length - 1;
  let right = nums.length - 1;

  for (let i = 0; i < right; i++) {
    const num = nums[i];

    left = Math.max(left, i + 1);

    while (left > i && num + nums[left] >= lower) left--;
    while (right > left && num + nums[right] > upper) right--;

    // console.log("num", num, "left", left, nums[left], "right", right, nums[right]);
    // console.log(num, "right - left", right - left);

    count += right - left;
  }

  return count;
}

function countFairPairs_slow(nums: number[], lower: number, upper: number): number {
  nums.sort((a, b) => a - b);

  // console.log("nums", nums);

  let count = 0;
  let right = nums.length;

  for (let left = 0; left < right; left++) {
    const num_left = nums[left];

    for (let i = left + 1; i < right; i++) {
      const num_right = nums[i];

      const sum = num_left + num_right;

      if (sum < lower) {
        continue;
      } else if (sum > upper) {
        right = i;
        break;
      } else {
        // console.log("pair", num_left, num_right);
        count++;
      }
    }
  }

  return count;
}

type SolutionFunction = typeof countFairPairs;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[-1, 0], 1, 1], expected_result: 0 },
  { input: [[0, 0, 0, 0, 0, 0, 0], 0, 0], expected_result: 21 },
  { input: [[0, 1, 7, 4, 4, 5], 3, 6], expected_result: 6 },
  { input: [[1, 7, 9, 2, 5], 11, 11], expected_result: 1 },
];

const solutions = [
  { name: "best", fn: countFairPairs },
  { name: "slow", fn: countFairPairs_slow },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
