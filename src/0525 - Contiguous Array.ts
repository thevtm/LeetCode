export {};

function findMaxLength(nums: number[]): number {
  let delta = 0;
  let max = 0;
  const first_delta_map = new Map<number, number>();
  first_delta_map.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    delta += nums[i] === 0 ? 1 : -1;

    if (first_delta_map.has(delta)) {
      max = Math.max(max, i - first_delta_map.get(delta)!);
    } else {
      first_delta_map.set(delta, i);
    }
  }

  return max;
}

/*

1 1 2
0 1 1

[0,1,1,1,1,1,0,0,0]
[0,1,2,3,4,5,5,5,5]
       3   2   1
       2   3   4

[ 0, 1, 1, 1, 1, 1, 0, 0, 0]
[ 1, 1, 1, 1, 1, 1, 2, 3, 4]
[ 0, 1, 2, 3, 4, 5, 5, 5, 5]
[-1, 0, 1, 2, 3, 4, 3, 2, 1]
*/
