import _ from "lodash";

import { expect, test, describe } from "vitest";

function eventualSafeNodes(graph: number[][]): number[] {
  const visited = new Set<number>();

  const is_safe = _.memoize((node: number): boolean => {
    visited.add(node);

    for (const connected_node of graph[node]) {
      if (visited.has(connected_node) || !is_safe(connected_node)) {
        visited.delete(node);
        return false;
      }
    }

    visited.delete(node);
    return true;
  });

  return _.range(0, graph.length).filter(is_safe);
}

type SolutionFunction = typeof eventualSafeNodes;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[[1, 2], [2, 3], [5], [0], [5], [], []]], expected_result: [2, 4, 5, 6] },
  { input: [[[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]], expected_result: [4] },
  { input: [[[0], [2, 3, 4], [3, 4], [0, 4], []]], expected_result: [4] },
  { input: [[[], [0, 2, 3, 4], [3], [4], []]], expected_result: [0, 1, 2, 3, 4] },
];

const solutions = [{ name: "best", fn: eventualSafeNodes }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
