// https://leetcode.com/problems/count-the-number-of-powerful-integers/

import { expect, test, describe } from "vitest";

import _ from "lodash";

function numberOfPowerfulInt(start: number, finish: number, limit: number, s: string): number {
  const s_num = Number.parseInt(s);

  //////////////////////////////////////////////////////////////////////////////

  const num_to_digits = (num: number): number[] => {
    const digits_count = num === 0 ? 0 : Math.floor(Math.log10(num)) + 1;
    return Array.from({ length: digits_count }, (_, i) => Math.floor(num / 10 ** (digits_count - i - 1)) % 10);
  };

  const finish_digits = num_to_digits(finish);
  const start_digits = num_to_digits(Math.max(start, s_num));
  const suffix_digits = num_to_digits(s_num);

  while (finish_digits.length > start_digits.length) start_digits.unshift(0);

  //////////////////////////////////////////////////////////////////////////////

  const prefix_length = finish_digits.length - s.length;
  const cache = new Array<number>(finish_digits.length);

  const dfs = (i: number = 0, lower_tight: boolean = true, upper_tight: boolean = true): number => {
    if (i === finish_digits.length) return 1;

    if (!lower_tight && !upper_tight && cache[i] !== undefined) return cache[i];

    const min = lower_tight ? start_digits[i] : 0;
    const max = upper_tight ? finish_digits[i] : 9;

    let count = 0;

    if (i < prefix_length) {
      for (let digit = min; digit <= Math.min(limit, max); digit++) {
        count += dfs(i + 1, lower_tight && digit === min, upper_tight && digit === max);
      }
    } else {
      const digit = suffix_digits[i - prefix_length];
      if (digit >= min && digit <= Math.min(limit, max)) {
        count = dfs(i + 1, lower_tight && digit === min, upper_tight && digit === max);
      }
    }

    if (!lower_tight && !upper_tight) cache[i] = count;

    return count;
  };

  return dfs();
}

function numberOfPowerfulInt_slow(start: number, finish: number, limit: number, s: string): number {
  const s_num = Number.parseInt(s);

  //////////////////////////////////////////////////////////////////////////////

  const num_to_digits = (num: number): number[] => {
    const digits_count = num === 0 ? 0 : Math.floor(Math.log10(num)) + 1;
    return Array.from({ length: digits_count }, (_, i) => Math.floor(num / 10 ** (digits_count - i - 1)) % 10);
  };

  //////////////////////////////////////////////////////////////////////////////

  let digits: number[], max_total: number, prefix_length: number;

  const dfs = (i: number = 0, tight: boolean = true, total: number = s_num): number => {
    if (i >= prefix_length) return 1;

    let count = 0;
    const max = tight ? digits[i] : 9;

    const exponent = 10 ** (digits.length - i - 1);

    for (let digit = 0; digit <= Math.min(limit, max); digit++) {
      const new_total = total + digit * exponent;
      if (new_total > max_total) continue;
      count += dfs(i + 1, tight && digit === max, new_total);
    }

    return count;
  };

  digits = num_to_digits(start - 1);
  max_total = start - 1;
  prefix_length = digits.length - s.length;
  const start_powerful_count = max_total < s_num ? 0 : dfs();

  digits = num_to_digits(finish);
  max_total = finish;
  prefix_length = digits.length - s.length;
  const finish_powerful_count = max_total < s_num ? 0 : dfs();

  console.log("start_powerful_count", start_powerful_count, "finish_powerful_count", finish_powerful_count);

  return finish_powerful_count - start_powerful_count;
}

function numberOfPowerfulInt_editorial(start: number, finish: number, limit: number, s: string): number {
  let low = start.toString();
  let high = finish.toString();
  low = low.padStart(high.length, "0"); // align digits
  const pre_len = high.length - s.length; // prefix length
  const memo: number[] = new Array(high.length).fill(-1);

  function dfs(i: number, limit_low: boolean, limit_high: boolean): number {
    // recursive boundary
    if (i === high.length) {
      return 1;
    }
    if (!limit_low && !limit_high && memo[i] !== -1) {
      return memo[i];
    }

    const lo = limit_low ? parseInt(low[i]) : 0;
    const hi = limit_high ? parseInt(high[i]) : 9;
    let res = 0;

    // console.log({ i, lo, hi });

    if (i < pre_len) {
      for (let digit = lo; digit <= Math.min(hi, limit); digit++) {
        res += dfs(i + 1, limit_low && digit === lo, limit_high && digit === hi);
      }
      console.log("<", { i, res, memo });
    } else {
      const x = parseInt(s[i - pre_len]);
      if (lo <= x && x <= Math.min(hi, limit)) {
        res = dfs(i + 1, limit_low && x === lo, limit_high && x === hi);
      }
      console.log(">", { i, res, x, memo, index: i - pre_len });
    }
    if (!limit_low && !limit_high) {
      memo[i] = res;
    }

    return res;
  }

  return dfs(0, true, true);
}

type SolutionFunction = typeof numberOfPowerfulInt;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1, 6000, 4, "124"], expected_result: 5 },
  { input: [15, 215, 6, "10"], expected_result: 2 },
  { input: [1000, 2000, 4, "3000"], expected_result: 0 },
  { input: [20, 1159, 5, "20"], expected_result: 8 },
  { input: [1, 917, 9, "72"], expected_result: 9 },
  { input: [1114, 1864854501, 7, "26"], expected_result: 4194295 },
  { input: [15398, 1424153842, 8, "101"], expected_result: 783790 },
  { input: [697662853, 11109609599885, 6, "5"], expected_result: 16135677999 }, // Very slow
];

const solutions = [
  { name: "best", fn: numberOfPowerfulInt },
  // { name: "slow", fn: numberOfPowerfulInt_slow },
  { name: "editorial", fn: numberOfPowerfulInt_editorial },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
