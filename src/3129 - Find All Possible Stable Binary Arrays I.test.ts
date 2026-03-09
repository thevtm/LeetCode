import _ from "lodash";

import { expect, test, describe } from "vitest";

function numberOfStableArrays(zero: number, one: number, limit: number): number {
  const MOD = 10 ** 9 + 7;
  
  const dp: number[][][] = Array.from({ length: zero + 1 }, () => Array.from({ length: one + 1 }, () => [0, 0]));

  for (let i = 0; i <= Math.min(zero, limit); i++) {
    dp[i][0][0] = 1;
  }
  for (let j = 0; j <= Math.min(one, limit); j++) {
    dp[0][j][1] = 1;
  }

  for (let i = 1; i <= zero; i++) {
    for (let j = 1; j <= one; j++) {
      if (i > limit) {
        dp[i][j][0] = dp[i - 1][j][0] + dp[i - 1][j][1] - dp[i - limit - 1][j][1];
      } else {
        dp[i][j][0] = dp[i - 1][j][0] + dp[i - 1][j][1];
      }
      dp[i][j][0] = ((dp[i][j][0] % MOD) + MOD) % MOD;
      if (j > limit) {
        dp[i][j][1] = dp[i][j - 1][1] + dp[i][j - 1][0] - dp[i][j - limit - 1][0];
      } else {
        dp[i][j][1] = dp[i][j - 1][1] + dp[i][j - 1][0];
      }
      dp[i][j][1] = ((dp[i][j][1] % MOD) + MOD) % MOD;
    }
  }
  return (dp[zero][one][0] + dp[zero][one][1]) % MOD;
}

function numberOfStableArrays_cache(zero: number, one: number, limit: number): number {
  // TLE

  const MOD = 10n ** 9n + 7n;

  const cache = new Map<string, bigint>();

  const backtrack = (num: number, zeros_rem: number = zero, ones_rem: number = one): bigint => {
    if (zeros_rem === 0 && ones_rem === 0) return 1n;

    const key = `${num},${zeros_rem},${ones_rem}`;
    if (cache.has(key)) return cache.get(key)!;

    const next_num = num === 0 ? 1 : 0;
    const max_same_num = num === 0 ? Math.min(zeros_rem, limit) : Math.min(ones_rem, limit);

    let possibilities = 0n;

    for (let i = 1; i <= max_same_num; i++) {
      const next_zeros_rem = num === 0 ? zeros_rem - i : zeros_rem;
      const next_ones_rem = num === 0 ? ones_rem : ones_rem - i;

      possibilities = possibilities + backtrack(next_num, next_zeros_rem, next_ones_rem);
    }

    cache.set(key, possibilities);
    return possibilities;
  };

  return Number((backtrack(0) + backtrack(1)) % MOD);
}

type SolutionFunction = typeof numberOfStableArrays;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1, 1, 2], expected_result: 2 },
  { input: [1, 2, 1], expected_result: 1 },
  { input: [3, 3, 2], expected_result: 14 },
  { input: [200, 200, 200], expected_result: 14 },
];

const solutions = [
  { name: "best", fn: numberOfStableArrays },
  { name: "cache", fn: numberOfStableArrays_cache },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
