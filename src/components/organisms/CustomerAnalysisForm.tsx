import React, { useState } from 'react';
import { AlertCircle, Calendar, DollarSign, Lightbulb,TrendingDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCustomerChurnStore } from '@/stores/useCustomerChurnStore';

export function CustomerAnalysisForm() {
  const [customerId, setCustomerId] = useState('');
  const { prediction, isLoading, error, fetchChurnByCustomerId } = useCustomerChurnStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a customer ID',
        variant: 'destructive',
      });
      return;
    }

    try {
      await fetchChurnByCustomerId(parseInt(customerId));
      toast({
        title: 'Prediction Complete',
        description: 'Customer churn analysis has been calculated successfully.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to fetch prediction. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getRiskLevel = (month: number) => {
    if (month <= 6) return { level: 'High', color: 'destructive' };
    if (month <= 12) return { level: 'Medium', color: 'warning' };
    return { level: 'Low', color: 'default' };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Customer Churn Prediction by ID
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer ID</Label>
              <Input
                id="customerId"
                type="number"
                value={customerId}
                onChange={e => setCustomerId(e.target.value)}
                placeholder="Enter customer ID (e.g., 50046)"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Analyzing...' : 'Analyze Customer Churn Risk'}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Error: {error}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {prediction && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Estimated Churn Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{prediction.estimated_churn_month}</div>
                  <Badge
                    variant={
                      getRiskLevel(prediction.estimated_churn_month).color === 'destructive'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {getRiskLevel(prediction.estimated_churn_month).level} Risk
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Months until expected churn</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Expected Loss
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  ${prediction.expected_loss.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Revenue at risk</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Customer ID</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{prediction.customer_id}</div>
                <p className="text-xs text-muted-foreground mt-1">Analyzed customer</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Key Retention Factors & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(prediction.shap_top_factors).map(([factor, explanation], index) => (
                  <div key={factor} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {factor.replace('iterative_imputer__', '').replace('remainder__', '')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-muted">
                      {explanation}
                    </p>
                    {index < Object.entries(prediction.shap_top_factors).length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
