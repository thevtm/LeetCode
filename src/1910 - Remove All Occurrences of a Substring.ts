export {};

function removeOccurrences(s: string, part: string): string {
  const stack: string[] = [];

  for (const c of s) {
    stack.push(c);

    let i = 0;
    while (stack[stack.length - i - 1] === part[part.length - i - 1] && stack.length >= part.length && i < part.length)
      i++;

    if (i === part.length) for (let j = 0; j < part.length; j++) stack.pop();
  }

  return stack.join("");
}
