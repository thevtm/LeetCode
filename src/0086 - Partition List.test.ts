import _ from "lodash";

import { expect, test, describe } from "vitest";

interface ListNode {
  val: number;
  next: ListNode | null;
}

function partition(head: ListNode | null, x: number): ListNode | null {
  if (head === null) return null;

  const left_partition_dummy: ListNode | null = { val: NaN, next: null };
  const right_partition_dummy: ListNode | null = { val: NaN, next: null };

  let left_partition_last = left_partition_dummy;
  let right_partition_last = right_partition_dummy;

  let it: ListNode | null = head;

  while (it !== null) {
    if (it.val < x) {
      left_partition_last = left_partition_last.next = it;
    } else {
      right_partition_last = right_partition_last.next = it;
    }

    it = it.next;
  }

  left_partition_last.next = right_partition_dummy.next;
  right_partition_last.next = null;

  return left_partition_dummy.next;
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

type SolutionFunction = typeof partition;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [array_to_linked_list([1, 4, 3, 2, 5, 2]), 3], expected_result: array_to_linked_list([1, 2, 2, 4, 3, 5]) },
  { input: [array_to_linked_list([2, 1]), 2], expected_result: array_to_linked_list([1, 2]) },
];

const solutions = [{ name: "best", fn: partition }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
