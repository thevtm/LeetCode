export {};

function findDiagonalOrder(nums: number[][]): number[] {
  const tuples = new Array<[number, number, number]>();

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
      tuples.push([i + j, i, nums[i][j]]);
    }
  }

  tuples.sort((a, b) => {
    if (a[0] != b[0]) {
      return a[0] - b[0];
    }

    return b[1] - a[1];
  });

  return tuples.map((x) => x[2]);
}
