export {}; // Necessary in order to avoid TS errors

function equalSubstring(s: string, t: string, maxCost: number): number {
  const costs: number[] = Array.from({ length: s.length }).map((_, i) => Math.abs(s.charCodeAt(i) - t.charCodeAt(i)));

  console.log(`costs=[${costs.join(" ")}]`);

  let left = 0;
  let right = 0;

  let cost = costs[0];

  let result = 0;

  while (left < s.length && right < s.length) {
    console.log(`>`, `[${left}, ${right}]`, `cost=${cost}`, `result=${result}`);

    if (cost <= maxCost) {
      console.log(`>`, `right++`);
      result = Math.max(result, right - left + 1);
      right++;
      cost += costs[right];
    } else {
      console.log(`>`, `left++`);
      cost -= costs[left];
      left++;
    }
  }

  return result;
}
