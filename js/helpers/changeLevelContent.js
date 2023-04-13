import GameController from '../classes/GameController.js';

export const enemyRef = document.querySelector('.js-enemy'); // level enemy reference

/**
 * Updates the enemy image displayed in the game according to the current game level.
 * If the game is finished adds button to start new game.
 *
 * @param {Object} options - An object containing the following properties:
 *   - level {number}: The level number the player has reached.
 *   - isFinished {boolean}: Flag to check if the game is finished.
 *   - isRestarted {boolean}: Flag to check if the game is restarted.
 */
export const changeLevelContent = ({
  level,
  isFinished = false,
  isRestarted = false,
}) => {
  const containerRef = document.querySelector('.js-container'); // main container ref

  // removes restart button to start new game
  if (isRestarted) {
    containerRef.firstElementChild.remove();
  }

  // removes enemy from previous level if its not first level
  if (level !== GameController.INITIAL_LEVEL) {
    enemyRef.firstElementChild.remove();
  }

  // adds button "Start new game" if game finished
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
