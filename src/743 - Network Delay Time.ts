export {};

function networkDelayTime(edges: number[][], n: number, k: number): number {
  const edges_for_node = new Map<number, [number, number][]>();

  for (const [a, b, w] of edges) {
    let na = edges_for_node.get(a - 1);

    if (na === undefined) {
      edges_for_node.set(a - 1, [[b - 1, w]]);
    } else {
      na.push([b - 1, w]);
    }
  }

  const start = k - 1;

  const distances = new Array<number>(n);
  distances[start] = 0;

  const visited_nodes = new Set();
  const nodes_to_visit = new Set([start]);

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

  let result = -Infinity;

  for (let i = 0; i < distances.length; i++) {
    if (i === start) continue;
    if (distances[i] === undefined) return -1;
    result = Math.max(result, distances[i]);
  }

  if (result === -Infinity) return -1;

  return result;
}
