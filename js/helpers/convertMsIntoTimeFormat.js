/**
 * convert time in the format mm:ss
 * @param {number} milliseconds time
 * @returns time in the format mm:ss
 */
export const convertMsIntoTimeFormat = milliseconds => {
  let seconds = Math.floor(milliseconds / 1000); // calculate the number of seconds
  const minutes = Math.floor(seconds / 60); // calculate the number of minutes
  seconds %= 60; // reduce seconds to less than 60 if necessary

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};
