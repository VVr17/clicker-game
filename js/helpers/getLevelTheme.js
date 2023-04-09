/**
 * getLevelTheme function generates HTML markup for displaying an enemy image based on the level.
 *
 * @param {number} level - The level number.
 * @returns {string} - The generated HTML markup for the enemy image.
 */
export const getLevelTheme = level => {
  return `
  <img class="game__img" src="./assets/images/orks/ork_${level}.png" width="320px" height="320px" alt="ork"> `;
};
