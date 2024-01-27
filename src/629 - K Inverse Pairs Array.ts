export {}; // Necessary in order to avoid TS errors

const MOD = BigInt(1e9 + 7);

// n1 k0 -> 1
// n1 k1 -> 0

// n2 k0 -> 1 [1, 2]
// n2 k1 -> 1 [2, 1]
// n2 k2 -> 0

// n3 k0 -> 1 [1, 2, 3]
// n3 k1 -> 2 [1, 3, 2] [2, 1, 3]
// n3 k2 -> 2 [3, 1, 2] [2, 3, 1]
// n3 k3 -> 1 [3, 2, 1]
// n3 k4 -> 0

//   00 01 02 03 04 05 06 07 08 09 10 11
// 1 01 00 00 00 00 00 00 00 00 00 00 00
// 2 01 01 00 00 00 00 00 00 00 00 00 00
// 3 01 02 02 01 00 00 00 00 00 00 00 00
// 4 01 03 05 06 05 03 01 00 00 00 00 00
// 5 01 04 09 15 20 22 20 15 09 04 01 00
//                  01 03 05 06 05 03 01

// DP[i][j] = DP[i - 1][j] + DP[i][j - 1] - DP[i - 1][j - i - 1]

function kInversePairs(n: number, k: number): number {
  k = k + 1;

  const dp: bigint[][] = Array.from({ length: n }, () => Array(k).fill(BigInt(0)));
  dp[0][0] = BigInt(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < k; j++) {
      const topValue = get(dp, [i - 1, j], BigInt(0));
      const leftValue = get(dp, [i, j - 1], BigInt(0));
      const decayingValue = j > i ? get(dp, [i - 1, j - i - 1], BigInt(0)) : BigInt(0);

      dp[i][j] = topValue + leftValue - decayingValue;

      if (dp[i][j] === BigInt(0)) {
        continue;
      }
    }
  }

  // for (const row of dp) {
  //   console.log(row);
  // }

  return Number(dp[n - 1][k - 1] % MOD);
}

function bruteForce(n: number, k: number): number {
  let count = 0;
  const counts: number[] = [];

  for (const permutation of generatePermutations(Array.from(rangeGenerator(1, n)))) {
    const inversePairCount = countInversePairs(permutation);
    const hasRightCount = inversePairCount === k;

    if (hasRightCount) {
      count++;
    }

    // console.log([JSON.stringify(hasRightCount).padStart(5), inversePairCount, permutation]);
    counts.push(inversePairCount);
  }

  console.log(frequencyMap(counts));

  return count;
}

function* generatePermutations<T>(array: T[], size: number = array.length): Generator<T[]> {
  if (size === 1) {
    yield array.slice();
    return;
  }

  for (let i = 0; i < size - 1; i++) {
    yield* generatePermutations(array, size - 1);

    const j = size % 2 === 0 ? i : 0;
    [array[j], array[size - 1]] = [array[size - 1], array[j]];
  }

  yield* generatePermutations(array, size - 1);
}

function* rangeGenerator(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function countInversePairs(arr: number[]): number {
  let count = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        count++;
      }
    }
  }

  return count;
}

function frequencyMap<T>(arr: T[]): Map<T, number> {
  return arr.reduce((acc, el) => acc.set(el, (acc.get(el) ?? 0) + 1), new Map());
}

function get<T>(arr: T[][], pos: [number, number], default_value: T): T {
  const [i, j] = pos;

  if (arr[i] == null) {
    return default_value;
  }

  return arr[i][j] ?? default_value;
}
