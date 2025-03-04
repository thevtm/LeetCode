export {}; // Necessary in order to avoid TS errors

function combinationSum4(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);

  const cache = new Map<number, number>();
  cache.set(0, 1);

  const dp = (remainder: number): number => {
    if (cache.has(remainder)) return cache.get(remainder)!;

    let combinations = 0;

    for (let i = 0; i < nums.length && remainder >= nums[i]; i++) {
      combinations += dp(remainder - nums[i]);
    }

    cache.set(remainder, combinations);
    return combinations;
  };

  const result = dp(target);

  return result;
}
