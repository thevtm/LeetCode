export {}; // Necessary in order to avoid TS errors

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  let result: boolean;

  if (p == null && q == null) {
    result = true;
  } else if (p?.val !== q?.val) {
    result = false;
  } else {
    result = isSameTree(p!.left, q!.left) && isSameTree(p!.right, q!.right);
  }

  // console.log(p, q, result);

  return result;
}
