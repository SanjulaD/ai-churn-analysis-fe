import { create } from 'zustand';

import { ApiService } from '@/services/api';
import { type ModelPerformanceData } from '@/types/dashboard';
import Logger from '@/utils/logger';

interface ModelPerformanceStore {
  data: ModelPerformanceData | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateSuccess: boolean | null;
  fetchModelPerformance: () => Promise<void>;
  updateModel: () => Promise<void>;
}

export const useModelPerformanceStore = create<ModelPerformanceStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  updating: false,
  updateSuccess: null,
  fetchModelPerformance: async () => {
    set({ loading: true, error: null });
    try {
      const data = await ApiService.getModelPerformance();
      set({ data, loading: false });
    } catch (error) {
      Logger.error(
        'Error fetching model performance: ' +
          (error instanceof Error ? error.message : String(error))
      );
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch model performance',
        loading: false,
      });
    }
  },
  updateModel: async () => {
    set({ updating: true, updateSuccess: null });
    try {
      await ApiService.updateModel();
      set({ updateSuccess: true });
      // Refresh the data after successful update
      await get().fetchModelPerformance();
    } catch (error) {
      Logger.error(
        'Error updating model: ' + (error instanceof Error ? error.message : String(error))
      );
      set({ updateSuccess: false });
    } finally {
      set({ updating: false });
    }
  },
}));
