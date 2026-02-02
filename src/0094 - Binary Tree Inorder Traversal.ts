interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function inorderTraversal(root: TreeNode | null): number[] {
  if (root === null) return [];

  const stack: TreeNode[] = [root];
  let last: TreeNode | null = null;

  const result: number[] = [];

  while (stack.length > 0) {
    const top = stack[stack.length - 1];

    // console.log("top", top.val);

    // Coming back from the right node
    if (top.right !== null && top.right === last) {
      last = stack.pop()!;
      continue;
    }

    // Left has not been visited
    if (top.left !== null && top.left !== last) {
      stack.push(top.left);
      continue;
    }

    // Coming back from the left node
    result.push(top.val);

    if (top.right !== null) {
      stack.push(top.right);
    } else {
      last = stack.pop()!;
    }
  }

  return result;
}
