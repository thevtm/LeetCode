export {};

function deleteAndEarn(nums: number[]): number {
  const num_frequencies = new Map<number, number>();

  for (const num of nums) {
    num_frequencies.set(num, (num_frequencies.get(num) ?? 0) + 1);
  }

  const nums_uniq_sorted = Array.from(num_frequencies.keys()).sort((a, b) => a - b);

  const cache = new Map<number, number>();

  const dp = (num: number, skipped: number): number => {
    if (num === undefined) return 0;

    const cache_key = num * 1e5 + skipped;
    if (cache.has(cache_key)) return cache.get(cache_key)!;

    let new_skipped = skipped;
    while (new_skipped < nums_uniq_sorted.length && nums_uniq_sorted[new_skipped] <= num + 1) new_skipped++;

    const with_it = num * num_frequencies.get(num)! + dp(nums_uniq_sorted[new_skipped], new_skipped + 1);
    const without_it = dp(nums_uniq_sorted[skipped], skipped + 1);

    const result = Math.max(with_it, without_it);

    cache.set(cache_key, result);

    return result;
  };

  return dp(nums_uniq_sorted[0], 1);
}
