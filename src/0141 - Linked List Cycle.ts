export {}; // Necessary in order to avoid TS errors

interface ListNode {
  val: number;
  next: ListNode | null;
}

function hasCycle(head: ListNode | null): boolean {
  let slow: ListNode | null = head;
  let fast: ListNode | null = slow?.next?.next ?? null;

  while (fast != null) {
    if (fast === slow) {
      return true;
    }

    slow = slow?.next ?? null;
    fast = fast.next?.next ?? null;
  }

  return false;
}
