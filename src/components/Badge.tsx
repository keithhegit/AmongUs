import React from 'react';

interface BadgeProps {
  label: string;
  color: 'blue' | 'purple' | 'green' | 'red';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
};

export function Badge({ label, color }: BadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-full ${colorClasses[color]} text-xs font-medium`}>
      {label}
    </span>
  );
}