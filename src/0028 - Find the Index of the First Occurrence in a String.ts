export {}; // Necessary in order to avoid TS errors

function strStr(haystack: string, needle: string): number {
  let r = -1;

  for (let i = 0; i < haystack.length - needle.length + 1; i++) {
    let found = true;

    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        found = false;
        break;
      }
    }

    if (found) {
      r = i;
      break;
    }
  }

  return r;
}
