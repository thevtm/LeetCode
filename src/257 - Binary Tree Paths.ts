export {}; // Necessary in order to avoid TS errors

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function binaryTreePaths(root: TreeNode): string[] {
  const backtrack = (node: TreeNode): string[] => {
    const isLeaf = node.left == null && node.right == null;

    if (isLeaf) {
      return [node.val.toString()];
    }

    return [
      ...(node.left == null ? [] : backtrack(node.left)),
      ...(node.right == null ? [] : backtrack(node.right)),
    ].map((s) => `${node.val}->${s}`);
  };

  return backtrack(root);
}
