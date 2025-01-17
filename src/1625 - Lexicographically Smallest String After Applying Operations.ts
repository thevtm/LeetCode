export {};

const STR_TO_STR_MAP: Record<string, number> = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
};

function findLexSmallestString(s: string, a: number, b: number): string {
  const nums_to_num = (nums: number[]): bigint => nums.reduce((acc, x) => acc * BigInt(10) + BigInt(x), BigInt(0));

  const s_nums = s.split("").map((x) => STR_TO_STR_MAP[x]);
  const s_nums_num = nums_to_num(s_nums);

  const visited = new Set<BigInt>([s_nums_num]);
  const stack = [s_nums];

  let lowest = s_nums_num;

  while (stack.length > 0) {
    const s = stack.pop()!;

    // Add
    const s_add = s.map((x, i) => (i % 2 === 1 ? (x + a) % 10 : x));
    const s_add_num = nums_to_num(s_add);

    if (!visited.has(s_add_num)) {
      visited.add(s_add_num);
      stack.push(s_add);

      if (lowest > s_add_num) {
        lowest = s_add_num;
      }
    }

    // Rotate
    const s_rotate = s.map((_, i) => s[(i + b) % s.length]);
    const s_rotate_num = nums_to_num(s_rotate);

    if (!visited.has(s_rotate_num)) {
      visited.add(s_rotate_num);
      stack.push(s_rotate);

      if (lowest > s_rotate_num) {
        lowest = s_rotate_num;
      }
    }

    // console.log(
    //   "s",
    //   nums_to_num(s).toString().padStart(s.length, "0"),
    //   "add",
    //   s_add_num.toString().padStart(s.length, "0"),
    //   "rotate",
    //   s_rotate_num.toString().padStart(s.length, "0")
    // );
  }

  return lowest.toString().padStart(s.length, "0");
}
