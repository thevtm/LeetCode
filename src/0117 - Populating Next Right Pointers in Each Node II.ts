export {}; // Necessary in order to avoid TS errors

interface _Node {
  val: number;
  left: _Node | null;
  right: _Node | null;
  next: _Node | null;
}

function connect(root: _Node | null): _Node | null {
  if (root === null) return null;

  const stack: (_Node | null)[] = [root];

  while (stack.length > 0) {
    const parent = stack.shift()!;

    if (parent === null) continue;

    let next_uncle_with_children = parent.next;

    while (
      next_uncle_with_children != null &&
      next_uncle_with_children.left === null &&
      next_uncle_with_children.right === null
    )
      next_uncle_with_children = next_uncle_with_children.next;

    const order = [parent.left, parent.right, next_uncle_with_children?.left, next_uncle_with_children?.right].filter(
      (v) => v !== null && v !== undefined,
    );

    for (let i = 0; i < order.length - 1; i++) order[i].next = order[i + 1];

    stack.push(parent.right, parent.left);
  }

  return root;
}
