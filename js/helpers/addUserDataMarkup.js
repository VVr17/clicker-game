import { gameStatsDataItems } from '../constants/gameStatsData.js';
import { userDataItems } from '../constants/userData.js';
import { gameDataContainerRef } from '../utils/refs.js';

/**
 * Adds user data markup to the game data container
 * @param {Array} userDataItems - An array of objects containing the label and name properties for each user data item
 * @param {Array} gameStatsDataItems - An array of objects containing the label, name and value properties for each game stats data item
 * @param {HTMLElement} gameDataContainerRef - A reference to the game data container element
 */
export const addUserDataMarkup = () => {
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

  gameDataContainerRef.insertAdjacentHTML('afterbegin', userData + gameData);
};
