import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Search, Activity, BarChart3 } from 'lucide-react';
import { MetricCard } from '@/components/atoms/MetricCard';
import { useModelPerformanceStore } from '@/stores/modelPerformanceStore';
import { Loader } from '@/components/atoms/Loader';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const iconMap = {
  Target,
  Search,
  Activity,
  BarChart3,
};

export function ModelPerformanceSection() {
  const { data, loading, updating, updateSuccess, fetchModelPerformance, updateModel } =
    useModelPerformanceStore();
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchModelPerformance();
  }, [fetchModelPerformance]);

  useEffect(() => {
    if (updateSuccess === true) {
      toast({
        title: 'Model Updated',
        description: 'The model has been successfully updated with the latest data.',
        variant: 'default',
      });
    } else if (updateSuccess === false) {
      toast({
        title: 'Update Failed',
        description: 'There was an error updating the model. Please try again.',
        variant: 'destructive',
      });
    }
  }, [updateSuccess]);

  const handleUpdateConfirm = async () => {
    setIsConfirmOpen(false);
    await updateModel();
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {data.metrics.map(metric => {
          const IconComponent = iconMap[metric.icon as keyof typeof iconMap];
          return (
            <MetricCard
              key={metric.name}
              title={metric.name}
              value={metric.value}
              icon={IconComponent}
              iconColor={metric.color}
            />
          );
        })}
      </div>

      <Card>
        <CardContent className="pt-4 md:pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium text-sm md:text-base">{data.lastUpdated}</p>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-sm"
              onClick={() => setIsConfirmOpen(true)}
              disabled={updating}
              size={isMobile ? 'sm' : 'default'}
            >
              {updating ? (
                <>
                  <Loader size={16} className="mr-2" /> Updating...
                </>
              ) : (
                'Update Model'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent className="max-w-sm md:max-w-lg mx-2">
          <AlertDialogHeader>
            <AlertDialogTitle>Update Model</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update the model? This will recalculate all metrics with the
              latest data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateConfirm} className="w-full sm:w-auto">
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
