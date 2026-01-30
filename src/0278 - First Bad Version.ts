/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

var solution = function (isBadVersion: (version: number) => boolean) {
  return function (n: number): number {
    let begin = 1;
    let end = n;

    while (begin < end) {
      const mid_point = begin + Math.floor((end - begin) / 2);

      if (isBadVersion(mid_point)) end = mid_point;
      else begin = mid_point + 1;
    }

    return begin;
  };
};
