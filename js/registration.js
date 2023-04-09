import { addUserDataMarkup } from './helpers/addUserDataMarkup.js';
import { changeLevelTheme } from './helpers/changeLeveltheme.js';
import { closeRegistrationForm } from './helpers/closeRegistrationForm.js';
import { formRef } from './utils/refs.js';
import { openGameMode } from './helpers/openGameMode.js';
import { updateUserDataValues } from './helpers/updateUserDataValues.js';

formRef.addEventListener('submit', onFormSubmit);

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

  localStorage.setItem('user', JSON.stringify(userData));
  addUserDataMarkup();
  updateUserDataValues(nickname.value, email.value);
  changeLevelTheme(1);
  closeRegistrationForm();
  openGameMode();
}
