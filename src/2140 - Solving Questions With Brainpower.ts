export {};

function mostPoints(questions: [number, number][]): number {
  const n = questions.length;

  const dp = new Array(n);

  for (let i = n - 1; i >= 0; i--) {
    const [points, brainpower] = questions[i];

    const taken = points + (dp[i + brainpower + 1] ?? 0);
    const not_taken = dp[i + 1] ?? 0;

    dp[i] = Math.max(taken, not_taken);
  }

  return dp[0];

  console.log("dp", dp);

  const recur = _.memoize((skipped: number): number => {
    if (skipped >= questions.length) return 0;

    const [points, brainpower] = questions[skipped];

    const taken = points + recur(skipped + brainpower + 1);
    const not_taken = recur(skipped + 1);

    return Math.max(taken, not_taken);
  });

  return recur(0);
}
