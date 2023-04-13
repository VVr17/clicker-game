/**
 * Updates user nickname and email input values.
 *
 * @param {string} nickname - The new nickname to be set as the input value.
 * @param {string} email - The new email to be set as the input value.
 */
export const updateUserDataValues = (nickname, email) => {
  // user data refs
  const userNicknameRef = document.querySelector('.js-nickname');
  const userEmailRef = document.querySelector('.js-email');

  userNicknameRef.value = nickname;
  userEmailRef.value = email;
};
