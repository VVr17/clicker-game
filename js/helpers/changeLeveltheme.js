import { containerRef } from '../utils/refs.js';

/**
 * changeLevelTheme function updates the enemy image displayed in the game container according to the current game level.
 *
 * @param {number} level - The current game level.
 */
export const changeLevelTheme = level => {
  if (level > 1) {
    containerRef.firstElementChild.remove(); // remove enemy from previous level
  }

  const levelImage = `<img class="game__img" src="./assets/images/orks/ork_${level}.png" width="320px" height="320px" alt="ork">`;

  containerRef.insertAdjacentHTML('afterbegin', levelImage); // add new level enemy
};
