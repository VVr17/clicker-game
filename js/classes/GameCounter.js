import Modal from '../classes/Modal.js';
import Timer from '../classes/Timer.js';
import { coinsInputRef, getCoinsBtnRef, levelInputRef } from '../utils/refs.js';

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
  #coins = 0;
  #level = 1;

  constructor() {}

  // collect coins
  collectCoins() {
    // work only once to start game
    if (!this.#isGameStarted) {
      this.#startGame();
    }

    // if game is paused - unpause
    if (this.#IsGamePaused) {
      this.#unpauseGame();
    }

    this.#coins += 1;
    coinsInputRef.value = this.#coins;

    // go to the next level by reaching a target number of coins
    if (this.#coins % 5 === 0) {
      this.#updateLevel();
    }

    // end the game by reaching 5th level
    if (this.#level === 5) {
      this.#finishGame();
    }
  }

  // update level by reaching a target number of clicks
  #updateLevel() {
    this.#level += 1;
    levelInputRef.value = this.#level;
    messageModal.open();
    this.#pauseGame();
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

  // disable collect btn and stop timer
  #finishGame() {
    getCoinsBtnRef.setAttribute('disabled', true);
    timer.stopTimer();
  }
}
