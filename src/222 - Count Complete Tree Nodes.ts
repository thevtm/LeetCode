export {};

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function countNodes(root: TreeNode | null): number {
  if (root === null) return 0;

  const stack: TreeNode[] = [root];
  let count = 0;

  while (stack.length > 0) {
    const node = stack.pop()!;
    count++;

    if (node.left !== null) stack.push(node.left);
    if (node.right !== null) stack.push(node.right);
  }

  return count;
}
