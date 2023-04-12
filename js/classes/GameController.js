import { messageRef } from '../utils/refs.js';
import { getMessageMarkup } from '../helpers/getMessageMarkup.js';
import { targetedCoinsByLevel } from '../constants/targetedCoinsByLevel.js';
import Timer from './Timer.js';
import { finalLevel, initialLevel } from '../constants/gameConstants.js';

const timer = new Timer();

export default class GameController {
  // game status
  isStarted = false;
  isPaused = false;
  isTargetNumberCoinsReached = false;
  isCompleted = false;
  isFinished = false;
  isRestarted = false;

  // game stats
  #levelStep = 1;
  #earnCoinsStep = 1;
  #finalLevel = finalLevel;
  #level = initialLevel;
  #targetedCoinsPerLevel = 0;
  #coins = 0;
  #totalCoins = 0;

  // game stats references
  #coinsInputRef;
  #totalCoinsInputRef;
  #levelInputRef;
  #restartBtnRef;

  constructor() {}

  /**
   * Adds congratulation message to the message element
   */
  #addCongratulationMessage() {
    messageRef.innerHTML = getMessageMarkup({
      level: this.#level,
      coins: this.#totalCoins,
      targetedCoinsPerLevel: this.#targetedCoinsPerLevel,
      isGameFinished: this.isFinished,
      timer: timer.time,
    });
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
  #getTargetedCoinsPerLevel() {
    this.#targetedCoinsPerLevel = targetedCoinsByLevel[this.#level];
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

  get level() {
    return this.#level;
  }

  /**
   * Starts the game by starting the timer.
   */
  start() {
    this.isStarted = true;
    this.#getTargetedCoinsPerLevel();
    this.#getGameStatsRefs();
    timer.startTimer();
  }

  /**
   * UCounts and updates the number of coins collected per level and the total coins collected
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
      this.#coins === this.#targetedCoinsPerLevel;

    if (this.#level === this.#finalLevel && this.isTargetNumberCoinsReached) {
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
    this.#getTargetedCoinsPerLevel();
    this.#addCongratulationMessage();
  }

  /**
   * Pauses the game by setting the isPaused property to true and pausing the timer.
   */
  pause() {
    this.isPaused = true;
    timer.pauseTimer();
  }

  /**
   * Unpauses the game by setting the isPaused property to false and starting the timer.
   */
  unpause() {
    this.isPaused = false;
    timer.startTimer();
  }

  /**
   * Finishes the game by stopping the timer.
   * Specifies the message to be displayed upon finishing the game.
   */
  finish() {
    this.isFinished = true;
    this.#dropOfCoinsPerLevel();
    this.#addCongratulationMessage();
    timer.stopTimer();
  }

  /**  Drop off all data to initial state to start new game */
  restart() {
    this.isStarted = false;
    this.isTargetNumberCoinsReached = false;
    this.isCompleted = false;
    this.isFinished = false;
    this.#totalCoins = 0;
    this.#level = initialLevel;
    this.#targetedCoinsPerLevel = 0;
    timer.reset();
    this.isRestarted = true;

    this.#updateTotalCoinsUI();
    this.#updateLevelUI();
  }

  /**
   * Gets restart button reference and adds an event listener to restart button - to start new game
   * @param {function} restartGameHandler - Callback function that need to be called on Restart button click
   */
  addRestartBtnHandler(restartGameHandler) {
    this.#restartBtnRef = document.querySelector('.js-restart-btn');
    this.#restartBtnRef.addEventListener('click', restartGameHandler);
  }

  /**
   * Removes restart button listener after click when the new game is about to start before remove button element
   * @param {function} restartGameHandler - Callback function that needs to be removed
   */
  removeRestartBtnHandler(restartGameHandler) {
    this.#restartBtnRef.removeEventListener('click', restartGameHandler);
  }
}
