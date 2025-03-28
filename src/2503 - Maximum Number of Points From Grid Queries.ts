export {};

const DIRECTIONS: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function maxPoints(grid: number[][], queries: number[]): number[] {
  const m = grid.length;
  const n = grid[0].length;
  const max_query = Math.max(...queries);

  // console.log("m", m, "n", n, "max_query", max_query);

  const is_position_within_bounds = ([x, y]: [number, number]): boolean => x >= 0 && x < m && y >= 0 && y < n;
  const vec_2d_sum = (a: [number, number], b: [number, number]): [number, number] => [a[0] + b[0], a[1] + b[1]];

  //////////////////////////////////////////////////////////////////////////////

  const sorted_queries_with_index = queries.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);

  const queue = new MinPriorityQueue((v) => v.value);
  queue.enqueue({ value: grid[0][0], position: [0, 0] });

  const visited = new Set<number>([0]);

  const result = new Array<number>(queries.length);

  let count = 0;
  let sorted_queries_index = 0;

  while (!queue.isEmpty()) {
    const { value, position } = queue.dequeue();

    while (sorted_queries_index < queries.length && sorted_queries_with_index[sorted_queries_index][0] <= value)
      result[sorted_queries_with_index[sorted_queries_index++][1]] = count;

    count++;

    for (const direction of DIRECTIONS) {
      const new_position = vec_2d_sum(position, direction);
      const [new_x, new_y] = new_position;

      if (!is_position_within_bounds(new_position)) continue;
      if (grid[new_x][new_y] >= max_query) continue;

      const new_key = new_x * n + new_y;
      if (visited.has(new_key)) continue;
      visited.add(new_key);

      const new_value = Math.max(value, grid[new_x][new_y]);
      queue.enqueue({ value: new_value, position: new_position });
    }
  }

  while (sorted_queries_index < queries.length) result[sorted_queries_with_index[sorted_queries_index++][1]] = count;

  return result;
}
