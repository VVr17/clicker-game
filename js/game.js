import { changeLevelContent, enemyRef } from './helpers/changeLevelContent.js';
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

/**
 * Handles the logic of the game.
 * It starts, pauses and ends the game when it meets the conditions.
 */
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

/**
 * Restarts the game by dropping all data to initial state
 */
function restartGameHandler() {
  game.restart();
  changeLevelContent({
    level: GameController.INITIAL_LEVEL,
    isRestarted: game.isRestarted,
  });
  notification.info(toastMessages.toStartGame);
}
