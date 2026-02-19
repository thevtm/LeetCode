interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function createBinaryTree(descriptions: [number, number, number][]): TreeNode | null {
  const nodes = new Map<number, TreeNode>();
  const child_node_vals = new Set<number>();

  for (const [parent_val, child_val, is_left] of descriptions) {
    let child = nodes.get(child_val);

    if (child === undefined) {
      child = { val: child_val, left: null, right: null };
      nodes.set(child_val, child);
    }

    let parent = nodes.get(parent_val);

    if (parent === undefined) {
      parent = { val: parent_val, left: null, right: null };
      nodes.set(parent_val, parent);
    }

    if (is_left === 1) {
      parent!.left = child!;
    } else {
      parent!.right = child!;
    }

    child_node_vals.add(child_val);
  }

  for (const [node_val, node] of nodes.entries()) {
    if (child_node_vals.has(node_val) === false) return node;
  }

  return null;
}
