export {};

function subsetXORSum(nums: number[]): number {
  let xor_total = 0;
  let xor_acc = 0;

  const backtrack = (index: number = 0): void => {
    const xor_acc_before = xor_acc;

    for (let i = index; i < nums.length; i++) {
      const n = nums[i];

      xor_acc ^= n;
      xor_total += xor_acc;

      backtrack(i + 1);

      xor_acc = xor_acc_before;
    }
  };

  backtrack();

  return xor_total;
}
