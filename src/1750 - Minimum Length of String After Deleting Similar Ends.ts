export {}; // Necessary in order to avoid TS errors

function minimumLength(s: string): number {
  let left = 0;
  let right = s.length - 1;
  let letter = s[left];

  while (left < right) {
    if (s[left] !== letter || s[right] !== letter) {
      break;
    }

    while (s[left] === s[left + 1]) {
      left++;
    }

    while (s[right] === s[right - 1]) {
      right--;
    }

    left++;
    right--;
    letter = s[left];
  }

  // console.log(left, right, right - left + 1);

  return Math.max(0, right - left + 1);
}
