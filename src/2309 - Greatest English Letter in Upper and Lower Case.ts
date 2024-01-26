export {}; // Necessary in order to avoid TS errors

function partition<T>(
  array: T[],
  predicate: (element: T) => boolean
): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];

  array.forEach((element) => {
    if (predicate(element)) {
      pass.push(element);
    } else {
      fail.push(element);
    }
  });

  return [pass, fail];
}

function isUpperCase(char: string): boolean {
  return char === char.toUpperCase();
}

function isLowerCase(char: string): boolean {
  return !isUpperCase(char);
}

function intersect<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  let intersection = new Set<T>();
  for (let elem of setA) {
    if (setB.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
}

function max<T>(arr: T[], compareFn: (a: T, b: T) => number): T | undefined {
  if (arr.length === 0) return undefined;

  return arr.reduce((a, b) => (compareFn(a, b) > 0 ? a : b));
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

function greatestLetter(s: string): string {
  const characters: string[] = s.split("");

  const [lower_characters, upper_characters] = partition(
    characters,
    isLowerCase
  );

  const lower_characters_set = new Set(
    lower_characters.map((c) => c.toUpperCase())
  );
  const upper_characters_set = new Set(upper_characters);

  const common = intersect(lower_characters_set, upper_characters_set);

  return max([...common], compare) ?? "";
}
