/**
 * Applies CSS styles by toggling CSS classes to switch the game mode after user registration.
 * CSS classes that define the layout and visual appearance of the game mode UI elements.
 */
export const openGameMode = () => {
  const headerRef = document.querySelector('.js-header'); // header ref

  document.body.classList.add('is-game-mode');
  headerRef.classList.remove('is-hidden');
};
