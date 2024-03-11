export {}; // Necessary in order to avoid TS errors

function intersection(nums1: number[], nums2: number[]): number[] {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  const result: number[] = [];

  for (const n of set1.values()) {
    if (set2.has(n)) {
      result.push(n);
    }
  }

  return result;
}
