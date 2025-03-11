export {};

function numberOfSubstrings(s: string): number {
  const frequencies = { a: 0, b: 0, c: 0 };
  const uniqueChars = new Set<string>();
  let left = 0;
  let count = 1;
  let result = 0;

  for (let right = 0; right < s.length; right++) {
    const letter = s[right];

    frequencies[letter]++;
    uniqueChars.add(letter);

    if (uniqueChars.size !== 3) continue;

    while (frequencies[s[left]] > 1) {
      frequencies[s[left++]]--;
      count++;
    }

    result += count;
  }

  return result;
}
