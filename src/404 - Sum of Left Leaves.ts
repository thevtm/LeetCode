export {}; // Necessary in order to avoid TS errors

function sum(arr: number[]): number {
  return arr.reduce((acc, el) => acc + el, 0);
}

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
function sumOfLeftLeaves(root: TreeNode | null): number {
  if (root == null) {
    return 0;
  }

  const nodes_to_explore: [TreeNode, boolean][] = [[root, false]];
  const left_leaves: TreeNode[] = [];

  while (nodes_to_explore.length > 0) {
    const [node, isLeftNode] = nodes_to_explore.shift()!;

    if (node.left != null) {
      nodes_to_explore.push([node.left, true]);
    } else if (isLeftNode && node.right == null) {
      left_leaves.push(node);
    }

    if (node.right != null) {
      nodes_to_explore.push([node.right, false]);
    }
  }

  // console.log(left_leaves.map((node) => node.val));

  return sum(left_leaves.map((node) => node.val));
}
