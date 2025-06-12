import { create } from 'zustand';
import { type ChurnData } from '@/types/dashboard';
import { ApiService } from '@/services/api';

interface ChurnStore {
  data: ChurnData | null;
  loading: boolean;
  error: string | null;
  limit: number;
  threshold: number;
  fetchChurnData: () => Promise<void>;
  setLimit: (limit: number) => void;
  setThreshold: (threshold: number) => void;
}

export const useChurnStore = create<ChurnStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  limit: 10,
  threshold: 0.5,
  fetchChurnData: async () => {
    set({ loading: true, error: null });
    try {
      const { limit, threshold } = get();
      const data = await ApiService.getChurnOverview(limit, threshold);
      set({ data, loading: false });
    } catch (error) {
      console.error('Error fetching churn data:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch churn data',
        loading: false,
      });
    }
  },
  setLimit: (limit: number) => {
    set({ limit });
    get().fetchChurnData();
  },
  setThreshold: (threshold: number) => {
    set({ threshold });
    get().fetchChurnData();
  },
}));
