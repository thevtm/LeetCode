import _ from "lodash";
import { start } from "repl";

import { expect, test, describe } from "vitest";

function decodeAtIndex(s: string, k: number): string {
  const A = "a".charCodeAt(0);
  const Z = "z".charCodeAt(0);

  const letters = new Array<string>();
  const nums = new Array<[number, number]>();

  let nums_count = 0;

  for (let i = 0; i < s.length; i++) {
    const char_code = s.charCodeAt(i);

    if (char_code >= A && char_code <= Z) {
      letters.push(s[i]);
    } else {
      const end_index = i - nums_count;
      const num = parseInt(s[i], 10);
      nums_count++;

      if (nums_count === 1) {
        nums.push([end_index, num * end_index]);
        continue;
      }

      const [start_index, prev_length] = nums[nums.length - 1];

      if (end_index === start_index) {
        nums[nums.length - 1][1] *= num;
      } else {
        const section_length = end_index - start_index;
        const length = (prev_length + section_length) * num;

        nums.push([end_index, length]);
      }
    }
  }

  // console.log("letters", letters);
  // console.log("nums", nums);

  if (nums.length === 0) {
    return letters[k - 1];
  }

  const recur = (k: number, num_index: number): string => {
    const [end_index, length] = nums[num_index];
    const [start_index, prev_length] = num_index === 0 ? [0, 0, 0] : nums[num_index - 1];
    const section_length = end_index - start_index;

    // console.log("num_index", num_index, "k", k);

    if (k >= length) return recur(k, num_index + 1);
    if (k < prev_length) return recur(k, num_index - 1);

    // Is it in the first letters before repeating?
    const first_section_last_index = prev_length + section_length;

    if (k < first_section_last_index) {
      // console.log("k", k, "first_section_last_index", first_section_last_index);
      return letters[k - prev_length + start_index];
    }

    // It's in the repeating section
    const repeat_length = prev_length + section_length;
    const repeat_start_index = prev_length + section_length;
    const repeat_index = (k - repeat_start_index) % repeat_length;

    if (repeat_index >= prev_length) return letters[start_index - prev_length + repeat_index];

    return recur(repeat_index, num_index - 1);
  };

  return recur(k - 1, 0);
}

type SolutionFunction = typeof decodeAtIndex;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["a2b3", 1], expected_result: "a" },
  { input: ["a2b3", 2], expected_result: "a" },
  { input: ["a2b3", 3], expected_result: "b" },
  { input: ["a2b3", 4], expected_result: "a" },
  { input: ["a2b3", 5], expected_result: "a" },
  { input: ["a2b3", 6], expected_result: "b" },
  { input: ["a2b3", 7], expected_result: "a" },
  { input: ["a2b3", 8], expected_result: "a" },
  { input: ["a2b3", 9], expected_result: "b" },
  { input: ["leet2code3", 10], expected_result: "o" },
  { input: ["ha22", 5], expected_result: "h" },
  { input: ["a2345678999999999999999", 1], expected_result: "a" },
  { input: ["vk6u5xhq9v", 554], expected_result: "k" },
];

const solutions = [{ name: "best", fn: decodeAtIndex }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
