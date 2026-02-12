export {}; // Necessary in order to avoid TS errors

interface _Node {
  val: number;
  left: _Node | null;
  right: _Node | null;
  next: _Node | null;
}

function connect(root: _Node | null): _Node | null {
  if (root === null) return null;

  const dfs = (left: _Node | null, right: _Node | null) => {
    if (left === null) return;

    left.next = right;

    dfs(left.left, left.right);

    if (right === null) return false;

    dfs(left.right, right.left);

    dfs(right.left, right.right);
  };

  dfs(root.left, root.right);

  return root;
}
