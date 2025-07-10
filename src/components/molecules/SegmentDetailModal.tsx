import { Clock, DollarSign, Star, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { RFMSegmentDetail } from '@/schemas/apiSchemas';

interface SegmentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  segmentData: RFMSegmentDetail | null;
  loading: boolean;
}

export function SegmentDetailModal({
  open,
  onOpenChange,
  segmentData,
  loading,
}: SegmentDetailModalProps) {
  if (!segmentData && !loading) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {loading ? 'Loading...' : `${segmentData?.['RFM Segment']} Segment Details`}
            {segmentData && (
              <Badge variant="secondary">Score: {segmentData['RFM Segment Score']}</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : segmentData ? (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Customers</p>
                  <p className="font-semibold">{segmentData.n_customer.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Monetary</p>
                  <p className="font-semibold">${segmentData.mean_monetary.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Recency</p>
                  <p className="font-semibold">{segmentData.mean_recency.toFixed(1)} days</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="font-semibold">{segmentData.avg_review_score.toFixed(1)}/5</p>
                </div>
              </div>
            </div>

            {/* Detailed Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Recency Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average:</span>
                    <span className="font-medium">{segmentData.mean_recency.toFixed(1)} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min:</span>
                    <span className="font-medium">{segmentData.min_recency} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max:</span>
                    <span className="font-medium">{segmentData.max_recency} days</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Frequency Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average:</span>
                    <span className="font-medium">{segmentData.mean_freq.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min:</span>
                    <span className="font-medium">{segmentData.min_freq}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max:</span>
                    <span className="font-medium">{segmentData.max_freq}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Monetary Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average:</span>
                    <span className="font-medium">${segmentData.mean_monetary.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min:</span>
                    <span className="font-medium">${segmentData.min_monetary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max:</span>
                    <span className="font-medium">${segmentData.max_monetary}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Preferences</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Type:</span>
                    <Badge variant="outline">{segmentData.most_payment_type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Top Product:</span>
                    <Badge variant="outline">{segmentData.most_product_buy}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
