import { convertMsIntoTimeFormat } from '../helpers/convertMsIntoTimeFormat.js';

export default class Timer {
  #timerInterval;
  #startTime;
  #elapsedTime = 0;
  #isPaused = false;
  #pausedTime = 0;

  constructor() {}

  // start the timer, using Interval, calling updateTimer every 1000ms
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

  pauseTimer() {
    clearInterval(this.#timerInterval); // stop the timer
    this.#pausedTime = this.#elapsedTime; // store the elapsed time when paused
    this.#isPaused = true; // set the flag to true, indicating the timer is paused
  }

  // stop Timer by clear Interval
  stopTimer() {
    clearInterval(this.#timerInterval);
  }

  // calculate the elapsed time
  updateTimer() {
    this.#elapsedTime = Date.now() - this.#startTime;
    this.displayTimer();
  }

  // display timer in format mm:ss
  displayTimer() {
    const timeInputRef = document.querySelector('.js-time');
    this.timeDisplay = convertMsIntoTimeFormat(this.#elapsedTime);
    timeInputRef.value = this.timeDisplay;
  }
}
