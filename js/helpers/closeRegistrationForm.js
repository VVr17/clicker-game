/**
 * Closes registration form after submit
 */
export const closeRegistrationForm = () => {
  const registrationModalRef = document.querySelector('.js-registration-modal'); // registration modal ref

  registrationModalRef.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
};
