export {}; // Necessary in order to avoid TS errors

function* rangeGenerator(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function subtractSets<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  let resultSet = new Set(setA);
  for (let elem of setB) {
    resultSet.delete(elem);
  }
  return resultSet;
}

function findErrorNums(nums: number[]): number[] {
  const nums_set = new Set(nums);
  const expected_nums_set = new Set(rangeGenerator(1, nums.length));

  const missing_num = subtractSets(expected_nums_set, nums_set)
    .values()
    .next().value;

  const duplicate_num = nums.find(
    ((acc, n) => (acc.has(n) ? true : acc.add(n) && false)).bind(
      null,
      new Set()
    )
  );

  console.log([nums, expected_nums_set, missing_num]);

  return [duplicate_num, missing_num];
}
