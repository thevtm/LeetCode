export {}; // Necessary in order to avoid TS errors

function readBinaryWatch(turnedOn: number): string[] {
  const HOURS = [1, 2, 4, 8];
  const MINUTES = [1, 2, 4, 8, 16, 32];

  if (turnedOn >= 9) {
    return [];
  }

  const backtrack = (n: number, hours: number = 0, minutes: number = 0): string[] => {
    if (n === 0) {
      return [`${hours}:${_.padStart(minutes, 2, "0")}`];
    }

    const result: string[][] = [];

    for (const m of MINUTES) {
      if (minutes + m < 60 && (minutes & m) === 0) {
        result.push(backtrack(n - 1, hours, minutes + m));
      }
    }

    for (const h of HOURS) {
      if (hours + h < 12 && (hours & h) === 0) {
        result.push(backtrack(n - 1, hours + h, minutes));
      }
    }

    return _.flatten(result);
  };

  return _.uniq(backtrack(turnedOn));
}
