export {};

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

class FindElements {
  set: Set<number>;

  constructor(root: TreeNode) {
    this.set = new Set<number>();

    root.val = 0;
    this.set.add(0);

    const bfs = (node: TreeNode) => {
      if (node.left !== null) {
        node.left.val = node.val * 2 + 1;
        this.set.add(node.left.val);
        bfs(node.left);
      }

      if (node.right !== null) {
        node.right.val = node.val * 2 + 2;
        this.set.add(node.right.val);
        bfs(node.right);
      }
    };

    bfs(root);
  }

  find(target: number): boolean {
    return this.set.has(target);
  }
}
