import _ from "lodash";

import { expect, test, describe } from "vitest";

interface LinkedListElement<T> {
  value: T;
  next?: LinkedListElement<T>;
}

function processQueries(queries: number[], m: number): number[] {
  let first: LinkedListElement<number> = { value: 1 };
  let last = first;

  for (let i = 2; i <= m; i++) last = last.next = { value: i };

  const result = new Array<number>();

  for (let query of queries) {
    if (first.value === query) {
      result.push(0);
      continue;
    }

    let index = 1;
    let prev = first;
    let it = prev.next!;

    while (it.value !== query) {
      prev = it;
      it = it.next!;
      index++;
    }

    prev.next = it.next;
    it.next = first;
    first = it;
    result.push(index);
  }

  return result;
}

type SolutionFunction = typeof processQueries;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[3, 1, 2, 1], 5], expected_result: [2, 1, 2, 1] },
  { input: [[4, 1, 2, 2], 4], expected_result: [3, 1, 2, 0] },
  { input: [[7, 5, 5, 8, 3], 8], expected_result: [6, 5, 0, 7, 5] },
];

const solutions = [{ name: "best", fn: processQueries }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
