import { expect, test, describe } from "vitest";

function subarraysDivByK(nums: number[], k: number): number {
  const prefix_sum = new Array<number>(nums.length);
  prefix_sum[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    prefix_sum[i] = nums[i] + prefix_sum[i - 1];
  }

  console.log("prefix_sum", prefix_sum);

  //////////////////////////////////////////////////////////////////////////////

  const prefix_sum_mod = prefix_sum.map((x) => ((x % k) + k) % k);

  console.log("prefix_sum_mod", prefix_sum_mod);

  //////////////////////////////////////////////////////////////////////////////

  let count = 0;

  const frequencies = new Map<number, number>();
  frequencies.set(0, 1);

  for (let i = 0; i < prefix_sum_mod.length; i++) {
    const mod = prefix_sum_mod[i];

    count += frequencies.get(mod) ?? 0;

    frequencies.set(mod, (frequencies.get(mod) ?? 0) + 1);
  }

  console.log("frequencies", frequencies);

  return count;
}

type SolutionFunction = typeof subarraysDivByK;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[4, 5, 0, -2, -3, 1], 5], expected_result: 7 },
  { input: [[5], 9], expected_result: 0 },
  { input: [[-2], 6], expected_result: 0 },
  { input: [[2, -2, 2, -4], 6], expected_result: 2 },
  { input: [[-1, 2, 9], 2], expected_result: 2 },
  { input: [[-2, 4, -5, 7, 7], 6], expected_result: 1 },
  { input: [[7, -5, 5, -8, -6, 6, -4, 7, -8, -7], 7], expected_result: 11 },
];

const solutions = [{ name: "best", fn: subarraysDivByK }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
