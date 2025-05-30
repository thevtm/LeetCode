import _, { min } from "lodash";

import { expect, test, describe } from "vitest";

function closestMeetingNode(edges: number[], node1: number, node2: number): number {
  const calculate_node_distances = (starting_node: number) => {
    const distances = new Array<number>(edges.length).fill(Infinity);
    distances[starting_node] = 0;

    const stack: [number, number][] = [[0, starting_node]];

    while (stack.length > 0) {
      const [curr_distance, curr_node] = stack.shift()!;
      const next_node = edges[curr_node];

      if (next_node === -1) continue;
      if (distances[next_node] < curr_distance + 1) continue;

      distances[next_node] = curr_distance + 1;
      stack.push([curr_distance + 1, next_node]);
    }

    return distances;
  };

  //////////////////////////////////////////////////////////////////////////////

  const node1_distances = calculate_node_distances(node1);
  const node2_distances = calculate_node_distances(node2);

  console.log("node1_distances", node1_distances);
  console.log("node2_distances", node2_distances);

  //////////////////////////////////////////////////////////////////////////////

  let min_distance = Infinity;
  let closest_node = -1;

  for (let i = 0; i < edges.length; i++) {
    const distance = Math.max(node1_distances[i], node2_distances[i]);
    if (distance < min_distance) {
      closest_node = i;
      min_distance = distance;
    }
  }

  return closest_node;
}

type SolutionFunction = typeof closestMeetingNode;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[2, 2, 3, -1], 0, 1], expected_result: 2 },
  { input: [[1, 2, -1], 0, 2], expected_result: 2 },
];

const solutions = [{ name: "best", fn: closestMeetingNode }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
