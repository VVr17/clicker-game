import GameCounter from './classes/GameCounter.js';
import { getCoinsBtnRef } from './utils/refs.js';

// create game counter
const gameCounter = new GameCounter();

// add listener to the collect coins button
getCoinsBtnRef.addEventListener('click', () => gameCounter.collectCoins());
