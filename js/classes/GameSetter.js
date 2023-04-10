import { getCoinsBtnRef, messageRef } from '../utils/refs.js';
import { getMessageMarkup } from '../helpers/getMessageMarkup.js';
import { getTargetedCoinsPerLevel } from '../helpers/getTargetedCoinsPerLevel.js';
import Timer from './Timer.js';

const timer = new Timer();

export default class GameSetter {
  // game status
  isStarted = false;
  isPaused = false;
  isTargetNumberCoinsReached = false;
  isFinished = false;

  // game stats
  #targetedCoinsPerLevel = 0;
  #finalLevel = 5;
  #coins = 0;
  #totalCoins = 0;
  #level = 1;

  // game stats references
  #coinsInputRef;
  #totalCoinsInputRef;
  #levelInputRef;

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
      timer: timer.timeDisplay,
    });
  }

  /**
   * Change level counter and updates level stats element
   */
  #changeLevel() {
    this.#level += 1;
    this.#levelInputRef.value = this.#level;
  }

  /**
   * Count coins for current level
   */
  #countCoinsPerLevel() {
    this.#coins += 1;
    this.#updateCoinsPerLevel();
  }

  /**
   * Count total coins earned during the game
   */
  #countTotalCoins() {
    this.#totalCoins += 1;
    this.#totalCoinsInputRef.value = this.#totalCoins;
  }

  /**
   * Drop off coins for completed level to start new level
   */
  #dropOfCoinsPerLevel() {
    this.#coins = 0;
    this.#updateCoinsPerLevel();
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
   * Get targeted coins for the next Level
   */
  #getTargetedCoinsPerNextLevel() {
    this.#targetedCoinsPerLevel = getTargetedCoinsPerLevel(this.#level);
  }

  /**
   * Update coins stats element
   */
  #updateCoinsPerLevel() {
    this.#coinsInputRef.value = this.#coins;
  }

  get level() {
    return this.#level;
  }

  /**
   * Updates the number of coins collected per level and the total coins collected
   */
  collectCoins() {
    this.#countCoinsPerLevel();
    this.#countTotalCoins();
  }

  /**
   * Finishes the game by resetting the targeted coins per level, disabling the coin button, stopping the timer.
   * Specifies the message to be displayed upon finishing the game.
   */
  finish() {
    this.#targetedCoinsPerLevel = 0;
    this.#dropOfCoinsPerLevel();
    getCoinsBtnRef.setAttribute('disabled', true);
    timer.stopTimer();
    this.#addCongratulationMessage();
  }

  /**
   * Starts the game by starting the timer.
   */
  start() {
    this.isStarted = true;
    this.#getTargetedCoinsPerNextLevel();
    this.#getGameStatsRefs();
    timer.startTimer();
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
   * Updates the game status by checking if the targeted number of coins for the current level has been reached.
   */
  updateGameStatus() {
    this.isTargetNumberCoinsReached =
      this.#coins === this.#targetedCoinsPerLevel;

    if (this.#level === this.#finalLevel && this.isTargetNumberCoinsReached) {
      this.isFinished = true;
    }
  }

  /**
   * Updates the level by changing the level, dropping all coins for the current level, retrieving the targeted coins for the next level.
   */
  updateLevel() {
    this.#changeLevel();
    this.#dropOfCoinsPerLevel();
    this.#getTargetedCoinsPerNextLevel();
    this.#addCongratulationMessage();
  }
}
