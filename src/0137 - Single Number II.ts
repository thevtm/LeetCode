export {}; // Necessary in order to avoid TS errors

function singleNumber(nums: number[]): number {
  const counts: number[] = new Array<number>(32).fill(0);
  let negativeCount: number = 0;

  for (let num of nums) {
    let i = 0;

    // if (num < 0) {
    //   negativeCount++;
    //   num = Math.abs(num);
    // }

    while (num !== 0 && i < counts.length) {
      if ((num & 1) === 1) {
        counts[i]++;
      }

      num >>= 1;
      i++;
    }
  }

  counts.reverse();

  console.log("counts", counts.join(" "));
  console.log("negativeCount", negativeCount);

  let result = counts.reduce((acc, count) => (acc << 1) + (count % 3));

  // if (negativeCount % 3 === 1) {
  //   result = -result;
  // }

  return result;
}
