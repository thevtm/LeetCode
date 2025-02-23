export {};

function maxScore(s: string): number {
  const zeros_cum = new Array<number>(s.length);
  const ones_cum = new Array<number>(s.length);

  for (let i = 0; i < s.length; i++) {
    const zix = i;
    zeros_cum[zix] = (zeros_cum[zix - 1] ?? 0) + (s[zix] === "0" ? 1 : 0);

    const oix = s.length - 1 - i;
    ones_cum[oix] = (ones_cum[oix + 1] ?? 0) + (s[oix] === "1" ? 1 : 0);
  }

  let max_score = 0;

  for (let i = 0; i < s.length - 1; i++) {
    max_score = Math.max(max_score, zeros_cum[i] + ones_cum[i + 1]);
  }

  return max_score;
}
