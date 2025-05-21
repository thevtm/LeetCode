export {}; // Necessary in order to avoid TS errors

interface ListNode {
  val: number;
  next: ListNode | null;
}

function reverseList(head: ListNode | null): ListNode | null {
  if (head == null) {
    return head;
  }

  let previous = head;
  let next = previous.next;

  previous.next = null;

  while (next != null) {
    const newNext = next.next
    next.next = previous;
    previous = next;
    next = newNext;
  }

  return previous;
}
