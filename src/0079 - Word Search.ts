export {}; // Necessary in order to avoid TS errors

type Position = [number, number];

function exist(board: string[][], word: string): boolean {
  const boardWidth = board[0].length;
  const boardHeight = board.length;

  const calcAdjacentPos = function* (pos: Position): Generator<Position> {
    const [x, y] = pos;

    const isTop = y === 0;
    const isBottom = y === boardHeight - 1;
    const isLeftEdge = x === 0;
    const isRightEdge = x === boardWidth - 1;

    if (!isTop) {
      yield [x, y - 1];
    }

    if (!isBottom) {
      yield [x, y + 1];
    }

    if (!isLeftEdge) {
      yield [x - 1, y];
    }

    if (!isRightEdge) {
      yield [x + 1, y];
    }
  };

  const positionHash = (pos: Position) => pos[0] * boardHeight + pos[1];

  const stack: [number, Position][] = [];

  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      if (board[j][i] === word[0]) {
        stack.push([0, [i, j]]);
      }
    }
  }

  // console.log(stack);

  const visited = new Set<number>();

  while (!_.isEmpty(stack)) {
    // console.log(stack, visited);

    const [i, pos] = _.last(stack);

    if (i === word.length - 1) {
      return true;
    }

    const posHash = positionHash(pos);

    if (visited.has(posHash)) {
      visited.delete(posHash);
      stack.pop();
      continue;
    }

    let hasNext: boolean = false;
    const expectedLetter = word[i + 1];

    for (const adjacentPos of calcAdjacentPos(pos)) {
      const alreadyVisited = visited.has(positionHash(adjacentPos));
      const matchLetter = board[adjacentPos[1]][adjacentPos[0]] === expectedLetter;

      if (!alreadyVisited && matchLetter) {
        hasNext = true;
        stack.push([i + 1, adjacentPos]);
      }
    }

    if (hasNext) {
      visited.add(posHash);
    } else {
      stack.pop();
    }
  }

  return false;
}
