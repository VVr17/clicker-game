import Modal from '../classes/Modal.js';
import Timer from '../classes/Timer.js';
import { changeLevelTheme } from '../helpers/changeLevelTheme.js';
import {
  coinsInputRef,
  getCoinsBtnRef,
  levelInputRef,
  totalCoinsInputRef,
} from '../utils/refs.js';
import { messageRef } from '../utils/refs.js';
import { createMessageMarkup } from '../helpers/createMessageMarkup.js';
import { getTargetedCoinsPerLevel } from '../helpers/getTargetedCoinsPerLevel.js';

export const timer = new Timer();

// create message modal
const messageModal = new Modal({
  modal: '[data-modal]',
  closeModalBtn: '[data-modal-close]',
});
messageModal.addHandlers();

export default class GameCounter {
  #isGameStarted = false;
  #IsGamePaused = false;
  #IsGameFinished = false;
  #targetedCoinsPerLevel = 0;
  #coins = 0;
  #totalCoins = 0;
  #level = 1;

  constructor() {}

  // collect coins
  collectCoins() {
    // work only once to start game
    if (!this.#isGameStarted) {
      this.#startGame();
      this.#getTargetedCoinsPerNextLevel();
    }

    // if game is paused - unpause
    if (this.#IsGamePaused) {
      this.#unpauseGame();
    }

    this.#countCoinsPerLevel();
    this.#countTotalCoins();

    // go to the next level if reach a target number of coins
    if (this.#coins === this.#targetedCoinsPerLevel) {
      this.#updateLevel();
    }
  }

  // update level by reaching a target number of clicks
  #updateLevel() {
    // end the game by completing 5th level
    if (this.#level === 5) {
      this.#finishGame();
      return;
    }

    this.#pauseGame();
    this.#changeLevel();
    this.#dropOfCoinsPerLevel();
    this.#getTargetedCoinsPerNextLevel();
    this.#openResultsNotification();
    changeLevelTheme(this.#level);
  }

  // count coins per each level
  #countCoinsPerLevel() {
    this.#coins += 1;
    this.#updateCoinsPerLevel();
  }

  // drop off coins per level to start new level
  #dropOfCoinsPerLevel() {
    this.#coins = 0;
    this.#updateCoinsPerLevel();
  }

  // update displayed value
  #updateCoinsPerLevel() {
    coinsInputRef.value = this.#coins;
  }

  #changeLevel() {
    this.#level += 1;
    levelInputRef.value = this.#level;
  }

  // count total coins during the game
  #countTotalCoins() {
    this.#totalCoins += 1;
    totalCoinsInputRef.value = this.#totalCoins;
  }

  #startGame() {
    this.#isGameStarted = true;
    timer.startTimer();
  }

  #pauseGame() {
    this.#IsGamePaused = true;
    timer.pauseTimer();
  }

  #unpauseGame() {
    this.#IsGamePaused = false;
    timer.startTimer();
  }

  // disable collect button and stop timer
  #finishGame() {
    this.#IsGameFinished = true;
    this.#targetedCoinsPerLevel = 0;
    getCoinsBtnRef.setAttribute('disabled', true);
    timer.stopTimer();
    this.#openResultsNotification();
  }

  // open message with results
  #openResultsNotification() {
    messageRef.innerHTML = createMessageMarkup({
      level: this.#level,
      coins: this.#totalCoins,
      targetedCoinsPerLevel: this.#targetedCoinsPerLevel,
      isGameFinished: this.#IsGameFinished,
      timer: timer.timeDisplay,
    });

    messageModal.open();
  }

  #getTargetedCoinsPerNextLevel() {
    this.#targetedCoinsPerLevel = getTargetedCoinsPerLevel(this.#level);
  }
}
