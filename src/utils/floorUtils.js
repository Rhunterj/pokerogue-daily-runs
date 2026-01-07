/**
 * Gets sorted floor numbers from script data
 * @param {Object} floors - Object with floor numbers as keys
 * @returns {number[]} - Sorted array of floor numbers
 */
export function getSortedFloors(floors) {
  return Object.keys(floors).map(Number).sort((a, b) => a - b);
}

/**
 * Calculates progress percentage
 * @param {number} completedCount - Number of completed floors
 * @param {number} totalCount - Total number of floors
 * @returns {number} - Progress percentage
 */
export function calculateProgress(completedCount, totalCount) {
  return (completedCount / totalCount) * 100;
}

/**
 * Gets key floors (trainers, gyms, bosses, and multiples of 10)
 * @param {number[]} floors - Array of floor numbers
 * @param {Object} floorsData - Object with floor data
 * @returns {number[]} - Array of key floor numbers
 */
export function getKeyFloors(floors, floorsData) {
  return floors.filter(f => {
    const data = floorsData[f];
    return data?.enemy?.toLowerCase().includes('trainer') ||
           data?.enemy?.toLowerCase().includes('gym') ||
           data?.enemy?.toLowerCase().includes('boss') ||
           f % 10 === 0;
  });
}

