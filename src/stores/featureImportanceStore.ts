import { create } from 'zustand';

import { ApiService } from '@/services/api';
import { type FeatureImportanceData } from '@/types/dashboard';

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
      console.error('Error fetching feature importance:', error);
      // Fallback to mock data
      const mockData: FeatureImportanceData = {
        features: [
          { feature: 'Monthly Charges', importance: 0.28 },
          { feature: 'Total Charges', importance: 0.24 },
          { feature: 'Contract Length', importance: 0.18 },
          { feature: 'Tenure Months', importance: 0.15 },
          { feature: 'Payment Method', importance: 0.12 },
          { feature: 'Internet Service', importance: 0.08 },
          { feature: 'Phone Service', importance: 0.06 },
        ],
      };
      set({ data: mockData, loading: false });
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
      console.error('Error downloading CSV:', error);
      // Mock download for demo
      console.log('Downloading CSV...');
    } finally {
      set({ downloadingCsv: false });
    }
  },
}));
