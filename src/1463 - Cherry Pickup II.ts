export {}; // Necessary in order to avoid TS errors

type Position = [number, number];

function cherryPickup(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const possibleMoves = function* (pos: Position): Generator<Position> {
    const [x, y] = pos;
    const newX = x + 1;

    if (newX >= rows) {
      return;
    }

    if (y > 0) {
      yield [newX, y - 1];
    }

    yield [newX, y];

    if (y < cols - 1) {
      yield [newX, y + 1];
    }
  };

  const cache = new Map<number, number>();
  const getCacheKey = (pos1: Position, pos2: Position): number =>
    pos1[0] + pos1[1] * rows + rows * cols * (pos2[0] + pos2[1] * rows);

  const recursive = (robot1Pos: Position = [0, 0], robot2Pos: Position = [0, cols - 1]): number => {
    let topCherries = 0;

    for (const robot1NewPos of possibleMoves(robot1Pos)) {
      for (const robot2NewPos of possibleMoves(robot2Pos)) {
        // const cacheKey = JSON.stringify([robot1NewPos, robot2NewPos]); // 1200ms slower
        const cacheKey = getCacheKey(robot1NewPos, robot2NewPos);
        const cherries = (cache[cacheKey] ??= recursive(robot1NewPos, robot2NewPos));

        topCherries = Math.max(topCherries, cherries);
      }
    }

    const [r1x, r1y] = robot1Pos;
    const [r2x, r2y] = robot2Pos;

    if (r1x === r2x && r1y === r2y) {
      return topCherries + grid[r1x][r1y];
    }

    return topCherries + grid[r1x][r1y] + grid[r2x][r2y];
  };

  return recursive();
}
