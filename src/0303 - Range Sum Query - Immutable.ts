export {};

class NumArray {
  prefix_sum: number[];

  constructor(nums: number[]) {
    this.prefix_sum = new Array(nums.length);
    this.prefix_sum[0] = nums[0];

    for (let i = 1; i < nums.length; i++) {
      this.prefix_sum[i] = this.prefix_sum[i - 1] + nums[i];
    }
  }

  sumRange(left: number, right: number): number {
    return this.prefix_sum[right] - (this.prefix_sum[left - 1] ?? 0);
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
