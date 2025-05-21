export {};

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function averageOfLevels(root: TreeNode): number[] {
  const queue = new Queue();
  queue.enqueue([root, 0]);

  const total: number[] = [];
  const count: number[] = [];

  while (!queue.isEmpty()) {
    const [node, level] = queue.dequeue() as [TreeNode | null, number];

    if (node === null) continue;

    total[level] = (total[level] ?? 0) + node.val;
    count[level] = (count[level] ?? 0) + 1;

    queue.enqueue([node.left, level + 1]);
    queue.enqueue([node.right, level + 1]);
  }

  return total.map((v, i) => v / count[i]);
}
