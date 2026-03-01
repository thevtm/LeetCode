import _ from "lodash";

import { expect, test, describe } from "vitest";

function minimumOneBitOperations(n: number): number {
  const bit_count = 31 - Math.clz32(n);
  let operations = 0;

  // console.log("n", n, n.toString(2), "bit_count", bit_count, "operations", operations);

  for (let i = 0; i <= bit_count; i++) {
    if ((n & (1 << i)) === 0) continue;

    operations = 2 ** (i + 1) - 1 - operations;
    // console.log("\t", "i", i, "operations", operations);
  }

  return operations;
}

function minimumOneBitOperations_does_not_work(n: number): number {
  let operations = 0;

  while (n > 1) {
    const left_most_bit_index = 31 - Math.clz32(n);
    let i = left_most_bit_index;

    // console.log("n", n.toString(2), "left_most_bit_index", left_most_bit_index);

    while (i > 0) {
      const i0_bit = (n & (1 << i)) !== 0 ? 1 : 0;
      const i1_bit = (n & (1 << (i - 1))) !== 0 ? 1 : 0;
      const i2_bit = i - 2 < 0 ? 0 : (n & (1 << (i - 2))) !== 0 ? 1 : 0;

      // console.log("\t", "i", i, "i0_bit", i0_bit, "i1_bit", i1_bit, "i2_bit", i2_bit);

      if (i0_bit === 1 && i1_bit === 1 && i2_bit === 0) break;
      i--;
    }

    // console.log("");

    if (i === 0) {
      // 1st operation
      const new_n = n | 1;
      // console.log("\t", "1st", n, "=>", new_n);
      n = new_n;
    } else {
      // 2nd operation
      const new_n = n & (n & (1 << i));
      // console.log("\t", "2nd", n, "=>", new_n, "i", i);
      n = new_n;
    }

    operations++;
  }

  if (n === 1) operations++;

  return operations;
}

type SolutionFunction = typeof minimumOneBitOperations;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1], expected_result: 1 },
  { input: [2], expected_result: 3 },
  { input: [3], expected_result: 2 },
  { input: [6], expected_result: 4 },
  { input: [7], expected_result: 5 },
  // { input: [9], expected_result: 14 },
  // { input: [16], expected_result: 31 },
  // { input: [24], expected_result: 16 },
];

const solutions = [{ name: "best", fn: minimumOneBitOperations }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});

/*
 2 =>  3
 3 =>  2
 4 =>  7
 7 =>  5
 8 => 15
15 => 10
16 => 31
31 => 21



1  1
2  2
3  5
4 10
5 21
6 42
7 85

1
  0

10
  11
  01
  00

100
  101
  111
  110
  010
  011
  001
  000

1001
1011
1010
1110
1111

*/
