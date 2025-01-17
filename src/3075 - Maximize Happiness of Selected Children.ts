export {};

function maximumHappinessSum(happiness: number[], k: number): number {
  happiness.sort((a, b) => a - b);

  let max_happiness = 0;

  for (let i = 0; i < k; i++) {
    max_happiness += Math.max(0, happiness[happiness.length - i - 1] - i);
  }

  return max_happiness;
}
