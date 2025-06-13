import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  action?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
}

export function ChartContainer({ title, icon: Icon, children, action }: ChartContainerProps) {
  return (
    <Card>
      <CardHeader className={action ? 'flex flex-row items-center justify-between' : ''}>
        <CardTitle className={Icon ? 'flex items-center gap-2' : ''}>
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </CardTitle>
        {action && (
          <Button variant="outline" size="sm" onClick={action.onClick}>
            <action.icon className="w-4 h-4 mr-2" />
            {action.label}
          </Button>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
