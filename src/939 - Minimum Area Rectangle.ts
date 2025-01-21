export {};

function minAreaRect(points: number[][]): number {
  const KEY_OFFSET = 10 ** 5;
  const point_to_key = (x: number, y: number): number => y * KEY_OFFSET + x;

  let min_area = Infinity;

  const set = new Set<number>();

  for (const point of points) {
    const [x, y] = point;
    set.add(point_to_key(x, y));
  }

  for (let i = 0; i < points.length; i++) {
    const [ax, ay] = points[i];

    for (let j = i + 1; j < points.length; j++) {
      const [bx, by] = points[j];

      const has_width = ax !== bx;
      const has_height = ay !== by;

      if (!has_width || !has_height) {
        continue;
      }

      const has_ab_corner = set.has(point_to_key(ax, by));
      const has_ba_corner = set.has(point_to_key(bx, ay));

      if (has_ab_corner && has_ba_corner) {
        const area = Math.abs(ax - bx) * Math.abs(ay - by);
        min_area = Math.min(min_area, area);
      }
    }
  }

  if (min_area === Infinity) {
    return 0;
  }

  return min_area;
}
