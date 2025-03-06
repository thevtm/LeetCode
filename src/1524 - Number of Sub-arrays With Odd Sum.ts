export {};

function numOfSubarrays(arr: number[]): number {
  const MOD = 1e9 + 7;

  let odds = 0;
  let evens = 0;
  let sum = 0;
  let result = 0;

  for (const num of arr) {
    sum = (sum + num) % MOD;

    if (sum % 2 === 1) {
      result = (1 + result + evens) % MOD;
      odds++;
    } else {
      result = (result + odds) % MOD;
      evens++;
    }
  }

  return result;
}
