import { enemyRef } from '../utils/refs.js';

/**
 * changeLevelTheme function updates the enemyRef image displayed in the game container according to the current game level.
 * @param {number} level - The current game level.
 */
export const changeLevelTheme = level => {
  if (level > 1) {
    enemyRef.firstElementChild.remove(); // enemy from previous level
  }

  const levelImage = `<img class="game__img " src="./assets/images/orks/ork_${level}.png" width="320px" height="320px" alt="ork">`;

  enemyRef.insertAdjacentHTML('afterbegin', levelImage); // add new level enemy
};
