export default class Modal {
  #refs;

  /**
   * @param {object} selectors - An object containing the following properties:
   *   - openModalBtn {string}: selector for button to open Modal
   *   - closeModalBtn {string}: selector for button to close Modal
   *   - modal {string}: selector for modal backdrop
   */
  constructor(selectors) {
    this.#refs = this.#getRefs(selectors);
  }

  /**
   *
   * Retrieves the DOM elements based on the given selectors and stores them in the refs property of the class.
   * @param {object} selectors - An object containing the following properties:
   *   - openModalBtn {string}: selector for button to open Modal
   *   - closeModalBtn {string}: selector for button to close Modal
   *   - modal {string}: selector for modal backdrop
   * @returns {object}  refs property of the class with corresponding references
   */
  #getRefs(selectors) {
    const { openModalBtn, closeModalBtn, modal } = selectors;
    const refs = {};

    refs.modal = document.querySelector(modal);
    if (openModalBtn) {
      refs.openModalBtn = document.querySelector(openModalBtn);
    }
    if (closeModalBtn) {
      refs.closeModalBtn = document.querySelector(closeModalBtn);
    }
    return refs;
  }

  /**
   * An event listener that checks if the Esc key was pressed to close the modal.
   */
  #onEscKeyDown = event => {
    if (event.code !== 'Escape') {
      return;
    }
    this.close();
  };

  /**
   * Adds the event handlers for opening and closing the modal.
   */
  addHandlers() {
    this.#refs.openModalBtn?.addEventListener('click', event =>
      this.open(event)
    );
    this.#refs.closeModalBtn?.addEventListener('click', () => this.close());
  }

  /**
   * Opens the modal.
   * Adds the event listener for the keydown event to detect the Esc key being pressed to close the modal.
   */
  open(event) {
    event?.preventDefault();
    this.#refs.modal.classList.remove('is-hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  /**
   * Closes the modal.
   * Removes the event listener for the keydown event.
   */
  close = () => {
    this.#refs.modal.classList.add('is-hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
