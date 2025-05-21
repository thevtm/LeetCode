export {};

function minEatingSpeed(piles: number[], h: number): number {
  const bananas_total = piles.reduce((acc, v) => acc + v);
  const bananas_min = Math.ceil(bananas_total / h);
  const top_pile = Math.max(...piles);

  let lower_bound = bananas_min;
  let upper_bound = top_pile;
  let min = Infinity;

  while (lower_bound <= upper_bound) {
    const middle_point = Math.floor((lower_bound + upper_bound) / 2);

    let hours_taken = 0;
    for (const bananas of piles) {
      hours_taken += Math.ceil(bananas / middle_point);
    }

    const has_enough = hours_taken <= h;

    if (has_enough) {
      min = Math.min(min, middle_point);
      upper_bound = middle_point - 1;
    } else {
      lower_bound = middle_point + 1;
    }
  }

  return min;
}
