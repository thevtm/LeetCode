import _ from "lodash";

import { expect, test, describe } from "vitest";

function minSwaps(grid: number[][]): number {
  // Instead of swapping, just calculate the number of swaps needed

  const m = grid.length;
  const n = grid[0].length;

  const SWAPPED = 9999;

  const grid_rightmost_bit_index = grid.map((row) => row.findLastIndex((val) => val === 1));
  // console.log("grid_rightmost_bit_index", grid_rightmost_bit_index);

  let swap_counter = 0;

  OuterLoop: for (let i = 0; i < m; i++) {
    let swapped_before_count = 0;

    for (let j = 0; j < m; j++) {
      if (grid_rightmost_bit_index[j] === SWAPPED) {
        swapped_before_count++;
        continue;
      }

      if (grid_rightmost_bit_index[j] <= i) {
        swap_counter += j - swapped_before_count;
        grid_rightmost_bit_index[j] = SWAPPED;

        continue OuterLoop;
      }
    }

    return -1;
  }

  return swap_counter;
}

function minSwaps_swap(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  const grid_rightmost_bit_index = grid.map((row) => row.findLastIndex((val) => val === 1));
  // console.log("grid_rightmost_bit_index", grid_rightmost_bit_index);

  let swap_counter = 0;

  for (let i = 0; i < m; i++) {
    const max_rightmost_bit_for_i = i;

    // Find the first row that satisfies the requirements
    let j = i;
    while (j < m && grid_rightmost_bit_index[j] > max_rightmost_bit_for_i) j++;

    if (j === m) return -1;

    // Swap it all the way up to `i` index
    while (j > i) {
      [grid_rightmost_bit_index[j], grid_rightmost_bit_index[j - 1]] = [
        grid_rightmost_bit_index[j - 1],
        grid_rightmost_bit_index[j],
      ];
      swap_counter++;
      j--;
    }
  }

  return swap_counter;
}

type SolutionFunction = typeof minSwaps;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [0, 0, 1],
        [1, 1, 0],
        [1, 0, 0],
      ],
    ],
    expected_result: 3,
  },
  {
    input: [
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
      ],
    ],
    expected_result: -1,
  },
  {
    input: [
      [
        [1, 0, 0],
        [1, 1, 0],
        [1, 1, 1],
      ],
    ],
    expected_result: 0,
  },
  {
    input: [
      [
        [1, 0, 0, 0],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
      ],
    ],
    expected_result: 2,
  },
];

const solutions = [
  { name: "best", fn: minSwaps },
  // { name: "best", fn: minSwaps_swap },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
