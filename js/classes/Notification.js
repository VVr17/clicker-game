export default class Notification {
  #notificationRef = document.querySelector('.js-notification');

  constructor() {}

  /**
   * Shows a success message
   * @param {string} message the message to display
   */
  success(message) {
    this.#addMessage(message);
    this.#addNotificationStylesByType('success');
  }

  /**
   * Shows a error message
   * @param {string} message the message to display
   */
  error(message) {
    this.#addMessage(message);
    this.#addNotificationStylesByType('error');
  }

  /**
   * Shows a info message
   * @param {string} message the message to display
   */
  info(message) {
    this.#addMessage(message);
    this.#addNotificationStylesByType('info');
  }

  /**
   * Adds the message to the notification element
   * @param {string} message  the message to display
   */
  #addMessage(message) {
    this.#notificationRef.innerHTML = `${message}`;
  }

  /**
   * Adds the appropriate styles for the notification type
   * @param {string} type info | failure | success
   */
  #addNotificationStylesByType(type) {
    this.#notificationRef.classList.add('active', `${type}`);

    setTimeout(() => {
      this.#notificationRef.classList.remove('active', `${type}`);
    }, 2000);
  }
}
