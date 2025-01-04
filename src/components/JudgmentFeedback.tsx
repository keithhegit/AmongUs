import React, { useEffect } from 'react';

interface JudgmentFeedbackProps {
  isCorrect: boolean;
  onDismiss: () => void;
}

export function JudgmentFeedback({ isCorrect, onDismiss }: JudgmentFeedbackProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed top-1/4 left-0 right-0 mx-4 p-4 rounded-lg ${
      isCorrect ? 'bg-green-100' : 'bg-red-100'
    }`}>
      <p className={`text-lg font-bold text-center ${
        isCorrect ? 'text-green-800' : 'text-red-800'
      }`}>
        {isCorrect ? 'Correct Judgment!' : 'Wrong Judgment!'}
      </p>
    </div>
  );
}