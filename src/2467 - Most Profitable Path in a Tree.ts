export {};

function mostProfitablePath(edges: number[][], bob: number, amount: number[]): number {
  const n = amount.length;

  // Tree adjacency matrix
  const nodes_for_node: number[][] = Array.from({ length: n }).map(() => []);
  for (const [a, b] of edges) {
    nodes_for_node[a].push(b);
    nodes_for_node[b].push(a);
  }

  // Bob's path
  const bob_path: number[] = [bob];
  const bob_visited = new Set<number>(bob_path);

  const bob_backtrack = (node: number): boolean => {
    if (node === 0) return true;

    for (const connected_node of nodes_for_node[node]) {
      if (bob_visited.has(connected_node)) continue;
      bob_visited.add(connected_node);
      bob_path.push(connected_node);

      if (bob_backtrack(connected_node)) return true;

      bob_path.pop();
      bob_visited.delete(connected_node);
    }

    return false;
  };

  bob_backtrack(bob);

  const bob_path_map = new Array<number>(n);
  for (let i = 0; i < bob_path.length; i++) bob_path_map[bob_path[i]] = i;

  // Alice's path
  let alice_time = 0;
  let alice_profit: number = amount[0];
  let alice_profit_max: number = -Infinity;
  const alice_visited = new Set<number>([0]);

  const alice_backtrack = (node: number): void => {
    const connected_nodes = nodes_for_node[node];

    if (node !== 0 && connected_nodes.length === 1) {
      alice_profit_max = Math.max(alice_profit_max, alice_profit);
    }

    for (const connected_node of connected_nodes) {
      if (alice_visited.has(connected_node)) continue;

      alice_visited.add(connected_node);
      alice_time++;

      let profit = 0;
      if (bob_path_map[connected_node] === undefined || bob_path_map[connected_node] > alice_time) {
        profit = amount[connected_node];
      } else if (bob_path_map[connected_node] === alice_time) {
        profit = amount[connected_node] / 2;
      }
      alice_profit += profit;

      alice_backtrack(connected_node);

      alice_profit -= profit;
      alice_time--;
      alice_visited.delete(connected_node);
    }
  };

  alice_backtrack(0);

  return alice_profit_max;
}
