export {}; // Necessary in order to avoid TS errors

function maxScoreWords(words: string[], letters: string[], score: number[]): number {
  const CHAR_CODE_OFFSET = -"a".charCodeAt(0);

  const letter_count_map = new Map<string, number>();
  const letter_score_map = new Map<string, number>();

  for (const l of letters) {
    letter_count_map.set(l, (letter_count_map.get(l) ?? 0) + 1);
    letter_score_map.set(l, score[l.charCodeAt(0) + CHAR_CODE_OFFSET]);
  }

  // console.log("count", letter_count_map);
  // console.log("score", letter_score_map);

  let acc: number = 0;
  let result: number = 0;

  const backtrack = (word_index: number = 0): void => {
    for (let i = word_index; i < words.length; i++) {
      const word = words[i];

      let letter_index = 0;

      while (letter_index < word.length) {
        const letter = word[letter_index];
        const letter_count = letter_count_map.get(letter);

        if (letter_count === undefined || letter_count === 0) {
          letter_index--;
          break;
        }

        letter_count_map.set(letter, letter_count - 1);

        acc += letter_score_map.get(letter)!;

        letter_index++;
      }

      if (letter_index === word.length) {
        result = Math.max(result, acc);
        // console.log(">", word, acc, letter_count_map);
        backtrack(i + 1);
        letter_index--;
      }

      while (letter_index >= 0) {
        const letter = word[letter_index];
        const letter_count = letter_count_map.get(letter)!;

        letter_count_map.set(letter, letter_count + 1);

        acc -= letter_score_map.get(letter)!;

        letter_index--;
      }
    }
  };

  backtrack();

  return result;
}
