import { API_ENDPOINTS } from '@/contants/api';

import { ApiService } from '../api';

// Mock fetch
global.fetch = jest.fn();

describe('ApiService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getChurnOverview', () => {
    it('fetches churn overview successfully', async () => {
      const mockDistributionResponse = {
        status: 'success',
        churn_count: 1000,
        non_churn_count: 4000,
        churn_percentage: 20,
        non_churn_percentage: 80,
      };

      const mockCustomersResponse = {
        status: 'success',
        summary: {
          total_high_risk_customers: 10,
          customers_returned: 5,
          threshold_used: 0.5,
          average_risk_probability: 0.75,
        },
        top_risk_customers: [],
      };

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockDistributionResponse),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockCustomersResponse),
        });

      const result = await ApiService.getChurnOverview();

      expect(fetch).toHaveBeenCalledWith(API_ENDPOINTS.CHURN_OVERVIEW);
      expect(fetch).toHaveBeenCalledWith(
        `${API_ENDPOINTS.TOP_RISK_CUSTOMERS}?limit=10&threshold=0.5`
      );
      expect(result.churnRate).toBe(20);
      expect(result.pieData).toHaveLength(2);
    });

    it('handles API error gracefully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(ApiService.getChurnOverview()).rejects.toThrow('Failed to fetch churn data');
    });
  });
});
