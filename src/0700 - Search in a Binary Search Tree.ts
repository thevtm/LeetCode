interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  let cursor = root;

  while (cursor !== null && cursor.val !== val)
    if (val < cursor.val) cursor = cursor.left;
    else cursor = cursor.right;

  return cursor;
}
