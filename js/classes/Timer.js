import { TIMER_INTERVAL_MS } from '../constants/timeoutConstants.js';
import { convertMsIntoTimeFormat } from '../helpers/convertMsIntoTimeFormat.js';

export default class Timer {
  #timerInterval;
  #timeInputRef;

  #startTime;
  #elapsedTime = 0;
  #pausedTime = 0;
  #isPaused = false;
  #time;

  constructor() {}

  get time() {
    return this.#time;
  }

  /**
   * Displays timer in format mm:ss
   */
  #displayTimer() {
    // const timeInputRef = document.querySelector('.js-time');
    this.#time = convertMsIntoTimeFormat(this.#elapsedTime);
    this.#timeInputRef.value = this.#time;
  }

  /**
   * Set start time:
   *  - If the timer is started from scratch (i.e., it has not been paused before), the current time is set as the start time.
   *  - If the timer is resumed from a paused state, calculates the start time by subtracting the time that has elapsed during the pause from the current time.
   */
  #setStartTime() {
    if (this.#isPaused) {
      this.#startTime = Date.now() - this.#pausedTime;
      this.#isPaused = false;
      return;
    }

    this.#startTime = Date.now();
  }

  /**
   * Calculates the elapsed time
   */
  #updateTimer() {
    this.#elapsedTime = Date.now() - this.#startTime;
    this.#displayTimer();
  }

  /**
   * Starts the timer, using Interval, calling u#pdateTimer every 1000ms
   */
  startTimer() {
    if (!this.#timeInputRef) {
      this.#timeInputRef = document.querySelector('.js-time');
    }

    this.#setStartTime();

    this.#timerInterval = setInterval(
      () => this.#updateTimer(),
      TIMER_INTERVAL_MS
    );
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
   * Drops off timer to initial state to start new game
   */
  reset() {
    this.#elapsedTime = 0;
    this.#pausedTime = 0;
    this.#displayTimer();
  }
}
