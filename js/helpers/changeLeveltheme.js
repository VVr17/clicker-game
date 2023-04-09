import { containerRef } from '../utils/refs.js';
import { getLevelTheme } from './getLevelTheme.js';

/**
 * changeLevelTheme function updates the enemy image displayed in the game container according to the current game level.
 *
 * @param {number} level - The current game level.
 */
export const changeLevelTheme = level => {
  containerRef.firstElementChild.remove(); // remove previous enemy
  containerRef.insertAdjacentHTML('afterbegin', getLevelTheme(level)); // add new level enemy
};
