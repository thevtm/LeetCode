export {}; // Necessary in order to avoid TS errors

function numSteps(s: string): number {
  const str = s.split("");

  let steps = 0;
  let endIndex = str.length - 1;

  while (endIndex >= 1) {
    console.log(`>`, `s=${str.slice(0, endIndex + 1).join("")}`, `steps=${steps}`, `endIndex=${endIndex}`);

    if (str[endIndex] === "1") {
      steps++;
      str[endIndex] = "0";

      let i = endIndex - 1;

      while (str[i] === "1") {
        str[i] = "0";
        i--;
        console.log(`>>`, `+`, `s=${str.slice(0, endIndex + 1).join("")}`, `i=${i}`);
      }

      if (i === -1) {
        str.unshift("1");
        endIndex++;
      } else {
        str[i] = "1";
      }

      console.log(
        `>`,
        `+`,
        `s=${str.slice(0, endIndex + 1).join("")}`,
        `i=${i}`,
        `steps=${steps}`,
        `endIndex=${endIndex}`
      );
    } else {
      steps++;
      endIndex--;
      console.log(`>`, `/`, `s=${str.slice(0, endIndex + 1).join("")}`, `steps=${steps}`, `endIndex=${endIndex}`);
    }
  }

  console.log(`s=${str.slice(0, endIndex + 1).join("")}`, `steps=${steps}`, `endIndex=${endIndex}`);

  return steps;
}
