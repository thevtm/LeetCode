export {};

function minimumRecolors(blocks: string, k: number): number {
  let whites = 0;

  for (let i = 0; i < k; i++) {
    if (blocks[i] === "W") whites++;
  }

  let min = whites;

  for (let i = k; i < blocks.length; i++) {
    if (blocks[i] === "W") whites++;
    if (blocks[i - k] === "W") whites--;
    min = Math.min(min, whites);
  }

  return min;
}
