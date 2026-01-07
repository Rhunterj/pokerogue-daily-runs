import React from 'react';
import { CheckCircle, Circle, Zap } from 'lucide-react';

export default function FloorCard({ floor, totalFloors, enemy, biome, actions, isCompleted, onToggleComplete }) {
  return (
    <div className="rounded-xl p-6 mb-6" style={{ background: 'linear-gradient(135deg, rgba(57, 98, 180, 0.3) 0%, rgba(41, 82, 148, 0.3) 100%)', borderColor: 'rgba(57, 98, 180, 0.4)', borderWidth: '1px' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold" style={{ color: '#3962b4' }}>Floor {floor} of {totalFloors}</div>
          <div className="text-white text-2xl font-bold">{enemy}</div>
          <div className="text-white/70 text-sm">{biome}</div>
        </div>
        <button
          onClick={onToggleComplete}
          className={`p-3 rounded-full transition ${
            isCompleted ? 'text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
          style={isCompleted ? { backgroundColor: '#3962b4' } : {}}
        >
          {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>
      </div>

      <div className="bg-black/20 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" style={{ color: '#3962b4' }} />
          Actions:
        </h3>
        <ul className="space-y-2">
          {actions.map((action, idx) => (
            <li key={idx} className="text-white/90 text-sm flex items-start gap-2">
              <span className="mt-1" style={{ color: '#3962b4' }}>•</span>
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

