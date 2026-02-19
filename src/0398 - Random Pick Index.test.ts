class Solution {
  map = new Map<number, number[]>();

  constructor(nums: number[]) {
    for (const [index, num] of nums.entries()) {
      const indexes = this.map.get(num);

      if (indexes === undefined) {
        this.map.set(num, [index]);
      } else {
        indexes.push(index);
      }
    }
  }

  pick(target: number): number {
    const indexes = this.map.get(target)!;

    return indexes[Math.floor(Math.random() * indexes.length)];
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */
