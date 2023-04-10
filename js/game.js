import { changeLevelTheme } from './helpers/changeLeveltheme.js';
import { enemyRef } from './utils/refs.js';
import GameController from './classes/GameController.js';
import Modal from './classes/Modal.js';

const game = new GameController();
const messageModal = new Modal({
  modal: '[data-modal]',
  closeModalBtn: '[data-modal-close]',
});

messageModal.addHandlers();

enemyRef.addEventListener('click', gameHandler);

function gameHandler() {
  if (game.isFinished) {
    return;
  }

  if (!game.isStarted) {
    game.start();
  }

  if (game.isPaused) {
    game.unpause();
  }

  game.collectCoins();
  game.updateGameStatus();

  if (game.toFinish) {
    game.finish();
    messageModal.open();
    return;
  }

  if (game.isTargetNumberCoinsReached) {
    game.pause();
    game.changeLevel();
    messageModal.open();
    changeLevelTheme(game.level);
  }
}
