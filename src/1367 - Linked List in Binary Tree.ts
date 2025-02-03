export {};

// Linked List
// Tree
// Depth-First Search (DFS)

interface ListNode {
  val: number;
  next: ListNode | null;
}

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isSubPath(head: ListNode, root: TreeNode): boolean {
  const stack: [ListNode, TreeNode][] = [[head, root]];

  while (stack.length > 0) {
    const [ln, tn] = stack.pop()!;

    tn.left !== null && stack.push([head, tn.left]);
    tn.right !== null && stack.push([head, tn.right]);

    if (tn.val !== head.val) {
      continue;
    }

    if (head.next === null) {
      return true;
    }

    const sub_stack: [ListNode, TreeNode][] = [];

    tn.left !== null && sub_stack.push([head.next, tn.left]);
    tn.right !== null && sub_stack.push([head.next, tn.right]);

    while (sub_stack.length > 0) {
      const [sln, stn] = sub_stack.pop()!;

      if (sln.val !== stn.val) {
        continue;
      }

      if (sln.next === null) {
        return true;
      }

      stn.left !== null && sub_stack.push([sln.next, stn.left]);
      stn.right !== null && sub_stack.push([sln.next, stn.right]);
    }
  }

  return false;
}

// This was too slow
// function isSubPath(head: ListNode, root: TreeNode): boolean {
//   const dfs = (ln: ListNode, tn: TreeNode): boolean => {
//     const val_eq = ln.val === tn.val;

//     if (val_eq && ln.next === null) {
//       return true;
//     }

//     return (
//       (val_eq && tn.left !== null && dfs(ln.next!, tn.left)) ||
//       (val_eq && tn.right !== null && dfs(ln.next!, tn.right)) ||
//       (tn.left !== null && dfs(head, tn.left)) ||
//       (tn.right !== null && dfs(head, tn.right))
//     );
//   };

//   return dfs(head, root);
// }

// This was too slow
// function isSubPath(head: ListNode, root: TreeNode): boolean {
//   const stack: [ListNode, TreeNode][] = [[head, root]];

//   while (stack.length > 0) {
//     const [ln, tn] = stack.pop()!;

//     if (tn.val === head.val) {
//       if (head.next === null) {
//         return true;
//       }

//       if (tn.left !== null) {
//         stack.push([head.next, tn.left]);
//       }

//       if (tn.right !== null) {
//         stack.push([head.next, tn.right]);
//       }
//     }

//     let next_ln = head;
//     if (tn.val === ln.val) {
//       if (ln.next === null) {
//         return true;
//       }

//       next_ln = ln.next;
//     }

//     if (tn.left !== null) {
//       stack.push([next_ln, tn.left]);
//     }

//     if (tn.right !== null) {
//       stack.push([next_ln, tn.right]);
//     }
//   }

//   return false;
// }
