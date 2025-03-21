# Templates

## Matrix

```TypeScript
function make_matrix(rows: number, columns: number) {
  return Array.from({ length: rows }, () => Array(columns));
}
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
function dijkstra(
  edges_for_node: Map<number, [number, number][]>,
  num_of_nodes: number,
  starting_node: number
): number[] {
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

    const closest_node_edges = edges_for_node.get(closest_node!);

    if (closest_node_edges === undefined) continue;

    for (const [connected_node, weight] of closest_node_edges) {
      if (visited_nodes.has(connected_node)) continue;
      nodes_to_visit.add(connected_node);

      const new_distance = closest_node_distance + weight;

      if (distances[connected_node] === undefined || distances[connected_node] > new_distance)
        distances[connected_node] = new_distance;
    }
  }

  return distances;
}
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
```
