import React from 'react';
import { CheckCircle, Circle, Zap, ArrowRight, Swords, Trophy, PartyPopper } from 'lucide-react';

// Helper function to determine action type and styling
function getActionStyle(action) {
  const actionLower = action.toLowerCase();
  
  // Switch instructions
  if (action.startsWith('<SWITCH IN') || action.startsWith('<switch in')) {
    return {
      type: 'switch',
      icon: <ArrowRight className="w-4 h-4 flex-shrink-0" />,
      bgColor: 'rgba(251, 191, 36, 0.2)',
      borderColor: 'rgba(251, 191, 36, 0.5)',
      textColor: '#fbbf24',
      label: action.replace(/<|>/g, '')
    };
  }
  
  // Turn instructions
  if (action.startsWith('- Turn')) {
    // Match both "Turn 1:" and "Turns 1-3:" and "Turns 1 - 3:" formats
    const turnMatch = action.match(/- Turns? ([\d]+(?:\s*-\s*[\d]+)?): (.+)/i);
    if (turnMatch) {
      // Normalize the turn number display (remove extra spaces around hyphen)
      const turnNum = turnMatch[1].replace(/\s*-\s*/g, '-');
      return {
        type: 'turn',
        icon: <Swords className="w-4 h-4 flex-shrink-0" />,
        bgColor: 'rgba(96, 165, 250, 0.15)',
        borderColor: 'rgba(96, 165, 250, 0.3)',
        textColor: '#93c5fd',
        turnNum: turnNum,
        moveText: turnMatch[2]
      };
    }
  }
  
  // Battle over marker
  if (action.includes('BATTLE OVER')) {
    return {
      type: 'marker',
      icon: <Trophy className="w-4 h-4 flex-shrink-0" />,
      bgColor: 'rgba(34, 197, 94, 0.2)',
      borderColor: 'rgba(34, 197, 94, 0.5)',
      textColor: '#22c55e',
      label: 'BATTLE OVER'
    };
  }
  
  // Run cleared marker
  if (action.includes('RUN CLEARED') || action.includes('CONGRATULATIONS')) {
    return {
      type: 'victory',
      icon: <PartyPopper className="w-4 h-4 flex-shrink-0" />,
      bgColor: 'rgba(168, 85, 247, 0.2)',
      borderColor: 'rgba(168, 85, 247, 0.5)',
      textColor: '#c084fc',
      label: 'RUN CLEARED! CONGRATULATIONS!! 🎉'
    };
  }
  
  // Default action
  return {
    type: 'default',
    icon: <span className="mt-0.5" style={{ color: '#3962b4' }}>•</span>,
    bgColor: 'transparent',
    borderColor: 'transparent',
    textColor: 'rgba(255, 255, 255, 0.9)',
    label: action
  };
}

function ActionItem({ action }) {
  const style = getActionStyle(action);
  
  if (style.type === 'switch') {
    return (
      <div 
        className="rounded-lg px-3 py-2 border flex items-center gap-2"
        style={{ backgroundColor: style.bgColor, borderColor: style.borderColor }}
      >
        <span style={{ color: style.textColor }}>{style.icon}</span>
        <span className="font-semibold text-sm" style={{ color: style.textColor }}>
          {style.label}
        </span>
      </div>
    );
  }
  
  if (style.type === 'turn') {
    // Use "Turns" for ranges (contains hyphen), "Turn" for single turns
    const turnLabel = style.turnNum.includes('-') ? 'Turns' : 'Turn';
    return (
      <div 
        className="rounded-lg px-3 py-2 border flex items-center gap-3 ml-4"
        style={{ backgroundColor: style.bgColor, borderColor: style.borderColor }}
      >
        <span style={{ color: style.textColor }}>{style.icon}</span>
        <div className="flex items-center gap-2">
          <span 
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{ backgroundColor: 'rgba(96, 165, 250, 0.3)', color: '#93c5fd' }}
          >
            {turnLabel} {style.turnNum}
          </span>
          <span className="text-sm text-white/90">{style.moveText}</span>
        </div>
      </div>
    );
  }
  
  if (style.type === 'marker' || style.type === 'victory') {
    return (
      <div 
        className="rounded-lg px-3 py-2 border flex items-center justify-center gap-2"
        style={{ backgroundColor: style.bgColor, borderColor: style.borderColor }}
      >
        <span style={{ color: style.textColor }}>{style.icon}</span>
        <span className="font-bold text-sm" style={{ color: style.textColor }}>
          {style.label}
        </span>
      </div>
    );
  }
  
  // Default rendering
  return (
    <div className="flex items-start gap-2 text-sm">
      {style.icon}
      <span style={{ color: style.textColor }}>{style.label}</span>
    </div>
  );
}

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
          Battle Script:
        </h3>
        <div className="space-y-2">
          {actions.map((action, idx) => (
            <ActionItem key={idx} action={action} />
          ))}
        </div>
      </div>
    </div>
  );
}

