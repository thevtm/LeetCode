export {};

function mergeArrays(nums1: number[][], nums2: number[][]): number[][] {
  let nums1_idx = 0;
  let nums2_idx = 0;

  const result: number[][] = [];

  while (nums1_idx < nums1.length && nums2_idx < nums2.length) {
    const n1 = nums1[nums1_idx];
    const n2 = nums2[nums2_idx];

    if (n1[0] === n2[0]) {
      result.push([n1[0], n1[1] + n2[1]]);
      nums1_idx++;
      nums2_idx++;
    } else if (n1[0] < n2[0]) {
      result.push(n1);
      nums1_idx++;
    } else {
      result.push(n2);
      nums2_idx++;
    }
  }

  while (nums1_idx < nums1.length) {
    result.push(nums2[nums2_idx]);
    nums2_idx++;
  }

  while (nums2_idx < nums2.length) {
    result.push(nums1[nums1_idx]);
    nums1_idx++;
  }

  return result;
}
