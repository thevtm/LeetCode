export {}; // Necessary in order to avoid TS errors

function getCommon(nums1: number[], nums2: number[]): number {
  let it1 = 0;
  let it2 = 0;

  while (nums1[it1] !== nums2[it2]) {
    if (it1 >= nums1.length || it2 >= nums2.length) {
      return -1;
    }

    if (nums1[it1] < nums2[it2]) {
      it1++;
    } else {
      it2++;
    }
  }

  return nums1[it1];
}
