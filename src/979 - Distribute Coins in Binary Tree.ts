export {}; // Necessary in order to avoid TS errors

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function distributeCoins(root: TreeNode | null): number {
  let count = 0;

  const dfs = (node: TreeNode | null): number => {
    if (node === null) {
      return 0;
    }

    const left = dfs(node.left);
    const right = dfs(node.right);

    const sum = 1 - node.val + left + right;

    count += Math.abs(sum);

    return sum;
  };

  console.assert(dfs(root) === 0, "Tree should always be balanced.");

  return count;
}
