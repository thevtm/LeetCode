import _ from "lodash";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

import { expect, test, describe } from "vitest";

function minTimeToReach(moveTime: number[][]): number {
  const DIRECTIONS: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const width = moveTime.length;
  const height = moveTime[0].length;

  const starting_pos: [number, number] = [0, 0];
  const final_pos: [number, number] = [width - 1, height - 1];

  const is_position_within_bounds = ([x, y]: [number, number]): boolean => x >= 0 && x < width && y >= 0 && y < height;
  const vec_2d_sum = (a: [number, number], b: [number, number]): [number, number] => [a[0] + b[0], a[1] + b[1]];

  const time_to_reach = Array.from({ length: width }, () => Array<number>(height));

  const pq = new MinPriorityQueue<[number, [number, number], number]>((x) => x[0]);
  pq.enqueue([0, starting_pos, 1]);

  while (pq.size() > 0) {
    const [time_taken, pos, step_cost] = pq.dequeue()!;

    if (pos[0] === final_pos[0] && pos[1] === final_pos[1]) break;

    const next_step_costs = step_cost === 1 ? 2 : 1;

    for (const direction of DIRECTIONS) {
      const new_pos = vec_2d_sum(pos, direction);

      if (!is_position_within_bounds(new_pos)) continue;

      const new_time_taken = Math.max(time_taken, moveTime[new_pos[0]][new_pos[1]]) + step_cost;

      const current_best = time_to_reach[new_pos[0]][new_pos[1]];

      if ((current_best ?? Infinity) > new_time_taken) time_to_reach[new_pos[0]][new_pos[1]] = new_time_taken;

      if (current_best === undefined) pq.enqueue([new_time_taken, new_pos, next_step_costs]);
    }
  }

  // console.log("time_to_reach", time_to_reach);

  return time_to_reach[final_pos[0]][final_pos[1]];
}

type SolutionFunction = typeof minTimeToReach;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [
        [0, 4],
        [4, 4],
      ],
    ],
    expected_result: 7,
  },
  {
    input: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    expected_result: 6,
  },
  {
    input: [
      [
        [0, 1],
        [1, 2],
      ],
    ],
    expected_result: 4,
  },
];

const solutions = [{ name: "best", fn: minTimeToReach }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
