export {};

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isSymmetric(root: TreeNode): boolean {
  const stack = [[root.left, root.right]];

  while (stack.length > 0) {
    const [left_node, right_node] = stack.pop()!;

    if (left_node === null && right_node === null) continue;
    if (left_node?.val !== right_node?.val) return false;

    stack.push([left_node!.left, right_node!.right]);
    stack.push([left_node!.right, right_node!.left]);
  }

  return true;
}
