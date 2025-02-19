export {};

function getHappyString(length: number, index: number): string {
  // This is basically the variable radix problem where the radix is [3, 2, 2, 2...]
  index--;

  let happy_string = "";

  const char_index = Math.floor(index / 2 ** (length - 1));
  index = index % 2 ** (length - 1);

  if (char_index >= 3) return "";

  happy_string += ["a", "b", "c"][char_index];

  const happy_map = { a: ["b", "c"], b: ["a", "c"], c: ["a", "b"] };

  for (let i = length - 2; i >= 0; i--) {
    const char_index = Math.floor(index / 2 ** i);
    index = index % 2 ** i;
    const previous_character = happy_string[happy_string.length - 1];
    happy_string += happy_map[previous_character][Math.floor(char_index)];
  }

  return happy_string;
}
