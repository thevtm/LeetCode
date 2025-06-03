import _ from "lodash";

import { expect, test, describe } from "vitest";

function maxCandies(
  status: number[],
  candies: number[],
  keys: number[][],
  containedBoxes: number[][],
  initialBoxes: number[]
): number {
  let count = 0;

  const visited = new Set<number>();
  const my_keys = new Set<number>();
  const to_visit = new Set<number>(initialBoxes.filter((box) => status[box] === 1));
  const my_boxes = new Set<number>(initialBoxes.filter((box) => status[box] === 0));

  while (to_visit.size > 0) {
    const box = to_visit.values().next().value;

    visited.add(box);
    to_visit.delete(box);

    count += candies[box];

    for (const key of keys[box]) {
      if (visited.has(key) || to_visit.has(key)) continue;

      if (my_boxes.has(key)) {
        my_boxes.delete(key);
        to_visit.add(key);
      } else {
        my_keys.add(key);
      }
    }

    for (const contained_box of containedBoxes[box]) {
      if (visited.has(contained_box) || to_visit.has(contained_box)) continue;

      if (status[contained_box] === 1) {
        to_visit.add(contained_box);
      } else if (my_keys.has(contained_box)) {
        my_keys.delete(contained_box);
        to_visit.add(contained_box);
      } else {
        my_boxes.add(contained_box);
      }
    }
  }

  return count;
}

type SolutionFunction = typeof maxCandies;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 0, 1, 0], [7, 5, 4, 100], [[], [], [1], []], [[1, 2], [3], [], []], [0]], expected_result: 16 },
  {
    input: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [[1, 2, 3, 4, 5], [], [], [], [], []],
      [[1, 2, 3, 4, 5], [], [], [], [], []],
      [0],
    ],
    expected_result: 6,
  },
];

const solutions = [{ name: "best", fn: maxCandies }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
