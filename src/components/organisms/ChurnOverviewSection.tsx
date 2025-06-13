import React, { useEffect, useState } from 'react';
import { Settings, Users } from 'lucide-react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { ChurnRateDisplay } from '@/components/atoms/ChurnRateDisplay';
import { Loader } from '@/components/atoms/Loader';
import { CustomerRiskItem } from '@/components/molecules/CustomerRiskItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useChurnStore } from '@/stores/churnStore';

export function ChurnOverviewSection() {
  const { data, loading, error, limit, threshold, fetchChurnData, setLimit, setThreshold } =
    useChurnStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchChurnData();
  }, [fetchChurnData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error: {error}</p>
        <Button onClick={fetchChurnData} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-8">No data available</div>;
  }

  const totalPages = Math.ceil((data.summary?.total_high_risk_customers || 0) / limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Note: This would need backend support for actual pagination
    // For now, we'll just update the current page state
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predicted Churn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ChurnRateDisplay rate={data.churnRate} />
            <p className="text-xs text-muted-foreground">Above critical threshold of 20%</p>
            {data.summary && (
              <div className="mt-2 text-xs text-muted-foreground space-y-1">
                <p>Total high-risk customers: {data.summary.total_high_risk_customers}</p>
                <p>
                  Avg risk probability: {(data.summary.average_risk_probability * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Churn Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {data.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm md:text-base">
            <Users className="h-4 w-4 md:h-5 md:w-5" />
            Top Risk Customers
            <Settings className="h-3 w-3 md:h-4 md:w-4 ml-auto" />
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="per-page" className="text-xs md:text-sm">
                Per Page
              </Label>
              <Input
                id="per-page"
                type="number"
                value={limit}
                onChange={e => {
                  setLimit(parseInt(e.target.value) || 10);
                  setCurrentPage(1); // Reset to first page when changing per page count
                }}
                min={5}
                max={50}
                className="w-full sm:w-20 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="threshold" className="text-xs md:text-sm">
                Threshold
              </Label>
              <Input
                id="threshold"
                type="number"
                value={threshold}
                onChange={e => setThreshold(parseFloat(e.target.value) || 0.5)}
                min={0}
                max={1}
                step={0.1}
                className="w-full sm:w-20 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {data.topRiskCustomers.map(customer => (
              <CustomerRiskItem key={customer.customer_id} customer={customer} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={
                        currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
