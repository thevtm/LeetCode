export {}; // Necessary in order to avoid TS errors

function checkValidString(s: string): boolean {
  let parents = 0;
  let asterisk = 0;
  let asteriskOpen = 0;

  for (const c of s) {
    if (c === "(") {
      parents++;
    } else if (c === ")") {
      if (parents > 0) {
        parents--;
        asteriskOpen = Math.min(asteriskOpen, parents);
      } else if (asterisk > 0) {
        asterisk--;
        asteriskOpen = Math.min(asteriskOpen, asterisk);
      } else {
        return false;
      }
    } else if (c === "*") {
      asterisk++;

      if (asteriskOpen < parents) {
        asteriskOpen++;
      }
    }

    // console.log(parents, asterisk, asteriskOpen);
  }

  // console.log(parents, asterisk, asteriskOpen);

  if (parents > asteriskOpen) {
    return false;
  }

  return true;
}
