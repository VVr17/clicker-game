/**
 * getTargetedCoinsPerLevel returns the targeted number of coins for a given game level.
 *
 * @param {number} level - The game level for which to determine the targeted coins.
 * @returns {number} - The targeted number of coins for the specified level.
 */
export const getTargetedCoinsPerLevel = level => {
  const targetedCoinsByLevel = {
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 30,
  };

  return targetedCoinsByLevel[level];
};
