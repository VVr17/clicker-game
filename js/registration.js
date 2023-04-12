import { addUserDataMarkup } from './helpers/addUserDataMarkup.js';
import { changeLevelContent } from './helpers/changeLevelContent.js';
import { closeRegistrationForm } from './helpers/closeRegistrationForm.js';
import { formRef } from './utils/refs.js';
import { initialLevel } from './constants/gameConstants.js';
import Notification from './classes/Notification.js';
import { openGameMode } from './helpers/openGameMode.js';
import { toastMessages } from './constants/toastMessages.js';
import { updateUserDataValues } from './helpers/updateUserDataValues.js';

const notification = new Notification();

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { nickname, name, email } = event.currentTarget.elements;
  const userNickname = nickname.value.trim();
  const userName = name.value.trim();
  const userEmail = email.value.trim();

  // if form fields are empty show alert message
  const isOneOfFieldsEmpty = !userNickname || !userName;

  if (isOneOfFieldsEmpty) {
    alert('Please, enter valid name: fields cannot be empty');
    return;
  }

  const userData = {
    nickname: userNickname,
    name: userName,
    email: userEmail,
  };

  console.log('user data', userData);
  notification.success(toastMessages.registered);

  addUserDataMarkup();
  updateUserDataValues(userNickname, userEmail);
  changeLevelContent({ level: initialLevel });
  closeRegistrationForm();
  openGameMode();
}
