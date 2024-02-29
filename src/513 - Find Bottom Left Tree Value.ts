export {}; // Necessary in order to avoid TS errors

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function findBottomLeftValue(root: TreeNode): number {
  const dfs = function* (root: TreeNode): Generator<[TreeNode, number]> {
    const stack: [TreeNode, number][] = [[root, 0]];

    while (stack.length !== 0) {
      const tuple = stack.pop()!;
      const [node, depth] = tuple;

      yield tuple;

      if (node.right != null) {
        stack.push([node.right, depth + 1]);
      }

      if (node.left != null) {
        stack.push([node.left, depth + 1]);
      }
    }
  };

  const gen = dfs(root);
  let [bottomNode, bottomNodeDepth] = gen.next().value;

  for (const [node, depth] of gen) {
    if (depth > bottomNodeDepth) {
      bottomNode = node;
      bottomNodeDepth = depth;
    }
  }

  return bottomNode.val;
}
