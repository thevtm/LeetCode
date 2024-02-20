export {}; // Necessary in order to avoid TS errors

function singleNumber(nums: number[]): number {
  let acc = 0;

  for (const num of nums) {
    const bacc = acc;
    if ((acc & ~num) !== 0) {
      acc += num;
    } else {
      acc -= num;
    }
    console.log(`${bacc} & ~${num} = ${acc}`);
  }

  return nums.reduce((acc, x) => acc ^ x);
}

// F T = T
// T F = T
// F F = F
// T T = F

// (A & !B) | (!A & B)
// F T = F
// T F = T
// T T = F
// F F = F

// 1 0 1 0
// 1 1 0 0
// 0
