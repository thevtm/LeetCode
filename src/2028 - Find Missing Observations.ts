export {};

function missingRolls(rolls: number[], mean: number, n: number): number[] {
  const m = rolls.length;
  const rolls_sum = rolls.reduce((acc, x) => acc + x);

  let remainder = mean * (m + n) - rolls_sum;

  const has_min_dices = remainder >= n;
  const has_max_dices = remainder <= n * 6;
  if (!has_min_dices || !has_max_dices) {
    return [];
  }

  const answer = Array.from<number>({ length: n }).fill(1);
  remainder -= n; // Min dice is 1

  for (let i = 0; i < n; i++) {
    const v = Math.min(5, remainder);
    answer[i] += v;
    remainder -= v;

    if (remainder < 1) {
      break;
    }
  }

  return answer;
}
