export {};

function maximumCandies(candies: number[], k: number): number {
  const candies_total = candies.reduce((acc, v) => acc + v);
  const candies_max = Math.floor(candies_total / k);

  let lower_bound = 0;
  let upper_bound = candies_max;
  let max = 0;

  while (lower_bound <= upper_bound) {
    const middle_point = Math.floor((lower_bound + upper_bound) / 2);

    let candy_piles = 0;
    for (const candy of candies) {
      candy_piles += Math.floor(candy / middle_point);
    }

    const has_enough = candy_piles >= k;

    if (has_enough) {
      max = Math.max(max, middle_point);
      lower_bound = middle_point + 1;
    } else {
      upper_bound = middle_point - 1;
    }
  }

  return max;
}
