import { expect, test, describe } from "vitest";

function countInterestingSubarrays(nums: number[], modulo: number, k: number): number {
  const satisfy = (n: number): number => (n % modulo === k ? 1 : 0);

  const prefix_sum = new Array<number>(nums.length);
  prefix_sum[0] = satisfy(nums[0]);

  for (let i = 1; i < nums.length; i++) {
    prefix_sum[i] = satisfy(nums[i]) + prefix_sum[i - 1];
  }

  console.log("prefix_sum", prefix_sum);

  //////////////////////////////////////////////////////////////////////////////

  const prefix_sum_mod = prefix_sum.map((x) => ((x % modulo) + modulo) % modulo);

  console.log("prefix_sum_mod", prefix_sum_mod);

  //////////////////////////////////////////////////////////////////////////////

  let count = 0;

  const frequencies = new Map<number, number>();
  frequencies.set(0, 1);

  for (let i = 0; i < prefix_sum_mod.length; i++) {
    const num = prefix_sum_mod[i];

    count += frequencies.get((num - k + modulo) % modulo) ?? 0;

    frequencies.set(num, (frequencies.get(num) ?? 0) + 1);
  }

  console.log("frequencies", frequencies);

  return count;
}

type SolutionFunction = typeof countInterestingSubarrays;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[3, 2, 4], 2, 1], expected_result: 3 },
  { input: [[3, 1, 9, 6], 3, 0], expected_result: 2 },
  { input: [[11, 12, 21, 31], 10, 1], expected_result: 5 },
];

const solutions = [{ name: "best", fn: countInterestingSubarrays }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
