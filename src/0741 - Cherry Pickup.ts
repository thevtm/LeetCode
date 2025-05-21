export {}; // Necessary in order to avoid TS errors

type Position = [number, number];

enum Direction {
  DownRight,
  TopLeft,
}

function cherryPickup(grid: number[][]): number {
  const n = grid.length;

  const possibleMoves = function* (pos: Position, direction: Direction): Generator<[Position, Direction]> {
    const [x, y] = pos;

    if (x === n - 1 && y === n - 1) {
      direction = Direction.TopLeft;
    }

    if (direction === Direction.TopLeft && x === 0 && y === 0) {
      return;
    }

    if (direction === Direction.DownRight) {
      if (x < n - 1 && grid[x + 1][y] !== -1) {
        yield [[x + 1, y], direction];
      }

      if (y < n - 1 && grid[x][y + 1] !== -1) {
        yield [[x, y + 1], direction];
      }
    } else {
      if (x > 0 && grid[x - 1][y] !== -1) {
        yield [[x - 1, y], direction];
      }

      if (y > 0 && grid[x][y - 1] !== -1) {
        yield [[x, y - 1], direction];
      }
    }
  };

  const recursive = (pos: Position = [0, 0], direction: Direction = Direction.DownRight): number => {
    const [x, y] = pos;
    const posCherry = grid[x][y];

    if (direction === Direction.TopLeft && x === 0 && y === 0) {
      return posCherry;
    }

    grid[x][y] = 0;
    let mostCherries = -1;

    for (const [newPos, newDirection] of possibleMoves(pos, direction)) {
      mostCherries = Math.max(mostCherries, recursive(newPos, newDirection));
    }

    grid[x][y] = posCherry;

    if (mostCherries === -1) {
      return -1;
    }

    return posCherry + mostCherries;
  };

  if (n === 1) {
    return grid[0][0];
  }

  return Math.max(0, recursive());
}

// [[0,1],[1,0]]
// [[0,1,-1],[1,0,-1],[1,1,1]]
// [[1,1,-1],[1,-1,1],[-1,1,1]]
// [[1]]
// [[1,1,1,1,-1,-1,-1,1,0,0],[1,0,0,0,1,0,0,0,1,0],[0,0,1,1,1,1,0,1,1,1],[1,1,0,1,1,1,0,-1,1,1],[0,0,0,0,1,-1,0,0,1,-1],[1,0,1,1,1,0,0,-1,1,0],[1,1,0,1,0,0,1,0,1,-1],[1,-1,0,1,0,0,0,1,-1,1],[1,0,-1,0,-1,0,0,1,0,0],[0,0,-1,0,1,0,1,0,0,1]]
