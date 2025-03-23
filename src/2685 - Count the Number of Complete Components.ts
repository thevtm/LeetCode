export {};

function countCompleteComponents(n: number, edges: [number, number][]): number {
  const edges_count = new Array(n).fill(0);
  const disjointed_set = Array.from({ length: n }).map((_, i) => i);

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
    edges_count[a]++;
    union(a, b);
  }

  // console.log("edges_count", edges_count);
  // console.log("disjointed_set", disjointed_set);

  const nodes_per_parent = new Map<number, number>();
  const edges_per_parent = new Map<number, number>();

  for (let i = 0; i < n; i++) {
    const parent = find(i);

    nodes_per_parent.set(parent, (nodes_per_parent.get(parent) ?? 0) + 1);
    edges_per_parent.set(parent, (edges_per_parent.get(parent) ?? 0) + edges_count[i]);
  }

  // console.log("nodes_per_parent", nodes_per_parent);
  // console.log("edges_per_parent", edges_per_parent);

  let result = 0;

  for (const [node, nodes_count] of nodes_per_parent.entries()) {
    const edges_count = edges_per_parent.get(node);
    const expected_edges_count = (nodes_count * (nodes_count - 1)) / 2;
    if (edges_count === expected_edges_count) result++;
  }

  return result;
}
