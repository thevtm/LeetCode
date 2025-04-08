# Templates

## Matrix / Grid

```TypeScript
const matrix = Array.from({ length: n }, () => Array<number>(n + 1));
```

## Binary Search

- [Binary Search - LeetCode](https://leetcode.com/explore/learn/card/binary-search/)

```TypeScript
function binary_search_template_1(nums: number[], target: number): number {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const middle_index = Math.floor((end + start) / 2);
    const middle_num = nums[middle_index];

    if (middle_num === target) return middle_index;
    else if (middle_num < target) start = middle_index + 1;
    else end = middle_index - 1;
  }

  return -1;
}
```

## Dijkstra Algorithm

- [Dijkstra's algorithm in 3 minutes - YouTube](https://www.youtube.com/watch?v=_lHSawdgXpI)

```TypeScript
const num_of_nodes = n;
const starting_node = 0;

const distances = new Array<number>(num_of_nodes);
distances[starting_node] = 0;

const visited_nodes = new Set();
const nodes_to_visit = new Set([starting_node]);

while (nodes_to_visit.size > 0) {
  let closest_node: number;
  let closest_node_distance = Infinity;

  for (const n of nodes_to_visit) {
    if (distances[n] > closest_node_distance) continue;

    closest_node = n;
    closest_node_distance = distances[n];
  }

  visited_nodes.add(closest_node!);
  nodes_to_visit.delete(closest_node!);

  const closest_node_edges = adjacency_list.get(closest_node!);

  if (closest_node_edges === undefined) continue;

  for (const [connected_node, weight] of closest_node_edges) {
    if (visited_nodes.has(connected_node)) continue;
    nodes_to_visit.add(connected_node);

    const new_distance = closest_node_distance + weight;

    if (distances[connected_node] === undefined || distances[connected_node] > new_distance)
      distances[connected_node] = new_distance;
  }
}

console.log(distances);
```

## Graph

### Adjacency List

```TypeScript
function directional_adjacency_list(edges: number[][]): Map<number, [number, number][]> {
  const adjacency_list = new Map<number, [number, number][]>();

  for (const [a, b, w] of edges) {
    let na = adjacency_list.get(a);

    if (na === undefined) {
      adjacency_list.set(a, [[b, w]]);
    } else {
      na.push([b, w]);
    }
  }

  return adjacency_list;
}

function unidirectional_adjacency_list(edges: number[][]): Map<number, [number, number][]> {
  const adjacency_list = new Map<number, [number, number][]>();

  for (const [a, b, w] of edges) {
    let na = adjacency_list.get(a);

    if (na === undefined) {
      adjacency_list.set(a, [[b, w]]);
    } else {
      na.push([b, w]);
    }

    let nb = adjacency_list.get(b);

    if (nb === undefined) {
      adjacency_list.set(b, [[a, w]]);
    } else {
      nb.push([a, w]);
    }
  }

  return adjacency_list;
}
```

### Adjacency Matrix

```TypeScript
// Array
const adjacency_matrix = Array.from({ length: n }, () => Array(n));

for (const [a, b, w] of edges) {
  const cell = adjacency_matrix[a][b] ?? 0;
  adjacency_matrix[a][b] = adjacency_matrix[b][a] = cell & w;
}
```

```TypeScript
// Map
const adjacency_matrix = new Map<number, number>();

const adjacency_matrix_key = (a: number, b: number): number => n * Math.min(a, b) + Math.max(a, b);
const adjacency_matrix_get = (a: number, b: number): number | undefined =>
  adjacency_matrix.get(adjacency_matrix_key(a, b));

for (const [a, b, w] of edges) {
  const new_value = (adjacency_matrix_get(a, b) ?? Number.MAX_SAFE_INTEGER) & w;
  adjacency_matrix.set(adjacency_matrix_key(a, b), new_value);
}
```

### Union Find / Disjointed Union Set

- [Disjoint Set - LeetCode](https://leetcode.com/explore/learn/card/graph/618/disjoint-set/)

```TypeScript
const nodes_count = isConnected.length;
const disjointed_set = Array.from({ length: nodes_count }).map((_, i) => i);

const find = (node: number): number => {
  while (disjointed_set[node] !== node) node = disjointed_set[node];
  return node;
};

const union = (node_a: number, node_b: number): void => {
  const node_a_parent = find(node_a);
  const node_b_parent = find(node_b);

  const [new_parent, old_parent] =
    node_a_parent < node_b_parent ? [node_a_parent, node_b_parent] : [node_b_parent, node_a_parent];

  disjointed_set[node_a] = disjointed_set[node_b] = disjointed_set[old_parent] = new_parent;
};

for (const [a, b] of edges) {
  union(a, b);
}
```

## Merge Intervals / Ranges

```TypeScript
const intervals: [number, number][]

intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
const merged_intervals: [number, number][] = [intervals[0]];

for (let i = 1; i < intervals.length; i++) {
  const [interval_start, interval_end] = intervals[i];
  const last_interval = merged_intervals[merged_intervals.length - 1];
  const [last_interval_start, last_interval_end] = last_interval;

  if (interval_start >= last_interval_start && interval_start <= last_interval_end) {
    last_interval[1] = Math.max(interval_end, last_interval_end);
  } else {
    merged_intervals.push(intervals[i]);
  }
}

console.log("merged_intervals", merged_intervals)
```

## Boyer-Moore Majority Vote Algorithm

- Find the number that occurs at least `n/2` times

```TypeScript
let candidate = nums[0];
let count = 1;

for (let i = 1; i < nums.length; i++) {
  if (nums[i] === candidate) {
    count++;
  } else {
    if (count === 1) {
      candidate = nums[i];
      count = 1;
    } else {
      count--;
    }
  }
}

console.log("candidate", candidate, "count", count);
```

## Is Within Square

```TypeScript
  const is_position_within_bounds = ([x, y]: [number, number]): boolean => x >= 0 && x < width && y >= 0 && y < height;
```

## Directions

```TypeScript
const DIRECTIONS: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];
```

## Sum 2D Vector / Position

```TypeScript
const vec_2d_sum = (a: [number, number], b: [number, number]): [number, number] => [a[0] + b[0], a[1] + b[1]];
```

## Priority Queue

```TypeScript
const queue = new MinPriorityQueue((v) => v.value);
queue.enqueue({ value: 0, position: [0, 0] });

while (!queue.isEmpty()) {
  const { value, position } = queue.dequeue();
}
```

## Tree Node Interface

```TypeScript
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
```

## Distinct Prime Factors

```TypeScript
const PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109,
  113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239,
  241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367,
];

let prime_factors = new Set<number>();

let n = num;

for (const prime of PRIMES) {
  if (prime * prime > n) {
    break;
  }

  if (n % prime === 0) {
    n /= prime;

    while (n % prime === 0) {
      n /= prime;
    }

    prime_factors.add(prime);
  }
}

if (n > 1) {
  prime_factors.add(n);
}

console.log(prime_factors);
```

## Monotonic Stack

- Used to keep track of the closest highest/lowest neighbor

```TypeScript
const stack: number[] = [];
const monotonic_stack = new Array<number>(nums.length);

for (let i = nums.length - 1; i >= 0; i--) {
  while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) stack.pop()!;
  monotonic_stack[i] = stack[stack.length - 1] ?? - 1;
  stack.push(i);
}
```

## Fast Modular Exponential

```TypeScript
const fast_modular_exponentiation = (base: bigint, exponent: bigint, modulus: bigint): bigint => {
  base = base % modulus;

  let result = 1n;

  while (exponent > 0) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }

    base = (base * base) % modulus;
    exponent /= 2n;
  }

  return result;
};
```

## Post Order Traversal

- Traverses leaves first.

```TypeScript
const post_order_traversal = (node: TreeNode, depth: number = 0): number => {
  const deepest_left = node.left === null ? -1 : postorder_traversal(node.left, depth + 1);
  const deepest_right = node.right === null ? -1 : postorder_traversal(node.right, depth + 1);

  return Math.max(depth, deepest_left, deepest_right);
};
```

## Number to Digits

```TypeScript
let remainder = num;
const digits: number[] = [];

while (remainder > 0) {
  digits.push(remainder % 10);
  remainder = Math.floor(remainder / 10);
}

digits.reverse();

console.log("digits", digits);
```

## Frequency Count

```TypeScript
const nums_frequencies = new Map<number, number>();

for (const num of nums) {
  nums_frequencies.set(num, (nums_frequencies.get(num) ?? 0) + 1);
}

console.log("nums_frequencies", nums_frequencies);
```
