import { create } from 'zustand';

import { ApiService } from '@/services/api';
import { type SegmentDeepDiveData } from '@/types/dashboard';
import Logger from '@/utils/logger';

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
      Logger.error(
        'Store: Error fetching segment deep dive data: ' +
          (error instanceof Error ? error.message : String(error))
      );
      set({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch segment deep dive data',
      });
    }
  },
}));
