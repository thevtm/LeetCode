export {};

function smallestNumber(pattern: string): string {
  const stack: number[] = [];
  const result: number[] = [];

  for (let i = 0; i <= pattern.length; i++) {
    stack.push(i + 1);

    if (pattern[i] === "I" || i === pattern.length) {
      while (stack.length > 0) result.push(stack.pop()!);
    }
  }

  return result.join("");
}
