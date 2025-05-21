export {}; // Necessary in order to avoid TS errors

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  let available_slots = 0;

  for (let i = 0; i < flowerbed.length; i++) {
    const is_left_flower = flowerbed[i - 1] === 1;
    const is_right_flower = flowerbed[i + 1] === 1;
    const is_current_flower = flowerbed[i] === 1;
    const is_available_slot =
      !is_left_flower && !is_right_flower && !is_current_flower;

    if (is_available_slot) {
      flowerbed[i] = 1;
      available_slots++;
    }
  }

  return available_slots >= n;
}
