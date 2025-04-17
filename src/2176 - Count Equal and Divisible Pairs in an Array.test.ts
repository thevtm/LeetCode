import { expect, test, describe } from "vitest";

function countPairs(nums: number[], k: number): number {
  let count = 0;
  const num_indexes = new Map<number, number[]>();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const arr = num_indexes.get(num);

    if (arr === undefined) {
      num_indexes.set(num, [i]);
      continue;
    }

    for (let j of arr) {
      if ((j * i) % k === 0) count++;
    }

    arr.push(i);
  }

  // console.log("num_indexes", num_indexes);

  return count;
}

type SolutionFunction = typeof countPairs;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[3, 1, 2, 2, 2, 1, 3], 2], expected_result: 4 },
  { input: [[1, 2, 3, 4], 1], expected_result: 0 },
];

const solutions = [{ name: "best", fn: countPairs }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
