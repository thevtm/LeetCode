export {}; // Necessary in order to avoid TS errors

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isEvenOddTree(root: TreeNode): boolean {
  const stack: [TreeNode, number][] = [[root, 0]];

  const lastItemPerDepth = new Map<number, number>();

  while (stack.length > 0) {
    const [node, depth] = stack.pop()!;
    const val = node.val;

    const depthIsEven = depth % 2 === 0;
    const valIsEven = val % 2 === 0;

    const previous = lastItemPerDepth.get(depth);

    // console.log(depth, val, depthIsEven, valIsEven, previous);

    if (depthIsEven) {
      if (valIsEven) {
        return false;
      }

      if (previous == null) {
        lastItemPerDepth.set(depth, val);
      } else if (val <= previous) {
        return false;
      } else {
        lastItemPerDepth.set(depth, val);
      }
    } else {
      if (!valIsEven) {
        return false;
      }

      if (previous == null) {
        lastItemPerDepth.set(depth, val);
      } else if (val >= previous) {
        return false;
      } else {
        lastItemPerDepth.set(depth, val);
      }
    }

    if (node.right != null) {
      stack.push([node.right, depth + 1]);
      // console.log(`${node.val} -> ${node.right.val} [label="right"]`);
    }

    if (node.left != null) {
      stack.push([node.left, depth + 1]);
      // console.log(`${node.val} -> ${node.left.val} [label="left"]`);
    }
  }

  return true;
}
