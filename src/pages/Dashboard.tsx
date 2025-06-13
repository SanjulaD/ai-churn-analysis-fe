import { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { ChurnPredictionOverview } from '@/components/dashboard/ChurnPredictionOverview';
import { ModelPerformanceMetrics } from '@/components/dashboard/ModelPerformanceMetrics';
import { FeatureImportance } from '@/components/dashboard/FeatureImportance';
import { RFMSegmentation } from '@/components/dashboard/RFMSegmentation';
import { SegmentDeepDive } from '@/components/dashboard/SegmentDeepDive';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <ChurnPredictionOverview />;
      case 'performance':
        return <ModelPerformanceMetrics />;
      case 'features':
        return <FeatureImportance />;
      case 'rfm':
        return <RFMSegmentation />;
      case 'deepdive':
        return <SegmentDeepDive />;
      default:
        return <ChurnPredictionOverview />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      overview: '🧠 Churn Prediction Overview',
      performance: '📈 Model Performance Metrics',
      features: '🔍 Feature Importance',
      rfm: '📊 RFM Segmentation Insights',
      deepdive: '🧾 Segment-Level Deep Dives',
    };
    return titles[activeSection as keyof typeof titles] || titles.overview;
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          <div className="flex-1 flex flex-col min-w-0">
            <DashboardHeader darkMode={darkMode} onThemeToggle={() => setDarkMode(!darkMode)} />
            <main className="flex-1 p-2 md:p-4 lg:p-6 overflow-auto">
              <div className="mb-4 md:mb-6">
                <div className="mb-4">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground break-words mb-1 md:mb-2">
                    {getSectionTitle()}
                  </h2>
                  <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                    Real-time insights and analytics for customer churn prediction
                  </p>
                </div>
              </div>
              <div className="max-w-full">{renderActiveSection()}</div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
