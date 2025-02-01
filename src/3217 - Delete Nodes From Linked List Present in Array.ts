export {};

interface ListNode {
  val: number;
  next: ListNode | null;
}

function modifiedList(nums: number[], head: ListNode): ListNode | null {
  const nums_set = new Set(nums);

  let new_head: ListNode | null = head;
  let prev_it: ListNode | null = null;
  let it: ListNode | null = head;

  while (it !== null) {
    if (!nums_set.has(it.val)) {
      // Number is not blacklisted
      prev_it = it;
      it = it.next;
    } else if (prev_it === null) {
      // Number is blacklisted and it's head
      new_head = it = it!.next;
    } else {
      // Number is blacklisted and it's not head
      prev_it.next = it = it!.next;
    }
  }

  return new_head;
}
