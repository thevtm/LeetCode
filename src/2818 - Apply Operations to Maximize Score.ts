export {};

function maximumScore(nums: number[], k: number): number {
  const PRIMES = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109,
    113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239,
    241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367,
  ];

  const dpfc = (n: number): number => {
    let count = 0;

    for (const prime of PRIMES) {
      if (prime * prime > n) {
        break;
      }

      if (n % prime === 0) {
        n /= prime;

        while (n % prime === 0) {
          n /= prime;
        }

        count++;
      }
    }

    if (n > 1) count++;

    return count;
  };

  const nums_dpfc = nums.map(dpfc);

  // console.log("nums_dpfc", nums_dpfc);

  //////////////////////////////////////////////////////////////////////////////

  const nums_lower_bound = (() => {
    const stack: number[] = [];
    const stack_top = () => stack[stack.length - 1];

    const monotonic_stack = new Array<number>(nums.length);

    for (let i = 0; i < nums.length; i++) {
      while (stack.length > 0 && nums_dpfc[i] > nums_dpfc[stack_top()]) stack.pop();
      monotonic_stack[i] = i - (stack_top() ?? -1);
      stack.push(i);
    }

    return monotonic_stack;
  })();

  // console.log("nums_lower_bound", nums_lower_bound);

  const nums_upper_bound = (() => {
    const stack: number[] = [];
    const stack_top = () => stack[stack.length - 1];

    const monotonic_stack = new Array<number>(nums.length);

    for (let i = nums.length - 1; i >= 0; i--) {
      while (stack.length > 0 && nums_dpfc[i] >= nums_dpfc[stack_top()]) stack.pop();
      monotonic_stack[i] = (stack_top() ?? nums.length) - i;
      stack.push(i);
    }

    return monotonic_stack;
  })();

  // console.log("nums_upper_bound", nums_upper_bound);

  //////////////////////////////////////////////////////////////////////////////

  const fast_modular_exponentiation = (base: bigint, exponent: bigint, modulus: bigint): bigint => {
    base = base % modulus;

    let result = 1n;

    while (exponent > 0) {
      if (exponent % 2n === 1n) {
        result = (result * base) % modulus;
      }

      base = (base * base) % modulus;
      exponent /= 2n;
    }

    return result;
  };

  //////////////////////////////////////////////////////////////////////////////

  const MOD = BigInt(1e9 + 7);

  const nums_sorted_with_index = nums.map((n, i) => [n, i]).sort((a, b) => b[0] - a[0] || a[1] - b[1]);

  // console.log("nums_sorted_with_index", nums_sorted_with_index);

  let result = 1n;
  let num_index = 0;

  while (k > 0) {
    const [num, index] = nums_sorted_with_index[num_index++];

    const left = nums_lower_bound[index];
    const right = nums_upper_bound[index];

    const operations = Math.min(k, left * right);
    k -= operations;

    result = (result * fast_modular_exponentiation(BigInt(num), BigInt(operations), MOD)) % MOD;

    // console.log("num", num, "left", left, "right", right, "operations", operations);
  }

  return Number(result);
}
