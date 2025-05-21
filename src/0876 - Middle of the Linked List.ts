export {}; // Necessary in order to avoid TS errors

interface ListNode {
  val: number;
  next: ListNode | null;
}

function middleNode(head: ListNode): ListNode | null {
  let middle = head;
  let it: ListNode | null = head;

  while (it != null) {
    if (it.next == null) {
      break;
    }

    it = it.next.next ?? null;
    middle = middle!.next!;

    console.log(it, middle);
  }

  return middle;
}
