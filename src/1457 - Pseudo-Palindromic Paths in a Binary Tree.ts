export {}; // Necessary in order to avoid TS errors

function pseudoPalindromicPaths(root: TreeNode | null): number {
  if (root == null) {
    return 0;
  }

  let palindromes_count = 0;

  const it = DFSGenerator(root, new Map<number, number>());
  let res = it.next();

  while (!res.done) {
    const [node, frequency_map] = res.value;
    const new_frequency_map = new Map<number, number>(frequency_map);
    new_frequency_map.set(node.val, (new_frequency_map.get(node.val) ?? 0) + 1);

    if (isTreeNodeLeaf(node)) {
      if (!hasMultipleOdd(new_frequency_map.values())) {
        palindromes_count += 1;
      }
    }

    res = it.next(new_frequency_map);
  }

  return palindromes_count;
}

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

type TreeNodePath = TreeNode[];

function* DFSGenerator<T>(root: TreeNode, initialContext: T): Generator<[TreeNode, T], any, T> {
  const nodes_to_explore: [TreeNode, T][] = [[root, initialContext]];

  while (nodes_to_explore.length > 0) {
    const node_context = nodes_to_explore.shift()!;
    const [node] = node_context;

    const new_context: T = yield node_context;

    if (node.left != null) {
      nodes_to_explore.push([node.left, new_context]);
    }

    if (node.right != null) {
      nodes_to_explore.push([node.right, new_context]);
    }
  }
}

function isTreeNodeLeaf(node: TreeNode) {
  return node.left === null && node.right === null;
}

function* generatePermutations<T>(array: T[], size: number = array.length): Generator<T[]> {
  if (size === 1) {
    yield array.slice();
    return;
  }

  for (let i = 0; i < size - 1; i++) {
    yield* generatePermutations(array, size - 1);

    const j = size % 2 === 0 ? i : 0;
    [array[j], array[size - 1]] = [array[size - 1], array[j]];
  }

  yield* generatePermutations(array, size - 1);
}

function some<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): boolean {
  for (let value of iterable) {
    if (predicate(value)) {
      return true;
    }
  }
  return false;
}

function isPalindrome<T>(arr: T[]): boolean {
  const length = arr.length;
  const mid_point = Math.ceil(length / 2);

  for (let i = 0; i < mid_point; i++) {
    if (arr[i] !== arr[length - i - 1]) {
      // console.log([arr, length, mid_point, i, arr[i], arr[length - i - 1]]);
      return false;
    }
  }

  return true;
}

function arrayCompare<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function frequencyMap<T>(arr: T[]): Map<T, number> {
  return arr.reduce((acc, el) => acc.set(el, (acc.get(el) ?? 0) + 1), new Map());
}

function isOdd(n: number) {
  return n % 2 === 1;
}

function canBeAPalindrome<T>(arr: T[]): boolean {
  const frequency_map = frequencyMap(arr);
  let found_odd = false;

  for (const frequency of frequency_map.values()) {
    if (isOdd(frequency)) {
      if (found_odd) {
        return false;
      }

      found_odd = true;
    }
  }

  return true;
}

function hasMultipleOdd(nums: Iterable<number>): boolean {
  let found_odd = false;

  for (const frequency of nums) {
    if (!isOdd(frequency)) {
      continue;
    }

    if (found_odd) {
      return true;
    }

    found_odd = true;
  }

  return false;
}
