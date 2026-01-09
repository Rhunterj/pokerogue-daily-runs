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

/**
 * Extracts caught Pokémon from script data
 * @param {Object} floorsData - Object with floor data containing actions
 * @returns {Array} - Array of caught Pokémon with name, floor, and optional number
 */
export function getCaughtPokemon(floorsData) {
  const caught = [];
  
  for (const [floor, data] of Object.entries(floorsData)) {
    if (!data.actions) continue;
    
    for (const action of data.actions) {
      // Match patterns like <SCRAGGY 1 CAUGHT>, <SCRAGGY 2 CAUGHT>, <DROWZEE CAUGHT>
      const caughtMatch = action.match(/<([A-Z][A-Z\s-]+?)(?:\s+(\d+))?\s+CAUGHT>/);
      if (caughtMatch) {
        const name = caughtMatch[1].trim();
        const number = caughtMatch[2] ? parseInt(caughtMatch[2]) : null;
        caught.push({
          name: formatPokemonName(name),
          rawName: name,
          floor: parseInt(floor),
          number,
          addedToParty: true
        });
        continue;
      }
      
      // Match pattern like <KOFFING NOT ADDED TO PARTY> (caught but sent to box)
      const notAddedMatch = action.match(/<([A-Z][A-Z\s-]+?)\s+NOT ADDED TO PARTY>/);
      if (notAddedMatch) {
        const name = notAddedMatch[1].trim();
        caught.push({
          name: formatPokemonName(name),
          rawName: name,
          floor: parseInt(floor),
          number: null,
          addedToParty: false
        });
        continue;
      }
      
      // Match pattern like <REPLACE SCRAGGY 1 WITH MURKROW> (caught and replaced party member)
      const replaceMatch = action.match(/<REPLACE\s+.+?\s+WITH\s+([A-Z][A-Z\s-]+?)>/);
      if (replaceMatch) {
        const name = replaceMatch[1].trim();
        caught.push({
          name: formatPokemonName(name),
          rawName: name,
          floor: parseInt(floor),
          number: null,
          addedToParty: true
        });
        continue;
      }
    }
  }
  
  return caught;
}

/**
 * Formats Pokémon name for display (Title Case)
 * @param {string} name - Raw Pokémon name in uppercase
 * @returns {string} - Formatted name
 */
function formatPokemonName(name) {
  return name
    .toLowerCase()
    .split(/[\s-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Gets sprite URL for a Pokémon
 * @param {string} name - Pokémon name
 * @returns {string} - Sprite URL
 */
export function getPokemonSpriteUrl(name) {
  // Use Pokemon Showdown sprites - reliable and widely available
  const formattedName = name
    .toLowerCase()
    .replace(/['']/g, '')      // Remove apostrophes (farfetch'd -> farfetchd)
    .replace(/[.:\s]/g, '')    // Remove dots, colons, spaces (mr. mime -> mrmime)
    .replace(/♀/g, '-f')       // Female symbol
    .replace(/♂/g, '-m');      // Male symbol
  
  return `https://play.pokemonshowdown.com/sprites/gen5/${formattedName}.png`;
}

