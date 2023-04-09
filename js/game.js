import GameCounter from './classes/GameCounter.js';
import { getCoinsBtnRef } from './utils/refs.js';

// create game counter
const gameCounter = new GameCounter();

getCoinsBtnRef.addEventListener('click', () => gameCounter.collectCoins());
