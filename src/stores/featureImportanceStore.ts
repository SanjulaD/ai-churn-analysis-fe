import { create } from 'zustand';

import { ApiService } from '@/services/api';
import { type FeatureImportanceData } from '@/types/dashboard';
import Logger from '@/utils/logger';

interface FeatureImportanceStore {
  data: FeatureImportanceData | null;
  loading: boolean;
  error: string | null;
  downloadingCsv: boolean;
  fetchFeatureImportance: () => Promise<void>;
  downloadCsv: () => Promise<void>;
}

export const useFeatureImportanceStore = create<FeatureImportanceStore>(set => ({
  data: null,
  loading: false,
  error: null,
  downloadingCsv: false,
  fetchFeatureImportance: async () => {
    set({ loading: true, error: null });
    try {
      const data = await ApiService.getFeatureImportance();
      set({ data, loading: false });
    } catch (error) {
      Logger.error(
        'Error fetching feature importance: ' +
          (error instanceof Error ? error.message : String(error))
      );
    }
  },
  downloadCsv: async () => {
    set({ downloadingCsv: true });
    try {
      const blob = await ApiService.downloadFeatureImportanceCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'feature-importance.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      Logger.error(
        'Error downloading CSV: ' + (error instanceof Error ? error.message : String(error))
      );
      Logger.info('Downloading CSV...');
    } finally {
      set({ downloadingCsv: false });
    }
  },
}));
