export {};

function findTheDistanceValue(arr1: number[], arr2: number[], d: number): number {
  let count = arr1.length;

  for (const a of arr1) {
    for (const b of arr2) {
      const distance = Math.abs(a - b);
      if (distance <= d) {
        count--;
        break;
      }
    }
  }

  return count;
}
