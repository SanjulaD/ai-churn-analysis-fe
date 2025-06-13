import React from 'react';
import { Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardHeaderProps {
  darkMode: boolean;
  onThemeToggle: () => void;
}

export function DashboardHeader({ darkMode, onThemeToggle }: DashboardHeaderProps) {
  const { logout, user } = useAuth();
  const isMobile = useIsMobile();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-card border-b border-border p-2 md:p-4 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <SidebarTrigger />
        <div className="min-w-0 flex-1">
          <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
            Churn Analysis Dashboard
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">{currentDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <Button
          variant="outline"
          size={isMobile ? 'sm' : 'default'}
          onClick={onThemeToggle}
          className="shrink-0"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        {user && (
          <Button
            variant="outline"
            size={isMobile ? 'sm' : 'default'}
            onClick={logout}
            className="shrink-0"
          >
            <span className="hidden sm:inline mr-1">Logout</span>
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
