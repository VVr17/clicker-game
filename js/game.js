import { changeLevelTheme } from './helpers/changeLeveltheme.js';
import { enemyRef } from './utils/refs.js';
import GameController from './classes/GameController.js';
import Modal from './classes/Modal.js';
import Notification from './classes/Notification.js';
import { toastMessages } from './constants/toastMessages.js';

const notification = new Notification();
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
    notification.success(toastMessages.gameStarted);
  }

  if (game.isPaused) {
    game.unpause();
    notification.info(toastMessages.gameUnpaused);
  }

  game.collectCoins();
  game.updateGameStatus();

  if (game.isCompleted) {
    game.finish();
    notification.success(toastMessages.gameFinished);
    messageModal.open();
    changeLevelTheme(game.level, game.isFinished);
    return;
  }

  if (game.isTargetNumberCoinsReached) {
    game.pause();
    game.changeLevel();
    notification.info(toastMessages.gamePaused);
    messageModal.open();
    changeLevelTheme(game.level, game.isFinished);
  }
}
