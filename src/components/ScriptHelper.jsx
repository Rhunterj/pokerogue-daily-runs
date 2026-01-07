import React, { useState } from 'react';
import { getSortedFloors } from '../utils/floorUtils';
import ScriptUpload from './ScriptUpload';
import ScriptDisplay from './ScriptDisplay';

export default function ScriptHelper() {
  const [scriptData, setScriptData] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [completedFloors, setCompletedFloors] = useState(new Set());

  const handleScriptParsed = (parsed) => {
    setScriptData(parsed);
    const floors = getSortedFloors(parsed.floors);
    setCurrentFloor(floors[0]);
    setCompletedFloors(new Set());
  };

  const handleToggleFloor = (floor) => {
    const newCompleted = new Set(completedFloors);
    if (newCompleted.has(floor)) {
      newCompleted.delete(floor);
    } else {
      newCompleted.add(floor);
    }
    setCompletedFloors(newCompleted);
  };

  if (!scriptData) {
    return <ScriptUpload onScriptParsed={handleScriptParsed} />;
  }

  return (
    <ScriptDisplay
      scriptData={scriptData}
      currentFloor={currentFloor}
      completedFloors={completedFloors}
      onFloorChange={setCurrentFloor}
      onToggleFloor={handleToggleFloor}
      onUploadNew={() => setScriptData(null)}
    />
  );
}