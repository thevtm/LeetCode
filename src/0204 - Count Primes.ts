export {};

function countPrimes(n: number): number {
  if (n <= 2) return 0;

  const sieve = new Array<boolean>(n);

  let primes_count = 1;

  for (let i = 3; i < n; i += 2) {
    if (sieve[i] !== undefined) continue;
    for (let j = i * i; j < n; j += 2 * i) sieve[j] = true;
    primes_count++;
  }

  return primes_count;
}
