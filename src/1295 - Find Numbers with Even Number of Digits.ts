export {};

function findNumbers(nums: number[]): number {
  return nums.reduce((acc, x) => {
    const num_digits = Math.floor(Math.log10(x)) + 1;
    const num_digits_is_even = num_digits % 2 === 0;

    return num_digits_is_even ? acc + 1 : acc;
  }, 0);
}
