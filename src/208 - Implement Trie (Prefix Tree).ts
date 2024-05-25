export {}; // Necessary in order to avoid TS errors

type TrieNode = Map<string, TrieNode>;
const makeTrieNode = () => new Map();

class Trie {
  readonly WORD_END_CHAR = ".";

  root: TrieNode = makeTrieNode();

  constructor() {}

  insert(word: string): void {
    let node = this.root;

    for (const l of word) {
      let nextNode = node.get(l);

      if (nextNode === undefined) {
        nextNode = makeTrieNode();
        node.set(l, nextNode);
      }

      node = nextNode;
    }

    // We wont traverse pass this point so we can use the root as a placeholder
    node.set(this.WORD_END_CHAR, this.root);
  }

  search(word: string): boolean {
    return this.startsWith(`${word}${this.WORD_END_CHAR}`);
  }

  startsWith(prefix: string): boolean {
    let node = this.root;

    for (const l of prefix) {
      let nextNode = node.get(l);

      if (nextNode === undefined) {
        return false;
      }

      node = nextNode;
    }

    return true;
  }
}
