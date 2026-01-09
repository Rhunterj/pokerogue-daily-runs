/**
 * Normalizes text by replacing various dash/hyphen characters with standard hyphen
 * @param {string} text - Text to normalize
 * @returns {string} - Normalized text
 */
function normalizeDashes(text) {
  // Replace en-dash, em-dash, minus sign, and other dash-like characters with standard hyphen
  return text.replace(/[\u2010-\u2015\u2212\u2013\u2014]/g, '-');
}

/**
 * Parses script text and extracts floor data
 * @param {string} text - The script text to parse
 * @returns {Object} - Parsed script data with date and floors
 */
export function parseScript(text) {
  // Normalize the entire text first to handle PDF encoding issues
  text = normalizeDashes(text);
  
  const lines = text.split('\n');
  const floors = {};
  let currentFloor = null;
  let currentBiome = '';
  let currentEnemy = '';
  let currentActions = [];
  let scriptDate = '01/07/2026';

  const dateMatch = text.match(/DAILY RUN SCRIPT \((\d{2}\/\d{2})\)/);
  if (dateMatch) {
    scriptDate = dateMatch[1] + '/2026';
  }

  for (let line of lines) {
    line = line.trim();
    
    const biomeMatch = line.match(/<BIOME:\s*(.+?)>/);
    if (biomeMatch) {
      currentBiome = biomeMatch[1];
      continue;
    }

    const sectionMatch = line.match(/FLOORS \d+-\d+ \((.+?)\)/);
    if (sectionMatch) {
      currentBiome = sectionMatch[1];
      continue;
    }

    const floorMatch = line.match(/^FLOOR (\d+) \((.+?)\)/);
    if (floorMatch) {
      if (currentFloor !== null && currentActions.length > 0) {
        floors[currentFloor] = {
          biome: currentBiome,
          enemy: currentEnemy,
          actions: [...currentActions]
        };
      }
      
      currentFloor = floorMatch[1];
      currentEnemy = floorMatch[2];
      currentActions = [];
      continue;
    }

    if (currentFloor && (line.startsWith('•') || line.startsWith('<') || line.startsWith('['))) {
      currentActions.push(line.replace(/^[•\s]+/, ''));
    } else if (currentFloor && line.startsWith('item:')) {
      currentActions.push(line);
    } else if (currentFloor && /^-\s*Turns?\s+\d/i.test(line)) {
      // Capture turn-by-turn instructions like "- Turn 1: thunder wave" or "- Turns 1-2: hurricane"
      // Using regex to be more flexible with spacing and case
      currentActions.push(line);
    }
  }

  if (currentFloor !== null && currentActions.length > 0) {
    floors[currentFloor] = {
      biome: currentBiome,
      enemy: currentEnemy,
      actions: [...currentActions]
    };
  }

  if (Object.keys(floors).length === 0) {
    throw new Error('No floors found. Please check the format of your script.');
  }

  return {
    date: scriptDate,
    floors: floors
  };
}

