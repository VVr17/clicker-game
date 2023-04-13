export default class Timer {
  static #TIMER_INTERVAL_MS = 500;

  #elapsedTime = 0;
  #isPaused = false;
  #startTime = null;
  #pausedTime = 0;
  #time = null;
  #timeInputRef = null;
  #timerInterval = null;

  /**
   * Represents a timer that counts elapsed time in mm:ss format.
   */
  constructor() {}

  /**
   * Returns the current time in mm:ss format.
   */
  get time() {
    return this.#time;
  }

  /**
   * Converts a time duration in milliseconds to the mm:ss format.
   */
  #convertMsIntoTimeFormat() {
    let seconds = Math.floor(this.#elapsedTime / 1000); // calculate the number of seconds
    const minutes = Math.floor(seconds / 60); // calculate the number of minutes
    seconds %= 60; // reduce seconds to less than 60 if necessary

    this.#time = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  /**
   * Displays the current time in the HTML input element that represents the timer.
   */
  #displayTimer() {
    this.#convertMsIntoTimeFormat();
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
   * Starts the timer, calling updateTimer function every specified time interval
   */
  startTimer() {
    if (!this.#timeInputRef) {
      this.#timeInputRef = document.querySelector('.js-time');
    }

    this.#setStartTime();

    this.#timerInterval = setInterval(
      () => this.#updateTimer(),
      Timer.#TIMER_INTERVAL_MS
    );
  }

  /**
   * Pauses the timer, storing the elapsed time when paused.
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
