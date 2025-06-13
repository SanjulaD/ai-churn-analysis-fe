import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RiskBadgeProps {
  risk: string;
}

export function RiskBadge({ risk }: RiskBadgeProps) {
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return <Badge variant={getRiskBadgeColor(risk)}>{risk} Risk</Badge>;
}
