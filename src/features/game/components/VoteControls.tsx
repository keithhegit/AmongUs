interface VoteControlsProps {
  onVoteTypeChange: (type: 'good' | 'bad') => void;
  currentType: 'good' | 'bad';
}

export const VoteControls = ({
  onVoteTypeChange,
  currentType
}: VoteControlsProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-100 rounded-full p-2 shadow-lg">
      <div className="flex gap-2">
        <button
          onClick={() => onVoteTypeChange('good')}
          className={`
            px-6 py-2 rounded-full flex items-center gap-2
            ${currentType === 'good' ? 'bg-white shadow' : ''}
          `}
        >
          <span className="text-xl">😊</span>
          <span>好人</span>
        </button>
        <button
          onClick={() => onVoteTypeChange('bad')}
          className={`
            px-6 py-2 rounded-full flex items-center gap-2
            ${currentType === 'bad' ? 'bg-white shadow' : ''}
          `}
        >
          <span className="text-xl">😈</span>
          <span>坏人</span>
        </button>
      </div>
    </div>
  );
}; 