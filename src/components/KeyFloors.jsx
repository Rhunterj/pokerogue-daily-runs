import React from 'react';

export default function KeyFloors({ keyFloors, currentFloor, completedFloors, onFloorSelect }) {
  if (keyFloors.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/5 rounded-lg p-4 mb-6">
      <h3 className="text-white font-semibold mb-3 text-sm">Quick Jump to Key Floors:</h3>
      <div className="grid grid-cols-4 gap-2">
        {keyFloors.map(floor => (
          <button
            key={floor}
            onClick={() => onFloorSelect(floor)}
            className={`py-2 px-3 rounded-lg font-semibold text-sm transition ${
              currentFloor === floor ? 'text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            style={currentFloor === floor ? { backgroundColor: '#3962b4' } : 
                   completedFloors.has(floor) ? { backgroundColor: 'rgba(57, 98, 180, 0.3)', borderColor: '#3962b4', borderWidth: '1px' } : {}}
          >
            Floor {floor}
          </button>
        ))}
      </div>
    </div>
  );
}

