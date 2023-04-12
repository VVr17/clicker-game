import { initialLevel } from '../constants/gameConstants.js';
import { containerRef, enemyRef } from '../utils/refs.js';

/**
 * Updates the enemyRef image displayed in the game container according to the current game level.
 * If the game is finished add button to start new game
 * @param {number} level - The current game level.
 * @param {boolean} isFinished - Flag to check if the game is finished.
 * @param {boolean} isRestarted - Flag to check if the game wes restarted.
 */
export const changeLevelContent = ({
  level,
  isFinished = false,
  isRestarted = false,
}) => {
  // removes restart button to start new game
  if (isRestarted) {
    containerRef.firstElementChild.remove();
  }

  // removes enemy from previous level if its not first level
  if (level !== initialLevel) {
    enemyRef.firstElementChild.remove();
  }

  // if game finished adds button "Start new game"
  if (isFinished) {
    const restartBtn = `
      <button class="button js-restart-btn" type="button">
        Start new game
      </button>
    `;
    containerRef.insertAdjacentHTML('afterbegin', restartBtn);
    return;
  }

  // adds new level enemy
  const enemyImg = `<img class="game__img " src="./assets/images/orks/ork_${level}.png" width="320px" height="320px" alt="ork">`;
  enemyRef.insertAdjacentHTML('afterbegin', enemyImg);
};
