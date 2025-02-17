export {};

function numTilePossibilities(tiles: string): number {
  // const frequencies = new Map<string, number>();
  // for (const c of tiles) frequencies.set(c, (frequencies.get(c) ?? 0) + 1);
  // const frequencies_counts = frequencies.values();
  // console.log(frequencies_counts);

  const combinations = new Set<string>();
  const taken: boolean[] = new Array(tiles.length).fill(false);
  let acc = "";

  const backtrack = () => {
    for (let i = 0; i < tiles.length; i++) {
      if (taken[i]) continue;

      acc += tiles[i];
      taken[i] = true;

      if (!combinations.has(acc)) {
        combinations.add(acc);
        backtrack();
      }

      acc = acc.slice(0, acc.length - 1);
      taken[i] = false;
    }
  };

  backtrack();

  return combinations.size;
}
