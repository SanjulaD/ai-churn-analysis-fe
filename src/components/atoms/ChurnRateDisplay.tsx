import React from 'react';
import { TrendingUp } from 'lucide-react';

interface ChurnRateDisplayProps {
  rate: number;
  threshold?: number;
}

export function ChurnRateDisplay({ rate, threshold = 20 }: ChurnRateDisplayProps) {
  const isAboveThreshold = rate > threshold;

  return (
    <div className="flex items-center gap-2">
      <TrendingUp
        className={`h-4 w-4 ${isAboveThreshold ? 'text-destructive' : 'text-muted-foreground'}`}
      />
      <div className={`text-2xl font-bold ${isAboveThreshold ? 'text-destructive' : ''}`}>
        {rate}%
      </div>
    </div>
  );
}
