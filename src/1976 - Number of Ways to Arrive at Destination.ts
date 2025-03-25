export {};

function countPaths(n: number, roads: number[][]): number {
  const adjacency_list = new Map<number, [number, number][]>();

  for (const [a, b, w] of roads) {
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

  // console.log(adjacency_list);

  //////////////////////////////////////////////////////////////////////////////

  const distances = (() => {
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

    return distances;
  })();

  // console.log(distances);

  //////////////////////////////////////////////////////////////////////////////

  const end_node = n - 1;

  const cache = new Array<bigint>(n);
  cache[0] = BigInt(1);

  const dfs = (node: number): bigint => {
    const curr_distance = distances[node];

    const connected_nodes = adjacency_list.get(node);
    if (connected_nodes === undefined) return BigInt(1);

    let result = BigInt(0);

    for (const [connected_node, distance] of connected_nodes) {
      const is_connected_node_closer = distances[connected_node] < curr_distance;
      const is_longer_path_to_connected_node = distances[connected_node] + distance > curr_distance;

      if (!is_connected_node_closer || is_longer_path_to_connected_node) continue;
      result = result + (cache[connected_node] ?? dfs(connected_node));
    }

    cache[node] = result;
    return result;
  };

  return Number(dfs(end_node) % BigInt(1e9 + 7));
}
