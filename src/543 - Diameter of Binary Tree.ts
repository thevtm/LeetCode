export {}; // Necessary in order to avoid TS errors

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  const recursive = (node: TreeNode | null): [number, number] => {
    if (node == null) {
      return [0, 0];
    }

    const [leftDiameter, leftDepth] = recursive(node.left);
    const [rightDiameter, rightDepth] = recursive(node.right);

    const diameter = leftDepth + rightDepth;
    const depth = Math.max(leftDepth, rightDepth) + 1;

    return [Math.max(diameter, leftDiameter, rightDiameter), depth];
  };

  return recursive(root)[0];
}
