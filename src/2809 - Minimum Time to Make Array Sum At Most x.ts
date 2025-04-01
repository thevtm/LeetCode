export {};

function minimumTime(nums1: number[], nums2: number[], x: number): number {
  const n = nums1.length;

  const nums1_sum = nums1.reduce((acc, v) => acc + v);
  const nums2_sum = nums2.reduce((acc, v) => acc + v);

  const intercept = nums1_sum;
  const coefficient = nums2_sum;

  // console.log("intercept", intercept, "coefficient", coefficient, "\n");

  if (intercept <= x) return 0;

  const nums_order = Array.from({ length: nums1.length }, (_, index) => index).sort((a, b) => nums2[a] - nums2[b]);
  // (a, b) => nums2[a] - nums2[b] || nums1[a] - nums1[b]

  // console.log("nums_order", nums_order, "\n");

  nums1 = nums_order.map((x) => nums1[x]);
  nums2 = nums_order.map((x) => nums2[x]);

  // console.log("nums1", nums1, "\n");
  // console.log("nums2", nums2, "\n");

  const dp = new Array(n + 1).fill(0);

  let r = Infinity;

  for (let i = 1; i <= n; i++) {
    for (let j = Math.min(i, r); j >= 1; j--) {
      dp[j] = Math.max(dp[j], dp[j - 1] + nums2[i - 1] * j + nums1[i - 1]);

      if (intercept + coefficient * j - dp[j] <= x && j < r) {
        r = j;
      }
    }
  }

  // console.log();

  /* [0, 6, 13, 20] */
  // [0, 10, 22, 35, 50, 66, 80 ]
  // console.log("dp", dp, "\n");

  return r === Infinity ? -1 : r;
}
