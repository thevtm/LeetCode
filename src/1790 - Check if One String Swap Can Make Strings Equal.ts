export {};

function areAlmostEqual(s1: string, s2: string): boolean {
  const len = s1.length;

  let first_diff_index = 0;
  while (first_diff_index < len && s1[first_diff_index] === s2[first_diff_index]) first_diff_index++;

  const are_strs_equal = first_diff_index === len;
  if (are_strs_equal) return true;

  let second_diff_index = first_diff_index + 1;
  while (second_diff_index < len && s1[second_diff_index] === s2[second_diff_index]) second_diff_index++;

  const no_swap_index_found = second_diff_index === len;
  if (no_swap_index_found) return false;

  const is_swap_index_a_match =
    s1[second_diff_index] !== s2[first_diff_index] || s1[first_diff_index] !== s2[second_diff_index];
  if (is_swap_index_a_match) return false;

  let third_diff_index = second_diff_index + 1;
  while (third_diff_index < len && s1[third_diff_index] === s2[third_diff_index]) third_diff_index++;

  const has_a_third_difference = third_diff_index !== len;
  if (has_a_third_difference) return false;

  return true;
}
