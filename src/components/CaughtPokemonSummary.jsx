import React, { useState } from 'react';
import { getPokemonSpriteUrl } from '../utils/floorUtils';

export default function CaughtPokemonSummary({ caughtPokemon, onFloorSelect }) {
  const [failedImages, setFailedImages] = useState(new Set());

  if (caughtPokemon.length === 0) {
    return null;
  }

  const handleImageError = (name) => {
    setFailedImages(prev => new Set([...prev, name]));
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 mb-6">
      <h3 className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
        <span className="text-lg">🎯</span>
        Caught Pokémon ({caughtPokemon.length})
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {caughtPokemon.map((pokemon, index) => (
          <button
            key={`${pokemon.name}-${pokemon.floor}-${index}`}
            onClick={() => onFloorSelect(pokemon.floor)}
            className={`group rounded-xl p-3 transition-all duration-200 border hover:scale-105 ${
              pokemon.addedToParty 
                ? 'bg-white/5 hover:bg-white/15 border-white/10 hover:border-white/30' 
                : 'bg-amber-900/20 hover:bg-amber-900/30 border-amber-500/30 hover:border-amber-500/50'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 flex items-center justify-center rounded-lg relative ${
                pokemon.addedToParty 
                  ? 'bg-gradient-to-br from-white/10 to-white/5' 
                  : 'bg-gradient-to-br from-amber-500/20 to-amber-900/10'
              }`}>
                {!failedImages.has(pokemon.name) ? (
                  <img
                    src={getPokemonSpriteUrl(pokemon.name)}
                    alt={pokemon.name}
                    className={`w-14 h-14 object-contain pixelated drop-shadow-lg ${
                      !pokemon.addedToParty ? 'opacity-70' : ''
                    }`}
                    onError={() => handleImageError(pokemon.name)}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-14 h-14 flex items-center justify-center text-2xl">
                    ❓
                  </div>
                )}
                {!pokemon.addedToParty && (
                  <span className="absolute -top-1 -right-1 text-xs" title="Sent to box">📦</span>
                )}
              </div>
              <div className="text-center">
                <p className="text-white text-xs font-medium leading-tight">
                  {pokemon.name}
                  {pokemon.number && <span className="text-white/50"> #{pokemon.number}</span>}
                </p>
                <p className="text-white/50 text-[10px] mt-0.5">
                  Floor {pokemon.floor}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

