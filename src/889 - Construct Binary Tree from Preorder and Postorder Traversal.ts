export {};

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function constructFromPrePost(pre_order: number[], post_order: number[]): TreeNode | null {
  let pre_index = 0;
  let post_index = 0;

  const root: TreeNode = { val: pre_order[0], left: null, right: null };
  const stack: TreeNode[] = [root];
  pre_index++;

  while (pre_index < pre_order.length) {
    const parent = stack[stack.length - 1];
    const pre_val = pre_order[pre_index];
    const post_val = post_order[post_index];

    if (parent.val === post_val) {
      stack.pop();
      post_index++;
      continue;
    }

    const new_node = { val: pre_val, left: null, right: null };

    if (pre_val === post_val) {
      post_index++;
    } else {
      stack.push(new_node);
    }

    if (parent.left === null) {
      parent.left = new_node;
    } else {
      parent.right = new_node;
    }

    pre_index++;
  }

  return root;
}
