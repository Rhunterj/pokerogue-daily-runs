import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function FloorNavigation({ currentFloor, firstFloor, lastFloor, onPrevious, onNext }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={onPrevious}
        disabled={currentFloor === firstFloor}
        className="flex-1 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
      >
        <ChevronLeft className="w-5 h-5" />
        Previous Floor
      </button>
      <button
        onClick={onNext}
        disabled={currentFloor === lastFloor}
        className="flex-1 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(90deg, #3962b4 0%, #295294 100%)' }}
      >
        Next Floor
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

