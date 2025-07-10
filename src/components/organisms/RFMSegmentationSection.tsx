import { useEffect, useState } from 'react';
import { DollarSign, Eye, Target, TrendingUp, Users } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Loader } from '@/components/atoms/Loader';
import { MetricCard } from '@/components/atoms/MetricCard';
import { ChartContainer } from '@/components/molecules/ChartContainer';
import { SegmentDetailModal } from '@/components/molecules/SegmentDetailModal';
import { Button } from '@/components/ui/button';
import type { RFMSegmentDetail } from '@/schemas/apiSchemas';
import { ApiService } from '@/services/api';
import { useRFMSegmentationStore } from '@/stores/rfmSegmentationStore';

const SEGMENT_COLORS = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
];

export function RFMSegmentationSection() {
  const { data, loading, fetchRFMData } = useRFMSegmentationStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSegmentData, setSelectedSegmentData] = useState<RFMSegmentDetail | null>(null);
  const [segmentLoading, setSegmentLoading] = useState(false);

  useEffect(() => {
    fetchRFMData();
  }, [fetchRFMData]);

  const handleSegmentClick = async (segmentName: string) => {
    setModalOpen(true);
    setSegmentLoading(true);
    setSelectedSegmentData(null);

    try {
      const segmentDetail = await ApiService.getRFMSegmentDetail(segmentName);
      setSelectedSegmentData(segmentDetail);
    } catch (error) {
      console.error('Error fetching segment detail:', error);
    } finally {
      setSegmentLoading(false);
    }
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

  const chartData = data.distribution.map((item, index) => ({
    segment: item['RFM Segment'],
    count: item.count,
    fill: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
  }));

  const reviewScoreData = data.reviewScores.map(item => ({
    segment: item['RFM Segment'],
    score: Number(item.avg_review_score.toFixed(2)),
  }));

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Customers"
          value={data.overview.total_customers.toLocaleString()}
          icon={Users}
        />
        <MetricCard
          title="Total Segments"
          value={data.overview.total_segments.toString()}
          icon={Target}
        />
        <MetricCard
          title="Avg Monetary Value"
          value={`$${data.overview.average_monetary.toFixed(2)}`}
          icon={DollarSign}
        />
        <MetricCard
          title="Avg Satisfaction"
          value={data.overview.average_satisfaction.toFixed(2)}
          icon={TrendingUp}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Segment Distribution */}
        <ChartContainer title="Customer Distribution by RFM Segment">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                label={({ segment, count }) => `${segment}: ${count}`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Review Scores */}
        <ChartContainer title="Average Review Score by Segment">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reviewScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="segment" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis domain={[0, 5]} />
              <Tooltip
                formatter={(value: number | string) => [Number(value).toFixed(2), 'Review Score']}
              />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Detailed Segment Table */}
      <ChartContainer title="RFM Segment Details">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Segment</th>
                <th className="text-left p-2">Customers</th>
                <th className="text-left p-2 hidden md:table-cell">Avg Recency</th>
                <th className="text-left p-2 hidden md:table-cell">Avg Frequency</th>
                <th className="text-left p-2">Avg Monetary</th>
                <th className="text-left p-2 hidden lg:table-cell">Top Payment</th>
                <th className="text-left p-2 hidden lg:table-cell">Top Product</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.segments.map((segment, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="p-2 font-medium">{segment['RFM Segment']}</td>
                  <td className="p-2">{segment.n_customer.toLocaleString()}</td>
                  <td className="p-2 hidden md:table-cell">
                    {segment.mean_recency.toFixed(1)} days
                  </td>
                  <td className="p-2 hidden md:table-cell">{segment.mean_freq.toFixed(1)}</td>
                  <td className="p-2">${segment.mean_monetary.toFixed(2)}</td>
                  <td className="p-2 hidden lg:table-cell">{segment.most_payment_type}</td>
                  <td className="p-2 hidden lg:table-cell">{segment.most_product_buy}</td>
                  <td className="p-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSegmentClick(segment['RFM Segment'])}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartContainer>

      <SegmentDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        segmentData={selectedSegmentData}
        loading={segmentLoading}
      />
    </div>
  );
}
