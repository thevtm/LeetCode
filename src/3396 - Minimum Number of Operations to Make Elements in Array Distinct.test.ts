import { expect, test, describe } from "vitest";

function minimumOperations(nums: number[]): number {
  const last_num_indexes = new Set<number>();

  for (let i = nums.length - 1; i >= 0; i--) {
    if (last_num_indexes.has(nums[i])) return Math.ceil((i + 1) / 3);
    last_num_indexes.add(nums[i]);
  }

  return 0;
}

function minimumOperations_n(nums: number[]): number {
  let last_duplicate_index = -1;
  const last_num_indexes = new Map<number, number>();

  for (const [index, num] of nums.entries()) {
    const last_index = last_num_indexes.get(num);
    if (last_index !== undefined) {
      last_duplicate_index = Math.max(last_duplicate_index, last_index);
    }

    last_num_indexes.set(num, index);
  }

  // console.log("last_duplicate_index", last_duplicate_index);
  // console.log("last_num_indexes", last_num_indexes);

  if (last_duplicate_index === -1) return 0;

  return Math.ceil((last_duplicate_index + 1) / 3);
}

function minimumOperations_hash(nums: number[]): number {
  const nums_frequencies = new Map<number, number>();
  let duplicates_count = 0;

  for (const num of nums) {
    const current_count = nums_frequencies.get(num) ?? 0;
    nums_frequencies.set(num, current_count + 1);

    if (current_count === 1) duplicates_count++;
  }

  // console.log("nums_frequencies", nums_frequencies);
  // console.log("duplicates_count", duplicates_count);

  //////////////////////////////////////////////////////////////////////////////

  let operation_count = 0;
  let it = 0;

  while (duplicates_count > 0) {
    for (let i = it; i < it + 3 && i < nums.length; i++) {
      const current_count = nums_frequencies.get(nums[i])!;
      nums_frequencies.set(nums[i], current_count - 1);
      if (current_count === 2) duplicates_count--;
    }

    it += 3;
    operation_count++;
  }

  return operation_count;
}

type SolutionsFunction = typeof minimumOperations;

type TestCase = {
  input: Parameters<SolutionsFunction>;
  expected_result: ReturnType<SolutionsFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 3, 4, 2, 3, 3, 5, 7]], expected_result: 2 },
  { input: [[4, 5, 6, 4, 4]], expected_result: 2 },
];

const solutions = [
  { name: "minimumOperations", fn: minimumOperations },
  { name: "O(n)", fn: minimumOperations_n },
  { name: "HashMap", fn: minimumOperations_hash },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toBe(expected_result);
  });
});
