export {};

function queryResults(limit: number, queries: number[][]): number[] {
  const balls = new Array<number>(limit + 1);
  const color_counts: Record<number, number> = {};
  const result = new Array<number>(queries.length);
  let distinct_colors = 0;

  for (let i = 0; i < queries.length; i++) {
    const [bid, new_color] = queries[i];

    const curr_ball_color = balls[bid];

    if (curr_ball_color === new_color) {
      result[i] = distinct_colors;
      continue;
    }

    balls[bid] = new_color;

    if (curr_ball_color !== undefined) {
      color_counts[curr_ball_color]--;

      if (color_counts[curr_ball_color] === 0) {
        distinct_colors--;
      }
    }

    if (color_counts[new_color] === undefined || color_counts[new_color] === 0) {
      color_counts[new_color] = 1;
      distinct_colors++;
    } else {
      color_counts[new_color]++;
    }

    result[i] = distinct_colors;
  }

  return result;
}
