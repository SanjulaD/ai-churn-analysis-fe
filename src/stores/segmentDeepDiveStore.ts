import { create } from 'zustand';

import { ApiService } from '@/services/api';
import { type SegmentDeepDiveData } from '@/types/dashboard';
import { PaymentMethod, SegmentType } from '@/types/enums';

interface SegmentDeepDiveStore {
  data: SegmentDeepDiveData | null;
  loading: boolean;
  error: string | null;
  fetchSegmentDeepDive: () => Promise<void>;
}

export const useSegmentDeepDiveStore = create<SegmentDeepDiveStore>(set => ({
  data: null,
  loading: false,
  error: null,
  fetchSegmentDeepDive: async () => {
    set({ loading: true, error: null });
    try {
      const data = await ApiService.getSegmentDeepDive();
      set({ data, loading: false });
    } catch (error) {
      console.error('Error fetching segment deep dive data:', error);
      // Fallback to mock data
      const mockData: SegmentDeepDiveData = {
        segmentDistribution: [
          { segment: SegmentType.CHAMPIONS, count: 450, percentage: 28.5 },
          {
            segment: SegmentType.LOYAL_CUSTOMERS,
            count: 380,
            percentage: 24.1,
          },
          {
            segment: SegmentType.POTENTIAL_LOYALISTS,
            count: 320,
            percentage: 20.3,
          },
          { segment: SegmentType.AT_RISK, count: 280, percentage: 17.7 },
          {
            segment: SegmentType.CANNOT_LOSE_THEM,
            count: 150,
            percentage: 9.5,
          },
        ],
        paymentTypes: [
          { method: PaymentMethod.CREDIT_CARD, value: 45, color: '#3b82f6' },
          { method: PaymentMethod.BANK_TRANSFER, value: 30, color: '#10b981' },
          {
            method: PaymentMethod.ELECTRONIC_CHECK,
            value: 15,
            color: '#f59e0b',
          },
          { method: PaymentMethod.MAILED_CHECK, value: 10, color: '#ef4444' },
        ],
        topProducts: [
          {
            product: 'Premium Plan',
            segment: SegmentType.CHAMPIONS,
            sales: 245,
          },
          {
            product: 'Standard Plan',
            segment: SegmentType.LOYAL_CUSTOMERS,
            sales: 189,
          },
          {
            product: 'Basic Plan',
            segment: SegmentType.POTENTIAL_LOYALISTS,
            sales: 156,
          },
          {
            product: 'Fiber Internet',
            segment: SegmentType.CHAMPIONS,
            sales: 134,
          },
          { product: 'Phone Service', segment: SegmentType.AT_RISK, sales: 98 },
        ],
        reviewScores: [
          { segment: 'Champions', score: 4.8 },
          { segment: 'Loyal', score: 4.5 },
          { segment: 'Potential', score: 4.2 },
          { segment: 'At Risk', score: 3.1 },
          { segment: 'Cannot Lose', score: 2.8 },
        ],
      };
      set({ data: mockData, loading: false });
    }
  },
}));
