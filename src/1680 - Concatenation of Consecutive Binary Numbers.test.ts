import _ from "lodash";

import { expect, test, describe } from "vitest";

function concatenatedBinary(n: number): number {
  const MOD = 10 ** 9 + 7;
  let res = 0;

  for (let i = 1; i <= n; i++) {
    let num = i;
    const num_of_bits = 31 - Math.clz32(num);

    // console.log("i", i, "num_of_bits", num_of_bits);

    for (let j = num_of_bits; j >= 0; j--) {
      const bit = (num & (1 << j)) === 0 ? 0 : 1;
      res = ((res << 1) | bit) % MOD;
      // console.log("\t", "res", res.toString(2));
    }
  }

  return res;
}

type SolutionFunction = typeof concatenatedBinary;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1], expected_result: 1 },
  { input: [3], expected_result: 27 },
  { input: [12], expected_result: 505379714 },
];

const solutions = [{ name: "best", fn: concatenatedBinary }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
