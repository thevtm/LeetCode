export {};

function goodDaysToRobBank(security: number[], time: number): number[] {
  const decreasing_days = new Array<number>(security.length);
  decreasing_days[0] = 1;

  for (let i = 1; i < security.length; i++) {
    const curr = security[i];
    const prev = security[i - 1];

    if (curr <= prev) {
      decreasing_days[i] = decreasing_days[i - 1] + 1;
    } else {
      decreasing_days[i] = 1;
    }
  }

  const increasing_days = new Array<number>(security.length);
  increasing_days[security.length - 1] = 1;

  for (let i = security.length - 2; i >= 0; i--) {
    const curr = security[i];
    const next = security[i + 1];

    if (curr <= next) {
      increasing_days[i] = increasing_days[i + 1] + 1;
    } else {
      increasing_days[i] = 1;
    }
  }

  const answer: number[] = [];

  for (let i = time; i < security.length - time; i++) {
    if (decreasing_days[i] > time && increasing_days[i] > time) {
      answer.push(i);
    }
  }

  return answer;
}
