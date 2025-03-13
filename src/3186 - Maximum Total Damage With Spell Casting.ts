export {};

function maximumTotalDamage(powers: number[]): number {
  const power_frequencies = new Map<number, number>();
  for (const power of powers) {
    power_frequencies.set(power, (power_frequencies.get(power) ?? 0) + 1);
  }

  const powers_uniq_sorted = Array.from(power_frequencies.keys()).sort((a, b) => a - b);

  const dp = new Array(powers_uniq_sorted.length + 1);

  dp[dp.length - 1] = 0;

  const last_power = powers_uniq_sorted[powers_uniq_sorted.length - 1];
  dp[dp.length - 2] = last_power * power_frequencies.get(last_power)!;

  for (let i = dp.length - 3; i >= 0; i--) {
    const power = powers_uniq_sorted[i];

    let skipped = i + 1;
    while (skipped < powers_uniq_sorted.length && powers_uniq_sorted[skipped] <= power + 2) skipped++;

    const with_it = power * power_frequencies.get(power)! + dp[skipped];
    const without_it = dp[i + 1];

    dp[i] = Math.max(with_it, without_it);
  }

  return dp[0];
}
