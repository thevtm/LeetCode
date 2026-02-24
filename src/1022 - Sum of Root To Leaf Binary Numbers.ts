export {}; // Necessary in order to avoid TS errors

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function sumRootToLeaf(root: TreeNode): number {
  const dfs = (node: TreeNode, acc: number = 0): number => {
    const new_acc = (acc << 1) | node.val;
    const is_leaf = node.left === null && node.right === null;

    if (is_leaf) return new_acc;

    const left_sum = node.left !== null ? dfs(node.left, new_acc) : 0;
    const right_sum = node.right !== null ? dfs(node.right, new_acc) : 0;

    return left_sum + right_sum;
  };

  return dfs(root);
}
