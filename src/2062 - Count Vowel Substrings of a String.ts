export {};

function countVowelSubstrings(word: string): number {
  const vowel_bitmasks = { a: 1 << 0, e: 1 << 1, i: 1 << 2, o: 1 << 3, u: 1 << 4 };
  let vowel_counts = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  let vowels_bitmap = 0;
  let left = 0;
  let substrings_in_window = 1;
  let result = 0;

  for (let right = 0; right < word.length; right++) {
    const letter = word[right];
    const is_consonant = vowel_counts[letter] === undefined;

    if (is_consonant) {
      vowel_counts = { a: 0, e: 0, i: 0, o: 0, u: 0 };
      vowels_bitmap = 0;
      left = right + 1;
      substrings_in_window = 1;
      continue;
    }

    // letter is a vowel
    vowel_counts[letter]++;

    if (vowel_counts[letter] === 1) {
      vowels_bitmap |= vowel_bitmasks[letter];
    }

    if (vowels_bitmap === 0b11111) {
      while (vowel_counts[word[left]] > 1) {
        vowel_counts[word[left]]--;
        substrings_in_window++;
        left++;
      }

      result += substrings_in_window;
    }
  }

  return result;
}
