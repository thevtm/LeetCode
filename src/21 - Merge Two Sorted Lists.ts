export {}; // Necessary in order to avoid TS errors

interface ListNode {
  val: number;
  next: ListNode | null;
}
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const first: ListNode = { val: -Infinity, next: null };
  let last = first;

  while (list1 != null && list2 != null) {
    if (list1.val < list2.val) {
      last.next = list1;
      list1 = list1.next;
    } else {
      last.next = list2;
      list2 = list2.next;
    }

    last = last.next;
  }

  if (list1 == null) {
    last.next = list2;
  } else if (list2 == null) {
    last.next = list1;
  }

  return first.next;
}
