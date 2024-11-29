export {}; // Necessary in order to avoid TS errors

function countTriplets(arr: number[]): number {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = j + 1; k <= arr.length; k++) {
        const a = j - i === 0 ? 0 : arr.slice(i, j).reduce((acc, x) => acc ^ x);
        const b = j - k === 0 ? 0 : arr.slice(j, k).reduce((acc, x) => acc ^ x);

        if (a === b) {
          // console.log(`>`, `i=${i}`, `j=${j}`, `k=${k}`, `a=${a}`, `b=${b}`, `a=b=${a === b}`);
          result++;
        }
      }
    }
  }

  return result;
}
