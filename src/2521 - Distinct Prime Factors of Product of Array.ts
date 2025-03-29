export {};

function distinctPrimeFactors(nums: number[]): number {
  const PRIMES = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109,
    113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239,
    241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367,
  ];

  let prime_factors = new Set<number>();

  for (const num of nums) {
    let n = num;

    for (const prime of PRIMES) {
      if (prime * prime > n) {
        break;
      }

      if (n % prime === 0) {
        n /= prime;

        while (n % prime === 0) {
          n /= prime;
        }

        prime_factors.add(prime);
      }
    }

    if (n > 1) {
      prime_factors.add(n);
    }
  }

  // console.log(prime_factors);

  return prime_factors.size;
}
