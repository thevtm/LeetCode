export {}; // Necessary in order to avoid TS errors

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  parent: TreeNode | undefined;
}

function removeLeafNodes(root: TreeNode, target: number): TreeNode | null {
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    const isLeaf = node.left == null && node.right == null;

    if (isLeaf) {
      if (node.val === target) {
        const parent = node.parent;

        if (parent == null) {
          return null;
        }

        if (parent.left === node) {
          parent.left = null;
        } else if (parent.right === node) {
          parent.right = null;
        }

        if (parent.val === target) {
          stack.push(parent);
        }
      }
    } else {
      for (const child of [node.left, node.right]) {
        if (child == null) {
          continue;
        }

        child.parent = node;
        stack.push(child);
      }
    }
  }

  return root;
}
