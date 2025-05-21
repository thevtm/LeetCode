export {}; // Necessary in order to avoid TS errors

function findJudge(n: number, trust: number[][]): number {
  const trustAnyone = new Array<boolean>(n).fill(false);
  const trustCount = new Array<number>(n).fill(0);

  for (let i = 0; i < trust.length; i++) {
    const [source, target] = trust[i];

    trustAnyone[source - 1] = true;
    trustCount[target - 1]++;
  }

  for (let i = 0; i < n; i++) {
    if (!trustAnyone[i] && trustCount[i] === n - 1) {
      return i + 1;
    }
  }

  return -1;
}
