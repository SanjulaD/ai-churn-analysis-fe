import { create } from 'zustand';

import { ApiService } from '@/services/api';
import { type RFMSegmentationData } from '@/types/dashboard';

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
      console.log('Store: Starting RFM data fetch...');
      const data = await ApiService.getRFMSegmentation();
      console.log('Store: Successfully fetched RFM data:', data);
      set({ data, loading: false });
    } catch (error) {
      console.error('Store: Error fetching RFM data:', error);
      // Fallback to mock data when API fails
      const mockData: RFMSegmentationData = {
        overview: {
          total_customers: 5630,
          total_segments: 7,
          average_recency: 45.2,
          average_frequency: 3.8,
          average_monetary: 189.45,
          average_satisfaction: 3.2,
        },
        segments: [
          {
            'RFM Segment': 'Best',
            'RFM Segment Score': 7,
            n_customer: 176,
            mean_recency: 2.625,
            min_recency: 0,
            max_recency: 3,
            mean_freq: 8.36,
            min_freq: 4,
            max_freq: 16,
            mean_monetary: 230.92,
            min_monetary: 201,
            max_monetary: 324,
            most_payment_type: 'Debit Card',
            avg_review_score: 3.05,
            most_product_buy: 'Fashion',
          },
          {
            'RFM Segment': 'Loyal',
            'RFM Segment Score': 6,
            n_customer: 501,
            mean_recency: 15.2,
            min_recency: 5,
            max_recency: 25,
            mean_freq: 6.2,
            min_freq: 3,
            max_freq: 12,
            mean_monetary: 185.4,
            min_monetary: 120,
            max_monetary: 280,
            most_payment_type: 'Debit Card',
            avg_review_score: 2.97,
            most_product_buy: 'Laptop & Accessory',
          },
          {
            'RFM Segment': 'Big Spender',
            'RFM Segment Score': 5,
            n_customer: 712,
            mean_recency: 35.8,
            min_recency: 20,
            max_recency: 60,
            mean_freq: 4.1,
            min_freq: 2,
            max_freq: 8,
            mean_monetary: 312.85,
            min_monetary: 250,
            max_monetary: 450,
            most_payment_type: 'Debit Card',
            avg_review_score: 3.01,
            most_product_buy: 'Fashion',
          },
        ],
        distribution: [
          { 'RFM Segment': 'Best', count: 176 },
          { 'RFM Segment': 'Big Spender', count: 712 },
          { 'RFM Segment': 'Lost', count: 352 },
          { 'RFM Segment': 'Lost Potential', count: 1665 },
          { 'RFM Segment': 'Loyal', count: 501 },
          { 'RFM Segment': 'New', count: 888 },
          { 'RFM Segment': 'Promising', count: 1336 },
        ],
        paymentTypes: [
          { 'RFM Segment': 'Best', most_payment_type: 'Debit Card' },
          { 'RFM Segment': 'Big Spender', most_payment_type: 'Debit Card' },
          { 'RFM Segment': 'Lost', most_payment_type: 'Credit Card' },
          { 'RFM Segment': 'Loyal', most_payment_type: 'Debit Card' },
        ],
        products: [
          { 'RFM Segment': 'Best', most_product_buy: 'Fashion' },
          { 'RFM Segment': 'Big Spender', most_product_buy: 'Fashion' },
          { 'RFM Segment': 'Lost', most_product_buy: 'Laptop & Accessory' },
          { 'RFM Segment': 'Loyal', most_product_buy: 'Laptop & Accessory' },
        ],
        reviewScores: [
          { 'RFM Segment': 'Best', avg_review_score: 3.05 },
          { 'RFM Segment': 'Big Spender', avg_review_score: 3.01 },
          { 'RFM Segment': 'Lost', avg_review_score: 3.08 },
          { 'RFM Segment': 'Loyal', avg_review_score: 2.97 },
        ],
      };
      console.log('Store: Using mock data:', mockData);
      set({
        data: mockData,
        loading: false,
        error: 'Using mock data - API unavailable',
      });
    }
  },
}));
