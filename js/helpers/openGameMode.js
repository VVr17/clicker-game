import { containerRef, headerRef, getCoinsBtnRef } from '../utils/refs.js';

/**
 * openGameMode function applies CSS styles to switch the game mode after user registration.
 *
 * The function adds the 'is-game-mode' class to the body, containerRef, and getCoinsBtnRef elements,
 * and removes the 'is-hidden' class from the headerRef element.
 * These CSS classes define the layout and visual appearance of the game mode UI elements.
 */
export const openGameMode = () => {
  document.body.classList.add('is-game-mode');
  headerRef.classList.remove('is-hidden');
  containerRef.classList.add('is-game-mode');
  getCoinsBtnRef.classList.add('is-game-mode');
};
