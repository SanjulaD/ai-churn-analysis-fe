import React, { useEffect } from 'react';
import { BarChart, Download } from 'lucide-react';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Loader } from '@/components/atoms/Loader';
import { ChartContainer } from '@/components/molecules/ChartContainer';
import { useFeatureImportanceStore } from '@/stores/featureImportanceStore';

export function FeatureImportanceSection() {
  const { data, loading, downloadingCsv, fetchFeatureImportance, downloadCsv } =
    useFeatureImportanceStore();

  useEffect(() => {
    fetchFeatureImportance();
  }, [fetchFeatureImportance]);

  const handleDownload = () => {
    downloadCsv();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader size={40} />
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-8">No data available</div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <ChartContainer
        title="Feature Importance (SHAP Values)"
        icon={BarChart}
        action={{
          label: downloadingCsv ? 'Downloading...' : 'Download CSV',
          icon: Download,
          onClick: handleDownload,
        }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <RechartsBarChart
            data={data.features}
            layout="horizontal"
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="feature" type="category" width={80} />
            <YAxis type="number" dataKey="importance" domain={[0, 0.3]} />
            <Tooltip
              formatter={(value: number | string) => [Number(value).toFixed(3), 'SHAP Value']}
            />
            <Bar dataKey="importance" fill="#3b82f6" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer title="SHAP Summary Plot">
        <div className="bg-muted rounded-lg p-6 md:p-8 text-center">
          <p className="text-muted-foreground">SHAP Summary Plot Visualization</p>
          <p className="text-sm text-muted-foreground mt-2">
            Interactive plot would be embedded here
          </p>
        </div>
      </ChartContainer>
    </div>
  );
}
