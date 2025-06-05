import _ from "lodash";

import { expect, test, describe } from "vitest";

function smallestEquivalentString(s1: string, s2: string, baseStr: string): string {
  const map = new Map<string, string>();

  const find = (node: string): string | undefined => {
    if (map.get(node) === undefined) return undefined;
    while (map.get(node) !== node) node = map.get(node)!;
    return node;
  };

  const union = (node_a: string, node_b: string): void => {
    let node_a_parent = find(node_a);

    if (node_a_parent === undefined) {
      map.set(node_a, node_a);
      node_a_parent = node_a;
    }

    let node_b_parent = find(node_b);

    if (node_b_parent === undefined) {
      map.set(node_b, node_b);
      node_b_parent = node_b;
    }

    const [new_parent, old_parent] =
      node_a_parent < node_b_parent ? [node_a_parent, node_b_parent] : [node_b_parent, node_a_parent];

    map.set(node_a, new_parent);
    map.set(node_b, new_parent);
    map.set(old_parent, new_parent);
  };

  for (let i = 0; i < s1.length; i++) {
    union(s1[i], s2[i]);
  }

  return baseStr
    .split("")
    .map((c) => find(c) ?? c)
    .join("");
}

type SolutionFunction = typeof smallestEquivalentString;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["parker", "morris", "parser"], expected_result: "makkek" },
  { input: ["hello", "world", "hold"], expected_result: "hdld" },
  { input: ["leetcode", "programs", "sourcecode"], expected_result: "aauaaaaada" },
];

const solutions = [{ name: "best", fn: smallestEquivalentString }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
