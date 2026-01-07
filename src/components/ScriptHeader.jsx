import React from 'react';
import { Map } from 'lucide-react';

export default function ScriptHeader({ date, progress, onUploadNew }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Map className="w-8 h-8 text-white" />
        <div>
          <h1 className="text-2xl font-bold text-white">Daily Run Script Helper</h1>
          <p className="text-white/60 text-sm">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-white/60 text-sm">Progress</div>
          <div className="text-2xl font-bold text-white">{Math.round(progress)}%</div>
        </div>
        <button
          onClick={onUploadNew}
          className="text-white/70 hover:text-white text-sm underline"
        >
          Upload New
        </button>
      </div>
    </div>
  );
}

