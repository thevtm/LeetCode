export {};

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function recoverFromPreorder(traversal: string): TreeNode | null {
  const rx_pattern = /(-*)(\d+)/gi;
  const matches = traversal.matchAll(rx_pattern);

  const first = matches.next();
  const root: TreeNode = { val: parseInt(first.value[2]), left: null, right: null };
  const stack: TreeNode[] = [root];

  for (const match of matches) {
    const d = match[1].length;
    const v = parseInt(match[2]);

    while (stack.length > d) stack.pop();
    const parent = stack[stack.length - 1];

    const new_node = { val: v, left: null, right: null };
    stack.push(new_node);

    if (parent.left === null) {
      parent.left = new_node;
    } else {
      parent.right = new_node;
    }
  }

  return root;
}
