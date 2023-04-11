import { enemyRef } from '../utils/refs.js';

/**
 * changeLevelTheme function updates the enemyRef image displayed in the game container according to the current game level.
 * @param {number} level - The current game level.
 * @param {boolean} isFinished - Flag to check if the game is finished.
 */
export const changeLevelTheme = (level, isFinished) => {
  const initialLevel = 1;

  if (isFinished) {
    enemyRef.firstElementChild.remove(); // remove enemy
    return;
  }

  if (level > initialLevel) {
    enemyRef.firstElementChild.remove(); // enemy from previous level
  }

  const levelImage = `<img class="game__img " src="./assets/images/orks/ork_${level}.png" width="320px" height="320px" alt="ork">`;

  enemyRef.insertAdjacentHTML('afterbegin', levelImage); // add new level enemy
};
