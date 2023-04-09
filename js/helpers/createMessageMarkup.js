/**
 * createMessageMarkup function generates HTML markup for displaying a congratulation message.
 *
 * @param {Object} options - An object containing the following properties:
 *   - level {number}: The level number the player has reached.
 *   - coins {number}: The number of coins the player has collected.
 *   - timer {string}: The time taken by the player to complete the game.
 *   - targetedCoinsPerLevel {number} The number of coins the player to be collected for the next level.
 *   - isGameFinished {boolean}: A flag indicating whether the game is finished or not. Default is `false`.
 *
 * @returns {string} - The generated HTML markup for the congratulation message.
 */
export const createMessageMarkup = ({
  level,
  coins,
  timer,
  targetedCoinsPerLevel,
  isGameFinished = false,
}) => {
  if (isGameFinished) {
    return `
    <p>Congratulation!</p>
    <p>You won</p>
    <p>Your score: ${coins} coins</p>
    <p>Your time: ${timer}</p>
  `;
  }

  return `
    <p>Congratulation!</p>
    <p>You have reached ${level} level</p>
    <p>Your score: ${coins} coins</p>
    <p>Your time: ${timer}</p>
    <p>You have to collect ${targetedCoinsPerLevel} coins for the next level</p>
  `;
};
