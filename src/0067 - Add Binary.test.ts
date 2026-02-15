import _ from "lodash";

import { expect, test, describe } from "vitest";

function addBinary(a: string, b: string): string {
  const max_len = Math.max(a.length, b.length);

  const res = new Array<number>(max_len);

  let carry = 0;

  for (let i = 0; i < max_len; i++) {
    const a_num = Number(a[a.length - 1 - i] === "1");
    const b_num = Number(b[b.length - 1 - i] === "1");

    const sum = a_num + b_num + carry;

    res[i] = sum % 2;
    carry = sum >> 1;
  }

  if (carry === 1) res.push(1);

  return res.toReversed().join("");
}

type SolutionFunction = typeof addBinary;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["0", "0"], expected_result: "0" },
  { input: ["0", "1"], expected_result: "1" },
  { input: ["1", "1"], expected_result: "10" },
  { input: ["11", "1"], expected_result: "100" },
  { input: ["1010", "1011"], expected_result: "10101" },
];

const solutions = [{ name: "best", fn: addBinary }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
