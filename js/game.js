import { changeLevelTheme } from './helpers/changeLeveltheme.js';
import { getCoinsBtnRef } from './utils/refs.js';
import GameSetter from './classes/GameSetter.js';
import Modal from './classes/Modal.js';

const game = new GameSetter();
const messageModal = new Modal({
  modal: '[data-modal]',
  closeModalBtn: '[data-modal-close]',
});

messageModal.addHandlers();

getCoinsBtnRef.addEventListener('click', onGameButtonClick);

function onGameButtonClick() {
  if (!game.isStarted) {
    game.start();
  }

  if (game.isPaused) {
    game.unpause();
  }

  game.collectCoins();
  game.updateGameStatus();

  if (game.isFinished) {
    game.finish();
    messageModal.open();
    return;
  }

  if (game.isTargetNumberCoinsReached) {
    game.pause();
    game.updateLevel();

    messageModal.open();
    changeLevelTheme(game.level);
  }
}
