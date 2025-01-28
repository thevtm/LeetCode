export {};

type Position = [number, number];

const directions: Position[] = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function sum_positions(a: Position, b: Position): Position {
  return [a[0] + b[0], a[1] + b[1]];
}

function findMaxFish(grid: number[][]): number {
  const get_cell_value = (pos: Position): number => grid[pos[1]][pos[0]];

  const width = grid[0].length;
  const height = grid.length;
  const is_position_within_bounds = (pos: Position): boolean =>
    pos[0] >= 0 && pos[0] < width && pos[1] >= 0 && pos[1] < height;

  const GRID_POSITION_KEY_OFFSET = 100;
  const position_to_key = (pos: Position): number => pos[0] * GRID_POSITION_KEY_OFFSET + pos[1];

  const grid_visited = new Set<number>();

  const fish_flood_fill = (cell: Position): number => {
    let fish_count = 0;
    const stack = [cell];

    while (stack.length > 0) {
      const c = stack.pop()!;

      if (!is_position_within_bounds(c)) {
        continue;
      }

      const c_value = get_cell_value(c);

      const isLand = c_value === 0;
      if (isLand) {
        continue;
      }

      const c_key = position_to_key(c);
      const hasBeenVisited = grid_visited.has(c_key);

      if (hasBeenVisited) {
        continue;
      }
      grid_visited.add(c_key);

      for (const direction of directions) {
        stack.push(sum_positions(c, direction));
      }

      fish_count += c_value;
    }

    return fish_count;
  };

  let max_fishes = 0;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      max_fishes = Math.max(max_fishes, fish_flood_fill([x, y]));
    }
  }

  return max_fishes;
}
