export {};

function minimumCost(n: number, edges: number[][], queries: number[][]): number[] {
  // Union Find
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

  // The dominant strategy is for the person to walk every path possible in order to minimize the costs
  const pre_aggregated_weights = new Array<number>(n);

  for (const [a, b, w] of edges) {
    union(a, b);

    pre_aggregated_weights[a] = (pre_aggregated_weights[a] ?? w) & w;
    pre_aggregated_weights[b] = (pre_aggregated_weights[b] ?? w) & w;
  }

  // Calculate the cost for each group in a single pass since we are going to have to do this later anyway
  const minimum_cost_map: Record<number, number> = {};

  for (let i = 0; i < n; i++) {
    const parent = find(i);
    minimum_cost_map[parent] =
      (minimum_cost_map[parent] ?? Number.MAX_SAFE_INTEGER) & (pre_aggregated_weights[i] ?? -1);
  }

  // RESULT!
  const result: number[] = [];

  for (const [start, end] of queries) {
    const start_parent = find(start);
    const end_parent = find(end);

    if (start_parent !== end_parent || start_parent === undefined || end_parent === undefined) {
      result.push(-1);
      continue;
    }

    result.push(minimum_cost_map[start_parent]);
  }

  return result;
}
