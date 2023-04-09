import { changeLevelTheme } from '../helpers/changeLeveltheme.js';
import { getCoinsBtnRef } from '../utils/refs.js';
import { getMessageMarkup } from '../helpers/getMessageMarkup.js';
import { getTargetedCoinsPerLevel } from '../helpers/getTargetedCoinsPerLevel.js';
import { messageRef } from '../utils/refs.js';
import Modal from '../classes/Modal.js';
import Timer from '../classes/Timer.js';

const timer = new Timer();

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

  #coinsInputRef;
  #totalCoinsInputRef;
  #levelInputRef;

  constructor() {}

  // collect coins
  collectCoins() {
    // work only once to start game
    if (!this.#isGameStarted) {
      this.#startGame();
      this.#getTargetedCoinsPerNextLevel();
      this.#getGameStatsRefs();
    }

    // unpause game, if it is paused
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

  #getGameStatsRefs() {
    this.#coinsInputRef = document.querySelector('.js-coins');
    this.#totalCoinsInputRef = document.querySelector('.js-totalCoins');
    this.#levelInputRef = document.querySelector('.js-level');
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
    this.#coinsInputRef.value = this.#coins;
  }

  #changeLevel() {
    this.#level += 1;
    this.#levelInputRef.value = this.#level;
  }

  // count total coins during the game
  #countTotalCoins() {
    this.#totalCoins += 1;
    this.#totalCoinsInputRef.value = this.#totalCoins;
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
    messageRef.innerHTML = getMessageMarkup({
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
