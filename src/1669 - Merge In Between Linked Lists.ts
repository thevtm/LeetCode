export {};

interface ListNode {
  val: number;
  next: ListNode | null;
}

function mergeInBetween(list1: ListNode, a: number, b: number, list2: ListNode): ListNode | null {
  // Find List 2 Last element
  let list2_last_node = list2;

  while (list2_last_node.next !== null) {
    list2_last_node = list2_last_node.next!;
  }

  // Find and merge Node A
  let iter: ListNode | null = list1;

  for (let i = 0; i < a - 1; i++) {
    iter = iter!.next;
  }

  const tmp = iter!.next;
  iter!.next = list2;

  iter = tmp;

  // Find and merge Node B
  for (let i = a; i < b; i++) {
    iter = iter!.next;
  }

  list2_last_node.next = iter!.next;

  return list1;
}
