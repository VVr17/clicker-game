export default class Modal {
  constructor(selectors) {
    this.refs = this.getRefs(selectors);
  }

  getRefs(selectors) {
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

  addHandlers() {
    this.refs.openModalBtn?.addEventListener('click', event =>
      this.open(event)
    );
    this.refs.closeModalBtn?.addEventListener('click', () => this.close());
    this.refs.modal?.addEventListener('click', event =>
      this.onBackdropClick(event)
    );
  }

  open(event) {
    event?.preventDefault();
    this.refs.modal.classList.remove('is-hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', this.onEscKeyDown);
  }

  close = () => {
    this.refs.modal.classList.add('is-hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.onEscKeyDown);
  };

  onBackdropClick(event) {
    if (event.target.closest('.js-modal')) {
      return;
    }
    this.close();
  }

  onEscKeyDown = event => {
    if (event.code !== 'Escape') {
      return;
    }
    this.close();
  };
}
