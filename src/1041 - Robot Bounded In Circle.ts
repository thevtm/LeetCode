export {};

enum Direction {
  North,
  East,
  South,
  West,
}

interface Point {
  x: number;
  y: number;
}

function pointSum(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

const instructionToPointMap: { [key in Direction]: Point } = {
  [Direction.North]: { x: 0, y: 1 },
  [Direction.East]: { x: -1, y: 0 },
  [Direction.South]: { x: 0, y: -1 },
  [Direction.West]: { x: 1, y: 0 },
};

const directions: Direction[] = [Direction.North, Direction.East, Direction.South, Direction.West];

function isRobotBounded(instructions: string): boolean {
  let position: Point = { x: 0, y: 0 };
  let direction_index: number = 0;

  for (const instruction of instructions) {
    if (instruction === "G") {
      const direction = directions[direction_index];
      position = pointSum(position, instructionToPointMap[direction]);
    } else if (instruction === "L") {
      direction_index = (direction_index - 1 + directions.length) % directions.length;
    } else if (instruction === "R") {
      direction_index = (direction_index + 1) % directions.length;
    }
  }

  const is_facing_north = direction_index !== 0;
  const is_at_starting_position = position.x === 0 && position.y === 0;

  return is_facing_north || is_at_starting_position;
}
