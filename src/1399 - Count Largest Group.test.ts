import { expect, test, describe } from "vitest";

function countLargestGroup(n: number): number {
  const groups = new Map<number, number>();

  let curr = 0;
  let digits_sum = 0;

  const backtrack = () => {
    const lowest_i = curr === 0 ? 1 : 0;

    for (let i = lowest_i; i <= 9; i++) {
      const new_curr = curr * 10 + i;

      if (new_curr > n) break;

      const old_curr = curr;

      curr = new_curr;
      digits_sum += i;

      groups.set(digits_sum, (groups.get(digits_sum) ?? 0) + 1);

      backtrack();

      digits_sum -= i;
      curr = old_curr;
    }
  };

  backtrack();

  // console.log("groups", groups);

  //////////////////////////////////////////////////////////////////////////////

  let count = 0;
  let max = -Infinity;

  for (const value of groups.values()) {
    if (value > max) {
      count = 1;
      max = value;
    } else if (value === max) {
      count++;
    }
  }

  return count;
}

type SolutionFunction = typeof countLargestGroup;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [13], expected_result: 4 },
  { input: [2], expected_result: 2 },
];

const solutions = [{ name: "best", fn: countLargestGroup }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
