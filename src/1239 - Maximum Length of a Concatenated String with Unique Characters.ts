export {}; // Necessary in order to avoid TS errors

function* concatenationsGenerator<T>(arr: T[]): Generator<[T, T]> {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      yield [arr[i], arr[j]];
    }
  }
}

function maxBy<T>(
  array: T[],
  criterion: (item: T, currentMax: T) => number
): T | undefined {
  if (array.length === 0) return undefined;

  return array.reduce((maxItem, currentItem) =>
    criterion(currentItem, maxItem) > criterion(maxItem, maxItem)
      ? currentItem
      : maxItem
  );
}

function doSetsOverlap<T>(setA: Set<T>, setB: Set<T>): boolean {
  for (let elem of setA) {
    if (setB.has(elem)) {
      return true;
    }
  }
  return false;
}

function combineSets<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a, ...b]);
}

function hasDuplicate<T>(arr: T[]): boolean {
  const set = new Set(arr);
  return arr.length !== set.size;
}

function* generateCombinations<T>(array: T[]): Generator<T[]> {
  function* combinationsInner(
    start: number,
    comboSize: number
  ): Generator<T[]> {
    if (comboSize === 0) {
      yield [];
      return;
    }
    for (let i = start; i <= array.length - comboSize; i++) {
      const head = array.slice(i, i + 1);
      const tailCombinations = combinationsInner(i + 1, comboSize - 1);
      for (let tail of tailCombinations) {
        yield head.concat(tail);
      }
    }
  }

  for (let size = 0; size <= array.length; size++) {
    yield* combinationsInner(0, size);
  }
}

function maxLength(arr: string[]): number {
  arr = arr.filter((el) => !hasDuplicate(el.split("")));

  if (arr.length == 0) {
    return 0;
  }

  const largest_str = maxBy(arr, (s) => s.length);

  if (arr.length == 1) {
    return largest_str!.length;
  }

  const largest_set_combination = maxBy(
    Array.from(generateCombinations(arr)),
    (els, currentMax) => {
      const combined_str = els.join("");

      if (currentMax.join("").length >= combined_str.length) {
        return 0;
      }

      if (hasDuplicate(combined_str.split(""))) {
        return 0;
      }

      return combined_str.length;
    }
  );

  return Math.max(
    largest_str!.length,
    largest_set_combination!.join("").length
  );
}
