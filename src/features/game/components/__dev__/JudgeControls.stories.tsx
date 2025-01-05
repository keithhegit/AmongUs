import { useState } from 'react';
import { JudgeControls } from '../JudgeControls';

export default {
  title: 'Game/JudgeControls',
  component: JudgeControls
};

export const Default = () => {
  const [mode, setMode] = useState<'good' | 'bad'>('good');

  return (
    <div className="h-screen bg-gray-100">
      <JudgeControls
        currentMode={mode}
        onModeChange={setMode}
      />
      <div className="p-4">
        <p>当前模式: {mode === 'good' ? '好人' : '坏人'}</p>
      </div>
    </div>
  );
};

export const Disabled = () => (
  <div className="h-screen bg-gray-100">
    <JudgeControls
      currentMode="good"
      onModeChange={() => {}}
      disabled={true}
    />
  </div>
); 