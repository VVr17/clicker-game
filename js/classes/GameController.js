import Timer from './Timer.js';

export default class GameController {
  static INITIAL_LEVEL = 1;
  static #FINAL_LEVEL = 5;

  static #TARGETED_COINS_BY_LEVEL = {
    1: 15,
    2: 20,
    3: 25,
    4: 30,
    5: 35,
  };

  // game timer
  #timer = null;

  // game stats references
  #coinsInputRef = null;
  #levelInputRef = null;
  #restartBtnRef = null;
  #totalCoinsInputRef = null;

  // game stats
  #coins = 0;
  #earnCoinsStep = 1;
  #level = GameController.INITIAL_LEVEL;
  #levelStep = 1;
  #targetedCoinsForCurrentLevel = 0;
  #totalCoins = 0;

  // game status
  isStarted = false;
  isPaused = false;
  isTargetNumberCoinsReached = false;
  isCompleted = false;
  isFinished = false;
  isRestarted = false;

  /**
   *  Controls the game's flow and manage the game's state.
   *
   * Has the properties represent states of the game: whether the game has started, is paused, has been completed, or is finished.
   *
   * Manages game statistics: the level, the number of coins earned and the number of coins needed to complete each level.
   *
   * Methods for managing the game state, such as:
   *    - start(), which starts the game by starting the timer,
   *    - collectCoins(), which updates the number of coins collected per level and the total number of coins collected,
   *    - changeLevel(), which updates the game level,
   *    - pause() and unpause() the game,
   *    - finish() the game
   *    - restart() the game.
   *
   * Also has two methods for adding and removing a restart button listener, which allows the game to be restarted after it has finished.
   */
  constructor() {
    this.#timer = new Timer();
  }

  get level() {
    return this.#level;
  }

  /**
   * Gets statistic for completed level
   */
  get levelStats() {
    return {
      level: this.#level,
      coins: this.#totalCoins,
      targetedCoinsPerLevel: this.#targetedCoinsForCurrentLevel,
      isGameFinished: this.isFinished,
      timer: this.#timer.time,
    };
  }

  /**
   * Drop off coins for completed level to start new level
   */
  #dropOfCoinsPerLevel() {
    this.#coins = 0;
    this.#updateCoinsPerLevelUI();
  }

  /**
   * Get game stats references: coins, total coins, level
   */
  #getGameStatsRefs() {
    this.#coinsInputRef = document.querySelector('.js-coins');
    this.#totalCoinsInputRef = document.querySelector('.js-totalCoins');
    this.#levelInputRef = document.querySelector('.js-level');
  }

  /**
   * Get the targeted number of coins for a given game level.
   */
  #getTargetedCoinsForLevel() {
    this.#targetedCoinsForCurrentLevel =
      GameController.#TARGETED_COINS_BY_LEVEL[this.#level];
  }

  /**
   * Update coins stats element
   */
  #updateCoinsPerLevelUI() {
    this.#coinsInputRef.value = this.#coins;
  }

  /**
   * Update level stats element
   */
  #updateLevelUI() {
    this.#levelInputRef.value = this.#level;
  }

  /**
   * Update total coins stats element
   */
  #updateTotalCoinsUI() {
    this.#totalCoinsInputRef.value = this.#totalCoins;
  }

  /**
   * Starts the game by starting the timer.
   */
  start() {
    this.isStarted = true;
    this.#getTargetedCoinsForLevel();
    this.#getGameStatsRefs();
    this.#timer.startTimer();
  }

  /**
   * Updates the number of coins collected per level and the total coins collected
   */
  collectCoins() {
    this.#coins += this.#earnCoinsStep;
    this.#totalCoins += this.#earnCoinsStep;
    this.#updateCoinsPerLevelUI();
    this.#updateTotalCoinsUI();
  }

  /**
   * Updates the game status by checking if the targeted number of coins for the current level has been reached.
   */
  updateGameStatus() {
    this.isTargetNumberCoinsReached =
      this.#coins === this.#targetedCoinsForCurrentLevel;

    if (
      this.#level === GameController.#FINAL_LEVEL &&
      this.isTargetNumberCoinsReached
    ) {
      this.isCompleted = true;
    }
  }

  /**
   * Updates the level, drops all coins for the current level, retrieves the targeted coins for the next level.
   */
  changeLevel() {
    this.#level += this.#levelStep;
    this.#updateLevelUI();
    this.#dropOfCoinsPerLevel();
    this.#getTargetedCoinsForLevel();
  }

  /**
   * Pauses the game by pausing the timer.
   */
  pause() {
    this.isPaused = true;
    this.#timer.pauseTimer();
  }

  /**
   * Unpauses the game by starting the timer.
   */
  unpause() {
    this.isPaused = false;
    this.#timer.startTimer();
  }

  /**
   * Finishes the game by stopping the timer.
   * Specifies the message to be displayed upon finishing the game.
   */
  finish() {
    this.isFinished = true;
    this.#dropOfCoinsPerLevel();
    this.#timer.stopTimer();
  }

  /**  Drop off all Game controller data to initial state to start new game */
  restart() {
    this.isStarted = false;
    this.isTargetNumberCoinsReached = false;
    this.isCompleted = false;
    this.isFinished = false;
    this.#totalCoins = 0;
    this.#level = GameController.INITIAL_LEVEL;
    this.#targetedCoinsForCurrentLevel = 0;
    this.#timer.reset();
    this.isRestarted = true;

    this.#updateTotalCoinsUI();
    this.#updateLevelUI();
  }

  /**
   * Gets restart button reference and adds an event listener to Restart button to start new game
   * @param {function} restartGameHandler - Callback function that needs to be called on Restart button click
   */
  addRestartBtnHandler(restartGameHandler) {
    this.#restartBtnRef = document.querySelector('.js-restart-btn');
    this.#restartBtnRef.addEventListener('click', restartGameHandler);
  }

  /**
   * Removes restart button listener after click when the new game is about to start before removing button element
   * @param {function} restartGameHandler - Callback function to remove listener
   */
  removeRestartBtnHandler(restartGameHandler) {
    this.#restartBtnRef.removeEventListener('click', restartGameHandler);
  }
}
