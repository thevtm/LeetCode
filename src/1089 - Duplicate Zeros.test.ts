import _ from "lodash";

import { expect, test, describe } from "vitest";

function duplicateZeros(arr: number[]): void {
  const total_zeroes = arr.reduce((acc, x) => (x === 0 ? acc + 1 : acc), 0);
  // console.log("total_zeroes", total_zeroes);

  let curr_zeroes = total_zeroes;

  for (let i = arr.length - 1; i >= 0; i--) {
    // console.log("i", i, "arr[i]", arr[i], "curr_zeroes", curr_zeroes, "arr", arr);

    if (arr[i] === 0) {
      curr_zeroes--;
      const adjusted_index = i + curr_zeroes;

      if (adjusted_index < arr.length) arr[adjusted_index] = 0;
      if (adjusted_index + 1 < arr.length) arr[adjusted_index + 1] = 0;
    } else {
      const adjusted_index = i + curr_zeroes;
      if (adjusted_index < arr.length) arr[adjusted_index] = arr[i];
    }

    // console.log("i", i, "arr[i]", arr[i], "curr_zeroes", curr_zeroes, "arr", arr);
    // console.log("");
  }
}

function duplicateZeros_simple(arr: number[]): void {
  const queue: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      queue.push(0);
    }

    queue.push(arr[i]);

    arr[i] = queue[0];
    queue.shift();
  }
}

type TestCase = {
  input: number[];
  expected_result: number[];
};

const test_cases: TestCase[] = [
  { input: [1, 0, 2, 3, 0, 4, 5, 0], expected_result: [1, 0, 0, 2, 3, 0, 0, 4] },
  { input: [1, 2, 3], expected_result: [1, 2, 3] },
];

const solutions = [
  { name: "best", fn: duplicateZeros },
  { name: "simple", fn: duplicateZeros_simple },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    const input_copy = _.clone(input);
    fn(input_copy);
    expect(input_copy).toStrictEqual(expected_result);
  });
});
