import { convertMsIntoTimeFormat } from '../helpers/convertMsIntoTimeFormat.js';

export default class Timer {
  #timerInterval;
  #startTime;
  #elapsedTime = 0;
  #pausedTime = 0;
  #isPaused = false;

  constructor() {}

  /**
   * Starts the timer, using Interval, calling updateTimer every 1000ms
   */
  startTimer() {
    if (this.#isPaused) {
      // if the timer is resumed from pause
      this.#startTime = Date.now() - this.#pausedTime;
      this.#isPaused = false;
    } else {
      // if the timer is started from scratch
      this.#startTime = Date.now();
    }

    this.#timerInterval = setInterval(() => this.updateTimer(), 500);
  }

  /**
   * Pauses the timer by stopping the timerInterval, storing the elapsed time when paused.
   */
  pauseTimer() {
    clearInterval(this.#timerInterval);
    this.#pausedTime = this.#elapsedTime;
    this.#isPaused = true;
  }

  /**
   * Stops Timer by clearing Interval
   */
  stopTimer() {
    clearInterval(this.#timerInterval);
  }

  /**
   * Calculates the elapsed time
   */
  updateTimer() {
    this.#elapsedTime = Date.now() - this.#startTime;
    this.displayTimer();
  }

  /**
   * Displays timer in format mm:ss
   */
  displayTimer() {
    const timeInputRef = document.querySelector('.js-time');
    this.timeDisplay = convertMsIntoTimeFormat(this.#elapsedTime);
    timeInputRef.value = this.timeDisplay;
  }
}
