export function onFormSubmit(event) {
  event.preventDefault();
  const { nickname, username, email } = event.currentTarget.elements;

  const isOneOfFieldsEmpty =
    !nickname?.values?.trim() || !username?.values?.trim();

  if (isOneOfFieldsEmpty) {
    alert('Please, enter valid name and email');
    return;
  }

  console.log(
    'nickname, username, email',
    nickname.value,
    username.value,
    email.value
  );
}
