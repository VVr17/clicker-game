/**
 * Converts a time duration in milliseconds to the mm:ss format.
 *
 * @param {number} milliseconds - The time duration in milliseconds to be converted.
 * @returns {string} - The converted time duration in the mm:ss format.
 */
export const convertMsIntoTimeFormat = milliseconds => {
  let seconds = Math.floor(milliseconds / 1000); // calculate the number of seconds
  const minutes = Math.floor(seconds / 60); // calculate the number of minutes
  seconds %= 60; // reduce seconds to less than 60 if necessary

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};
