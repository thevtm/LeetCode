import _ from "lodash";

import { expect, test, describe } from "vitest";

interface ListNode {
  val: number;
  next: ListNode | null;
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head === null) return null;

  const dummy: ListNode = { val: NaN, next: head };

  let prev = dummy;
  let it: ListNode | null = head;

  while (it !== null) {
    let jt: ListNode | null = it.next;

    while (jt !== null && jt.val === it.val) jt = jt.next;

    if (it.next === jt) {
      prev = it;
      it = it.next;
    } else {
      prev.next = jt;
      it = jt;
    }
  }

  return dummy.next;
}

function array_to_linked_list(array: number[]): ListNode | null {
  if (array.length === 0) return null;

  const head: ListNode = { val: array[0], next: null };
  let last = head;

  for (let i = 1; i < array.length; i++) {
    last = last.next = { val: array[i], next: null };
  }

  return head;
}

type SolutionFunction = typeof deleteDuplicates;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [array_to_linked_list([1, 2, 3, 3, 4, 4, 5])], expected_result: array_to_linked_list([1, 2, 5]) },
  { input: [array_to_linked_list([1, 1, 1, 2, 3])], expected_result: array_to_linked_list([2, 3]) },
];

const solutions = [{ name: "best", fn: deleteDuplicates }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
