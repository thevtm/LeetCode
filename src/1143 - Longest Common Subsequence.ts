export {}; // Necessary in order to avoid TS errors

function longestCommonSubsequence(text1: string, text2: string): number {
  const matrix = Array.from({ length: text1.length }, () => Array(text2.length).fill(0));

  for (let i = 0; i < text1.length; i++) {
    for (let j = 0; j < text2.length; j++) {
      if (text1[i] === text2[j]) {
        matrix[i][j] = ((matrix[i - 1] ?? [])[j - 1] ?? 0) + 1;
      } else {
        matrix[i][j] = Math.max((matrix[i - 1] ?? [])[j] ?? 0, matrix[i][j - 1] ?? 0);
      }
    }
  }

  // for (const row of matrix) {
  //   console.log(row);
  // }

  return matrix[text1.length - 1][text2.length - 1];
}

function compare<T>(a: T, b: T): number {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

function sort<T>(arr: T[]): T[] {
  return arr.sort(compare);
}

function sortBy<T, J>(mut_arr: T[], fn: (T) => J): T[] {
  return mut_arr.sort((a, b) => compare(fn(a), fn(b)));
}

function* stringSubsequenceGenerator(str: string, size: number): Generator<string> {
  const number_of_subsequences = str.length - size + 1;

  for (let i = 0; i < number_of_subsequences; i++) {
    yield str.substring(i, i + size);
  }
}

function doSetsOverlap<T>(setA: Set<T>, setB: Set<T>): boolean {
  for (let elem of setA) {
    if (setB.has(elem)) {
      return true;
    }
  }
  return false;
}

function isCommonSubsequence(largest_str: string, smallest_str: string): boolean {
  let found_chars = 0;

  for (const char of largest_str.split("")) {
    const char_to_find = smallest_str[found_chars];

    if (char === char_to_find) {
      found_chars++;

      if (found_chars === smallest_str.length) {
        return true;
      }
    }
  }

  return false;
}
