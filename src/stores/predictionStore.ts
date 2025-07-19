import { create } from 'zustand';

import { API_ENDPOINTS } from '@/contants/api';

interface PredictionResult {
  prediction: number | undefined;
  probability: number | undefined;
  top_shap_features: Record<string, number>;
  top_shap_explanations: Record<string, string>;
}

interface PredictionData {
  Tenure: number;
  PreferredLoginDevice: string;
  CityTier: number;
  WarehouseToHome: number;
  PreferredPaymentMode: string;
  Gender: string;
  HourSpendOnApp: number;
  NumberOfDeviceRegistered: number;
  PreferedOrderCat: string;
  SatisfactionScore: number;
  MaritalStatus: string;
  NumberOfAddress: number;
  Complain: number;
  OrderAmountHikeFromlastYear: number;
  CouponUsed: number;
  OrderCount: number;
  DaySinceLastOrder: number;
  CashbackAmount: number;
}

interface PredictionState {
  prediction: PredictionResult | null;
  isLoading: boolean;
  error: string | null;
  fetchPrediction: (data: PredictionData) => Promise<void>;
  clearPrediction: () => void;
}

export const usePredictionStore = create<PredictionState>(set => ({
  prediction: null,
  isLoading: false,
  error: null,

  fetchPrediction: async (data: PredictionData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(API_ENDPOINTS.CUSTOMER_PREDICT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      set({ prediction: result, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  clearPrediction: () => {
    set({ prediction: null, error: null });
  },
}));
