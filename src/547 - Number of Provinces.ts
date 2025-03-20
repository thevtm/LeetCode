export {};

function findCircleNum(isConnected: number[][]): number {
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

  let province_count = nodes_count;

  for (let node_a = 0; node_a < nodes_count; node_a++) {
    for (let node_b = 0; node_b < nodes_count; node_b++) {
      if (isConnected[node_a][node_b] === 0) continue;
      if (node_a === node_b) continue;

      const node_a_parent = find(node_a);
      const node_b_parent = find(node_b);

      if (node_a_parent === node_b_parent) continue;
      province_count--;

      const [new_parent, old_parent] =
        node_a_parent < node_b_parent ? [node_a_parent, node_b_parent] : [node_b_parent, node_a_parent];

      disjointed_set[node_a] = disjointed_set[node_b] = disjointed_set[old_parent] = new_parent;
    }
  }

  return province_count;
}
