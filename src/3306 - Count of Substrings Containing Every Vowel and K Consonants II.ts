export {};

function countOfSubstrings(word: string, k: number): number {
  const CONSONANT_KEY = "consonant";
  const VOWELS = new Set(["a", "e", "i", "o", "u"]);

  const letter_to_key = (letter: string): string => (VOWELS.has(letter) ? letter : CONSONANT_KEY);

  const key_frequencies = { a: 0, e: 0, i: 0, o: 0, u: 0, consonant: 0 };
  const vowels_present = new Set<string>();
  let left = 0;
  let leading_vowels = 0;
  let result = 0;

  for (let right = 0; right < word.length; right++) {
    const key = letter_to_key(word[right]);
    key_frequencies[key]++;

    if (key !== CONSONANT_KEY) {
      vowels_present.add(key);
    }

    while (key_frequencies[CONSONANT_KEY] > k) {
      const left_key = letter_to_key(word[left++]);
      key_frequencies[left_key]--;
      leading_vowels = 0;

      if (left_key !== CONSONANT_KEY && key_frequencies[left_key] === 0) {
        vowels_present.delete(left_key);
      }
    }

    while (VOWELS.has(word[left]) && key_frequencies[word[left]] > 1) {
      key_frequencies[word[left++]]--;
      leading_vowels++;
    }

    if (key_frequencies[CONSONANT_KEY] === k && vowels_present.size === 5) {
      result += 1 + leading_vowels;
    }
  }

  return result;
}
