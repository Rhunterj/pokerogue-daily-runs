import React from 'react';

export default function TabButton({ icon: Icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
        isActive
          ? 'text-white'
          : 'bg-white/10 text-white/70 hover:bg-white/20'
      }`}
      style={isActive ? { background: 'linear-gradient(90deg, #3962b4 0%, #295294 100%)' } : {}}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

