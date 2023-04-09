import { registrationModalRef } from '../utils/refs.js';

/**
 * Closes registration form after submit
 */
export const closeRegistrationForm = () => {
  registrationModalRef.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
};
