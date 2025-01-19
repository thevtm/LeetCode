export {};

function invert_casing(s: string): string {
  const LOWER_START_AT = 97;
  const OFFSET = 32;

  let new_str = new Array(s.length);

  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);

    if (c >= LOWER_START_AT) {
      // Lower Case
      new_str[i] = c - OFFSET;
    } else {
      new_str[i] = c + OFFSET;
    }
  }

  return String.fromCharCode(...new_str);
}

function largestWordCount(messages: string[], senders: string[]): string {
  const inverted_senders = senders;

  const count_words = (s) => _.reduce(s, (acc, c) => (c === " " ? acc + 1 : acc), 1);

  const word_counts: Record<string, number> = {};

  let top_word_count = -1;
  let top_sender = "";

  for (let i = 0; i < messages.length; i++) {
    const sender = inverted_senders[i];
    const message = messages[i];

    const word_count = (word_counts[sender] ?? 0) + count_words(message);
    word_counts[sender] = word_count;

    if (word_count > top_word_count || (word_count === top_word_count && inverted_senders[i] > top_sender)) {
      top_word_count = word_count;
      top_sender = inverted_senders[i];
    }
  }

  return top_sender;
}
