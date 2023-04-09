import { getLevelTheme } from './helpers/getLevelTheme.js';
import { openGameMode } from './helpers/openGameMode.js';
import {
  containerRef,
  formRef,
  registrationModalRef,
  userEmailRef,
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

  const userData = {
    nickname: nickname.value,
    nickname: username.value,
    email: email.value,
  };

  //TODO: local storage - user data
  // store user data in Local Storage
  localStorage.setItem('user', JSON.stringify(userData));

  // display user nickname and email
  userNicknameRef.value = nickname.value;
  userEmailRef.value = email.value;

  // to add enemy on the first level
  containerRef.insertAdjacentHTML('afterbegin', getLevelTheme(1));

  openGameMode();

  // to close registration form after submit
  registrationModalRef.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
}
