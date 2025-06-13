import React from 'react';

import { Badge } from '@/components/ui/badge';

interface ProductSegmentItemProps {
  product: string;
  segment: string;
  sales: number;
}

export function ProductSegmentItem({ product, segment, sales }: ProductSegmentItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <p className="font-medium">{product}</p>
        <Badge variant="secondary" className="text-xs">
          {segment}
        </Badge>
      </div>
      <span className="font-bold">{sales} sales</span>
    </div>
  );
}
