import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Brain, BarChart3, Target, Users, Layers, TrendingUp } from 'lucide-react';

const menuItems = [
  {
    title: 'Churn Overview',
    icon: Brain,
    id: 'overview',
  },
  {
    title: 'Model Performance',
    icon: Target,
    id: 'performance',
  },
  {
    title: 'Feature Importance',
    icon: BarChart3,
    id: 'features',
  },
  {
    title: 'RFM Segmentation',
    icon: Users,
    id: 'rfm',
  },
  {
    title: 'Deep Dive',
    icon: Layers,
    id: 'deepdive',
  },
];

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Dashboard Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    isActive={activeSection === item.id}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
