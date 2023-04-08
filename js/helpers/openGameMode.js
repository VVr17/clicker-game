import { containerRef, headerRef, getCoinsBtnRef } from '../utils/refs.js';

/**
 * change styles for the game mode after registration
 */
export const openGameMode = () => {
  document.body.classList.add('is-game-mode');
  headerRef.classList.remove('is-hidden');
  containerRef.classList.add('is-game-mode');
  getCoinsBtnRef.classList.add('is-game-mode');
};
