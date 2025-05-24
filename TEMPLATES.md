# Templates

## Scaffolding

```TypeScript
import { expect, test, describe } from "vitest";

function solution_function(n: number): number {
  return -1;
}

type SolutionFunction = typeof solution_function;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [1], expected_result: 1 },
  { input: [2], expected_result: 1 },
  { input: [3], expected_result: 1 },
];

const solutions = [{ name: "best", fn: solution_function }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
```

## List Node

```TypeScript
interface ListNode {
  val: number;
  next: ListNode | null;
}
```

## Matrix / Grid

```TypeScript
const matrix = Array.from({ length: n }, () => Array<number>(n + 1));
const make_matrix = (rows: number, cols: number): number[][] =>
  Array.from({ length: rows }, () => Array<number>(cols).fill(0));
```

### Identity Matrix

```TypeScript
const make_identity_matrix = (size: number): number[][] => {
  const matrix = make_matrix(size, size);

  for (let i = 0; i < size; i++) {
    matrix[i][i] = 1;
  }

  return matrix;
};
```

### Dot Product

```TypeScript
const matrix_dot_product = (a: number[][], b: number[][]): number[][] => {
  const rows = a.length;
  const cols = b[0].length;

  if (a[0].length !== b.length) throw "Incompatible dimensions";

  const result_matrix = make_matrix(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < b.length; k++) {
        result_matrix[i][j] += result_matrix[i][j] + a[i][k] * b[k][j];
      }
    }
  }

  return result_matrix;
};
```

### Matrix Fast Exponentiation

```TypeScript
const matrix_fast_exponentiation = (base: bigint[][], exponent: bigint, modulus: bigint): bigint[][] => {
  const size = base.length;

  let result = make_identity_matrix(size);

  while (exponent > 0) {
    if (exponent % 2n === 1n) {
      result = matrix_dot_product(result, base);
    }

    base = matrix_dot_product(base, base);
    exponent >>= 1n;
  }

  return result;
};

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
    exponent >>= 1n;
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

## Count Digits

```TypeScript
const count_digits = (num: number) => (num === 0 ? 0 : Math.floor(Math.log10(num)) + 1);
```

## Number to Digits

```TypeScript
const num_to_digits = (num: number): number[] => {
  const digits_count = num === 0 ? 0 : Math.floor(Math.log10(num)) + 1;
  return Array.from({ length: digits_count }, (_, i) => Math.floor(num / 10 ** (digits_count - i - 1)) % 10);
};
```

## Frequency Count

```TypeScript
const freq = _.countBy(dominoes, (x) => Math.abs(x));
console.log("freq", freq)
```

```TypeScript
const nums_frequencies = new Map<number, number>();

for (const num of nums) {
  nums_frequencies.set(num, (nums_frequencies.get(num) ?? 0) + 1);
}

console.log("nums_frequencies", nums_frequencies);
```

## Triangle Numbers

```TypeScript
// Produces sequence 0, 1, 3, 6, 10, 15, 21...
const triangle_num = (n * (n + 1)) / 2;
```

## Digits DP

- See `src/Sphere Online Judge/PR003004 - Digit Sum.test.ts`

## Factorial

```TypeScript
const factorial = _.memoize((n: number) => n * factorial(n - 1));
factorial.cache.set(0, 1);
```

```TypeScript
// We only need FACTORIAL(0...10)
const FACTORIAL = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];
```

## Permutation

```TypeScript
// Permutations = n! / (f0! * f1! * ... fx!)
const factorial_frequencies_sum = frequencies.reduce((acc, f) => acc * FACTORIAL[f], 1);

const total_permutations = FACTORIAL[n] / factorial_frequencies_sum;

// Handle leading zeros
const zeros = frequencies[0];
const leading_0_permutations =
  zeros === 0 ? 0 : FACTORIAL[n - 1] / (factorial_frequencies_sum / (FACTORIAL[zeros] / FACTORIAL[zeros - 1]));

count += total_permutations - leading_0_permutations;
```

## Count Sub Arrays / Window Algorithm

```TypeScript
let count = 0;
let left = 0;

for (let right = 0; right < nums.length; right++) {
  const right_num = nums[right];

  // "Add" right element

  while (condition === true && left <= right) {
    const left_num = nums[left++];

    // "Remove" left element

    count++

    // \/ OR when all sub arrays from start are also valid \/
    count += nums.length - right;
  }

  // \/ Also works
  count += left;
}
```

```TypeScript
let count = 0;

let last_index_where_condition_a_was_true = -1;
let last_index_where_condition_b_was_true = -1;

// Elements before this should not be include in the sub array
let last_excluded_index = -1;

for (let i = 0; i < nums.length; i++) {
  const num = nums[i];

  if (condition_a) last_index_where_condition_a_was_true = i;
  if (condition_b) last_index_where_condition_b_was_true = i;

  if (num_should_be_excluded) last_excluded_index = i;

  const first_valid_window_index = Math.min(last_min_k_index, last_max_k_index);

  count += Math.max(0, first_valid_window_index - last_excluded_index);
}
```

## Prefix Sum

```TypeScript
const prefix_sum = new Array<number>(nums.length);
prefix_sum[0] = nums[0];

for (let i = 1; i < nums.length; i++) {
  prefix_sum[i] = nums[i] + prefix_sum[i - 1];
}

console.log("prefix_sum", prefix_sum);
```

## Hamming Distance

```TypeScript
const hamming_distance = (a: string, b: string): number => {
  const min_length = Math.min(a.length, b.length);
  let distance = Math.max(a.length, b.length);

  for (let i = 0; i < min_length; i++) {
    if (a[i] === b[i]) distance--;
  }

  return distance;
};
```
