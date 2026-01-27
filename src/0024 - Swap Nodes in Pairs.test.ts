import _ from "lodash";

import { expect, test, describe } from "vitest";

interface ListNode {
  val: number;
  next: ListNode | null;
}

function swapPairs(head: ListNode | null): ListNode | null {
  if (head == null) return null;
  if (head.next == null) return head;

  const second = head.next;
  head.next = second.next;
  second.next = head;

  let prev = head;
  let it = prev.next;

  while (it != null && it.next != null) {
    const second = it.next;
    it.next = second.next;
    prev.next = second;
    second.next = it;

    prev = it;
    it = prev.next;
  }

  return second;
}

type SolutionFunction = typeof swapPairs;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [{ val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: null } } } }],
    expected_result: { val: 2, next: { val: 1, next: { val: 4, next: { val: 3, next: null } } } },
  },
  { input: [null], expected_result: null },
  { input: [{ val: 1, next: null }], expected_result: { val: 1, next: null } },
  {
    input: [{ val: 1, next: { val: 2, next: { val: 3, next: null } } }],
    expected_result: { val: 2, next: { val: 1, next: { val: 3, next: null } } },
  },
];

const solutions = [{ name: "best", fn: swapPairs }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
