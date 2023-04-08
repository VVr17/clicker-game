import { openGameMode } from './helpers/openGameMode.js';
import {
  formRef,
  registrationModalRef,
  userNicknameRef,
} from './utils/refs.js';

formRef.addEventListener('submit', onFormSubmit);

// form submit handler to sign up user
function onFormSubmit(event) {
  event.preventDefault();
  const { nickname, username, email } = event.currentTarget.elements;

  // if form fields are empty show alert message
  const isOneOfFieldsEmpty = !nickname.value.trim() || !username.value.trim();

  if (isOneOfFieldsEmpty) {
    alert('Please, enter valid name: fields cannot be empty');
    return;
  }

  console.log(
    'nickname, username, email',
    nickname.value,
    username.value,
    email.value
  );

  // display user nickname
  userNicknameRef.value = nickname.value;

  openGameMode();

  // to close registration form after submit
  registrationModalRef.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
}
