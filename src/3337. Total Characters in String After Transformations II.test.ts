import _ from "lodash";

import { expect, test, describe } from "vitest";

function lengthAfterTransformations(s: string, t: number, nums: number[]): number {
  const MOD = BigInt(1e9 + 7);
  const A_CHAR_CODE = "a".charCodeAt(0);
  const ALPHABET_LENGTH = "z".charCodeAt(0) - A_CHAR_CODE + 1;

  const make_matrix = (rows: number, cols: number): bigint[][] =>
    Array.from({ length: rows }, () => Array<bigint>(cols).fill(0n));

  const matrix_dot_product = (a: bigint[][], b: bigint[][]): bigint[][] => {
    const rows = a.length;
    const cols = b[0].length;

    if (a[0].length !== b.length) throw "Incompatible dimensions";

    const result_matrix = make_matrix(rows, cols);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        for (let k = 0; k < b.length; k++) {
          result_matrix[i][j] = (result_matrix[i][j] + a[i][k] * b[k][j]) % MOD;
        }
      }
    }

    return result_matrix;
  };

  const make_identity_matrix = (size: number): bigint[][] => {
    const matrix = make_matrix(size, size);

    for (let i = 0; i < size; i++) {
      matrix[i][i] = 1n;
    }

    return matrix;
  };

  const matrix_fast_exponentiation = (base: bigint[][], exponent: bigint, modulus: bigint): bigint[][] => {
    const size = base.length;

    let result = make_identity_matrix(size);

    while (exponent > 0) {
      if (exponent % 2n === 1n) {
        result = matrix_dot_product(result, base);
      }

      base = matrix_dot_product(base, base);
      exponent >>= 1n;
    }

    return result;
  };

  const nums_matrix = make_matrix(ALPHABET_LENGTH, ALPHABET_LENGTH);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i]; j++) {
      nums_matrix[i][(i + 1 + j) % ALPHABET_LENGTH] += 1n;
    }
  }

  const nums_matrix_exp = matrix_fast_exponentiation(nums_matrix, BigInt(t), MOD);

  const chars_matrix = make_matrix(1, ALPHABET_LENGTH);

  for (const c of s) {
    const char_index = c.charCodeAt(0) - A_CHAR_CODE;
    chars_matrix[0][char_index]++;
  }

  const result_matrix = matrix_dot_product(chars_matrix, nums_matrix_exp);

  return Number(result_matrix[0].reduce((acc, x) => (acc + x) % MOD, 0n));
}

type SolutionFunction = typeof lengthAfterTransformations;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: ["abcyy", 2, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]],
    expected_result: 7,
  },
  {
    input: ["azbk", 1, [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]],
    expected_result: 8,
  },
  {
    input: ["u", 5, [1, 1, 2, 2, 3, 1, 2, 2, 1, 2, 3, 1, 2, 2, 2, 2, 3, 3, 3, 2, 3, 2, 3, 2, 2, 3]],
    expected_result: 55,
  },
  {
    input: ["iwzxmx", 19, [6, 8, 10, 7, 10, 9, 5, 4, 8, 9, 5, 6, 7, 8, 10, 10, 6, 10, 5, 7, 8, 4, 8, 5, 4, 9]],
    expected_result: 774275204,
  },
  {
    input: [
      "mppgvcssluzhipednraxbdfbyn",
      3719,
      [5, 3, 8, 1, 4, 2, 2, 4, 5, 2, 8, 5, 8, 2, 6, 10, 8, 1, 4, 1, 7, 4, 2, 4, 7, 5],
    ],
    expected_result: 467065288,
  },
];

const solutions = [{ name: "best", fn: lengthAfterTransformations }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
