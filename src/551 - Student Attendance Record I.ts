export {}; // Necessary in order to avoid TS errors

function checkRecord(s: string): boolean {
  let absentTotal = 0;
  let consecutiveLate = 0;

  for (const l of s) {
    if (l === "A") {
      if (absentTotal === 1) {
        return false;
      }

      absentTotal++;
      consecutiveLate = 0;
    } else if (l === "L") {
      if (consecutiveLate === 2) {
        return false;
      }

      consecutiveLate++;
    } else {
      consecutiveLate = 0;
    }
  }

  return true;
}
