export {};

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function lcaDeepestLeaves(root: TreeNode): TreeNode | null {
  let result = root;
  let highest_depth = 0;

  const postorder_traversal = (node: TreeNode, depth: number = 0): number => {
    const deepest_left = node.left === null ? -1 : postorder_traversal(node.left, depth + 1);
    const deepest_right = node.right === null ? -1 : postorder_traversal(node.right, depth + 1);

    if (highest_depth < depth) {
      highest_depth = depth;
      result = node;
    }

    if (deepest_left === highest_depth && deepest_right === highest_depth) {
      result = node;
    }

    return Math.max(depth, deepest_left, deepest_right);
  };

  console.log("postorder_traversal(root)", postorder_traversal(root));

  return result;
}
