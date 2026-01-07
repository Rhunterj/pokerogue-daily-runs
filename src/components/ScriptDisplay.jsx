import React from 'react';
import ScriptHeader from './ScriptHeader';
import ProgressBar from './ProgressBar';
import FloorCard from './FloorCard';
import FloorNavigation from './FloorNavigation';
import KeyFloors from './KeyFloors';
import { getSortedFloors, calculateProgress, getKeyFloors } from '../utils/floorUtils';

export default function ScriptDisplay({ scriptData, currentFloor, completedFloors, onFloorChange, onToggleFloor, onUploadNew }) {
  const floors = getSortedFloors(scriptData.floors);
  const currentData = scriptData.floors[currentFloor];
  const progress = calculateProgress(completedFloors.size, floors.length);
  const keyFloors = getKeyFloors(floors, scriptData.floors);

  const handlePrevious = () => {
    onFloorChange(Math.max(floors[0], currentFloor - 1));
  };

  const handleNext = () => {
    onFloorChange(Math.min(floors[floors.length - 1], currentFloor + 1));
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(135deg, #313973 0%, #295294 50%, #3962b4 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
          <ScriptHeader 
            date={scriptData.date}
            progress={progress}
            onUploadNew={onUploadNew}
          />

          <ProgressBar progress={progress} />

          {currentData && (
            <FloorCard
              floor={currentFloor}
              totalFloors={floors.length}
              enemy={currentData.enemy}
              biome={currentData.biome}
              actions={currentData.actions}
              isCompleted={completedFloors.has(currentFloor)}
              onToggleComplete={() => onToggleFloor(currentFloor)}
            />
          )}

          <FloorNavigation
            currentFloor={currentFloor}
            firstFloor={floors[0]}
            lastFloor={floors[floors.length - 1]}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />

          <KeyFloors
            keyFloors={keyFloors}
            currentFloor={currentFloor}
            completedFloors={completedFloors}
            onFloorSelect={onFloorChange}
          />

          <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(57, 98, 180, 0.2)', borderColor: 'rgba(57, 98, 180, 0.3)', borderWidth: '1px' }}>
            <h3 className="text-white font-semibold mb-2 text-sm">💡 Tips:</h3>
            <ul className="text-white/80 text-xs space-y-1">
              <li>• Mark floors as complete by clicking the circle button</li>
              <li>• This is a guide, not automation - you play manually</li>
              <li>• Upload a new PDF anytime by clicking "Upload New" above</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

