import _ from "lodash";

import { expect, test, describe } from "vitest";

function minSessions(tasks: number[], sessionTime: number): number {
  const n = tasks.length;
  const filled_mask = (1 << n) - 1;

  const cache = new Map<number, number>();
  const make_key = (mask: number, remaining_time_in_session: number): number =>
    mask + 65536 * remaining_time_in_session;

  const dp = (mask: number, remaining_time_in_session: number): number => {
    const key = make_key(mask, remaining_time_in_session);
    if (cache.has(key)) return cache.get(key)!;

    if (mask === filled_mask) return 1;

    if (remaining_time_in_session === 0) {
      let i = 0;
      while (((1 << i) & mask) !== 0) i++;

      const task = tasks[i];
      const new_mask = mask | (1 << i);

      const result = 1 + dp(new_mask, sessionTime - task);
      cache.set(key, result);
      return result;
    }

    let min = Infinity;

    for (let i = 0; i < n; i++) {
      if (((1 << i) & mask) !== 0) continue;

      const task = tasks[i];
      const new_mask = mask | (1 << i);

      if (task > remaining_time_in_session) {
        min = Math.min(min, 1 + dp(new_mask, sessionTime - task));
      } else {
        min = Math.min(min, dp(new_mask, remaining_time_in_session - task));
      }
    }

    cache.set(key, min);
    return min;
  };

  return dp(0, 0) - 1;
}

type SolutionFunction = typeof minSessions;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 2, 3], 3], expected_result: 2 },
  { input: [[3, 1, 3, 1, 1], 8], expected_result: 2 },
  { input: [[1, 2, 3, 4, 5], 15], expected_result: 1 },
];

const solutions = [{ name: "best", fn: minSessions }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
