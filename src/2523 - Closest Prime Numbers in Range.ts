export {};

function* PrimeGenerator(n: number): Generator<number> {
  if (n < 2) return;

  yield 2;

  const sieve = new Array<boolean>(n + 1);

  for (let i = 3; i <= n; i += 2) {
    if (sieve[i] !== undefined) continue;
    for (let j = i * i; j <= n; j += 2 * i) sieve[j] = true;
    yield i;
  }
}

function closestPrimes(left: number, right: number): [number, number] {
  if (right <= 2) return [-1, -1];

  let result: [number, number] = [-1, -1];
  let result_delta = Infinity;
  let previous_prime = -1;

  for (const prime of PrimeGenerator(right)) {
    if (previous_prime >= left && prime <= right && prime - previous_prime < result_delta) {
      result = [previous_prime, prime];
      result_delta = prime - previous_prime;
    }

    previous_prime = prime;
  }

  return result;
}
