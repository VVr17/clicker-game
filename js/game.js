import { changeLevelContent } from './helpers/changeLevelContent.js';
import { enemyRef } from './utils/refs.js';
import GameController from './classes/GameController.js';
import Modal from './classes/Modal.js';
import Notification from './classes/Notification.js';
import { toastMessages } from './constants/toastMessages.js';
import { initialLevel } from './constants/gameConstants.js';

const notification = new Notification();
const game = new GameController();
const messageModal = new Modal({
  modal: '[data-modal]',
  closeModalBtn: '[data-modal-close]',
});

messageModal.addHandlers();

enemyRef.addEventListener('click', gameHandler);

function gameHandler() {
  if (game.isRestarted) {
    game.isRestarted = false;
    game.removeRestartBtnHandler(restartGameHandler);
  }

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
    changeLevelContent({ level: game.level, isFinished: game.isFinished });
    game.addRestartBtnHandler(restartGameHandler);
    return;
  }

  if (game.isTargetNumberCoinsReached) {
    game.pause();
    game.changeLevel();
    notification.info(toastMessages.gamePaused);
    messageModal.open();
    changeLevelContent({ level: game.level, isFinished: game.isFinished });
  }
}

function restartGameHandler() {
  game.restart();
  changeLevelContent({
    level: initialLevel,
    isRestarted: game.isRestarted,
  });
  notification.info(toastMessages.startGame);
}
