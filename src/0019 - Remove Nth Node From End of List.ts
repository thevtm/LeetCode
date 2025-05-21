export {}; // Necessary in order to avoid TS errors

interface ListNode {
  val: number;
  next: ListNode | null;
}

function removeNthFromEnd(head: ListNode, n: number): ListNode | null {
  let a: ListNode = head;
  let b: ListNode = head;

  for (let i = 0; i < n - 1; i++) {
    a = a.next!;
  }

  if (a.next == null) {
    return head.next;
  }

  a = a.next;

  while (a.next != null) {
    a = a.next;
    b = b.next!;
  }

  if (b.next == null) {
    return null;
  }

  // console.log(a.val, b.val);

  b.next = b.next.next;

  return head;
}
