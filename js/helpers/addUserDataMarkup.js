import { gameStatsDataItems } from '../constants/gameStatsData.js';
import { userDataItems } from '../constants/userData.js';

/**
 * Adds user data markup to the game data container.
 *
 *    - userDataItems {Array}  - An array of objects containing the label and name properties for each user data item
 *    - gameStatsDataItems {Array} - An array of objects containing the label, name and value properties for each game stats data item
 */
export const addUserDataMarkup = () => {
  const gameStatsContainerRef = document.querySelector('.js-game-data'); // game statistics container ref

  const userData = `
    <ul class="game-data__list user-data">
      ${userDataItems
        .map(
          ({ label, name }) => `
            <li class="game-data__item user-data__item">
              <p>${label}</p>
              <input class="game-data__value js-${name}" type="text" name="${name}" value="" readonly />
            </li>
          `
        )
        .join('')}
    </ul>
  `;

  const gameData = `
      <ul class="game-data__list">
        ${gameStatsDataItems
          .map(
            ({ label, name, value }) => `
              <li class="game-data__item">
                <p>${label}</p>
                <input class="game-data__value js-${name}" type="text" value="${value}" readonly />
              </li>
            `
          )
          .join('')}     
      </ul>
    `;

  gameStatsContainerRef.insertAdjacentHTML('afterbegin', userData + gameData);
};
