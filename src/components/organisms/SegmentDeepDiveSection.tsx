import React, { useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ChartContainer } from '@/components/molecules/ChartContainer';
import { ProductSegmentItem } from '@/components/molecules/ProductSegmentItem';
import { useSegmentDeepDiveStore } from '@/stores/segmentDeepDiveStore';
import { Loader } from '@/components/atoms/Loader';

export function SegmentDeepDiveSection() {
  const { data, loading, fetchSegmentDeepDive } = useSegmentDeepDiveStore();

  useEffect(() => {
    fetchSegmentDeepDive();
  }, [fetchSegmentDeepDive]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <ChartContainer title="Segment Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.segmentDistribution} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="segment" type="category" width={120} />
              <Tooltip
                formatter={(value: number | string, name: string) => [
                  value,
                  name === 'count' ? 'Customers' : 'Percentage',
                ]}
              />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Payment Method Preferences">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.paymentTypes}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ method, value }) => `${method}: ${value}%`}
              >
                {data.paymentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <ChartContainer title="Top Products by Segment">
          <div className="space-y-3">
            {data.topProducts.map((item, index) => (
              <ProductSegmentItem
                key={index}
                product={item.product}
                segment={item.segment}
                sales={item.sales}
              />
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Average Review Score by Segment">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.reviewScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="segment" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 5]} />
              <Tooltip
                formatter={(value: number | string) => [Number(value).toFixed(1), 'Review Score']}
              />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
