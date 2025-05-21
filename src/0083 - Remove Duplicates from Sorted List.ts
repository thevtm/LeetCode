export {}; // Necessary in order to avoid TS errors

interface ListNode {
  val: number;
  next: ListNode | null;
}

function deleteDuplicates(head: ListNode): ListNode | null {
  let it: ListNode | null = head;

  while (it?.next != null) {
    if (it.val === it?.next.val) {
      it.next = it.next.next;
    } else {
      it = it.next;
    }
  }

  return head;
}
