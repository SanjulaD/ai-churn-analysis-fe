import { create } from 'zustand';

import { ApiService } from '@/services/api';
import { type RFMSegmentationData } from '@/types/dashboard';
import Logger from '@/utils/logger';

interface RFMSegmentationStore {
  data: RFMSegmentationData | null;
  loading: boolean;
  error: string | null;
  fetchRFMData: () => Promise<void>;
}

export const useRFMSegmentationStore = create<RFMSegmentationStore>(set => ({
  data: null,
  loading: false,
  error: null,
  fetchRFMData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await ApiService.getRFMSegmentation();
      set({ data, loading: false });
    } catch (error) {
      Logger.error(
        'Error fetching rfm segmentation: ' +
          (error instanceof Error ? error.message : String(error))
      );
    }
  },
}));
