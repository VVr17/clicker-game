export default class Notification {
  static #TOAST_TIMEOUT_MS = 2000;

  static #Types = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
  };

  #notificationRef = document.querySelector('.js-notification');

  /**
   * Handles the displaying of toast notifications.
   *
   * It has "success", "info", "errors" types.
   */

  /**
   * Handles the displaying of toast notifications.
   *
   * It has "success", "info", "errors" types.
   */
  constructor() {}

  /**
   * Adds the message to the notification element
   * @param {string} message  the message to display
   */
  #addMessage(message) {
    this.#notificationRef.innerHTML = `${message}`;
  }

  /**
   * Adds the appropriate styles for the notification type
   * Automatically hides a toast notification after it is displayed
   * @param {string} type info | error | success
   */
  #addNotificationStylesByType(type) {
    this.#notificationRef.classList.add('active', `${type}`);

    setTimeout(() => {
      this.#notificationRef.classList.remove('active', `${type}`);
    }, Notification.#TOAST_TIMEOUT_MS);
  }

  /**
   * Shows a info message
   * @param {string} message the message to display
   */
  info(message) {
    this.#addMessage(message);
    this.#addNotificationStylesByType(Notification.#Types.INFO);
  }

  /**
   * Shows a error message
   * @param {string} message the message to display
   */
  error(message) {
    this.#addMessage(message);
    this.#addNotificationStylesByType(Notification.#Types.ERROR);
  }

  /**
   * Shows a success message
   * @param {string} message the message to display
   */
  success(message) {
    this.#addMessage(message);
    this.#addNotificationStylesByType(Notification.#Types.SUCCESS);
  }
}
