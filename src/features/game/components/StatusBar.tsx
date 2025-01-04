import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface StatusBarProps {
  className?: string;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export const StatusBar = ({ className, left, center, right }: StatusBarProps) => {
  return (
    <div className={cn("flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm", className)}>
      <div className="w-24">{left}</div>
      <div className="flex-1 flex justify-center">{center}</div>
      <div className="w-24 flex justify-end">{right}</div>
    </div>
  );
};