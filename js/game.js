import { changeLevelContent } from './helpers/changeLevelContent.js';
import { enemyRef } from './utils/refs.js';
import GameController from './classes/GameController.js';
import Modal from './classes/Modal.js';
import Notification from './classes/Notification.js';
import { toastMessages } from './constants/toastMessages.js';
import { initialLevel } from './constants/gameConstants.js';

let restartBtnRef;

const notification = new Notification();
const game = new GameController();
const messageModal = new Modal({
  modal: '[data-modal]',
  closeModalBtn: '[data-modal-close]',
});

messageModal.addHandlers();

enemyRef.addEventListener('click', gameHandler);

function gameHandler() {
  // remove event listener from Restart button
  if (game.isRestarted) {
    restartBtnRef.removeEventListener('click', restartGameHandler);
    game.isRestarted = false;
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
    addRestartBtnHandler();
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

function addRestartBtnHandler() {
  restartBtnRef = document.querySelector('.js-restart-btn');
  restartBtnRef.addEventListener('click', restartGameHandler);
}

function restartGameHandler() {
  game.restart();
  changeLevelContent({
    level: initialLevel,
    isRestarted: game.isRestarted,
  });
  notification.info(toastMessages.startGame);
}
