import { create } from 'zustand';

import { ApiService } from '@/services/api';
interface ChurnPredictionById {
  customer_id: number;
  estimated_churn_month: number;
  expected_loss: number;
  shap_top_factors: Record<string, string>;
}

interface CustomerChurnState {
  prediction: ChurnPredictionById | null;
  isLoading: boolean;
  error: string | null;
  fetchChurnByCustomerId: (customerId: number) => Promise<void>;
  clearPrediction: () => void;
}

export const useCustomerChurnStore = create<CustomerChurnState>(set => ({
  prediction: null,
  isLoading: false,
  error: null,

  fetchChurnByCustomerId: async (customerId: number) => {
    set({ isLoading: true, error: null });

    try {
      const data = await ApiService.fetchChurnByCustomerId(customerId); // Use ApiService
      set({ prediction: data, isLoading: false });
    } catch (error: unknown) {
        if (error instanceof Error) {
            set({ error: error.message, isLoading: false });
        } else {
            set({ error: 'An unexpected error occurred', isLoading: false });
        }
    }
  },

  clearPrediction: () => set({ prediction: null, error: null }),
}));
