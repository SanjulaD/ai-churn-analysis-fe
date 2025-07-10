import { z } from 'zod';

import { API_ENDPOINTS } from '@/contants/api';
import {
  ChurnDistributionSchema,
  FeatureImportanceApiSchema,
  ModelMetricsSchema,
  RFMOverviewSchema,
  RFMPaymentTypeSchema,
  RFMProductSchema,
  RFMReviewScoreSchema,
  type RFMSegmentDetail,
  RFMSegmentDetailSchema,
  RFMSegmentDistributionSchema,
  TopRiskCustomersSchema,
} from '@/schemas/apiSchemas';
import type {
  ChurnData,
  ChurnDistributionResponse,
  FeatureImportanceData,
  ModelPerformanceData,
  RFMSegmentationData,
  SegmentDeepDiveData,
  TopRiskCustomersResponse,
} from '@/types/dashboard';

export class ApiService {
  static async getChurnOverview(limit: number = 10, threshold: number = 0.5): Promise<ChurnData> {
    try {
      const [distributionResponse, customersResponse] = await Promise.all([
        fetch(API_ENDPOINTS.CHURN_OVERVIEW),
        fetch(`${API_ENDPOINTS.TOP_RISK_CUSTOMERS}?limit=${limit}&threshold=${threshold}`),
      ]);

      if (!distributionResponse.ok || !customersResponse.ok) {
        throw new Error('Failed to fetch churn data');
      }

      const distributionData = await distributionResponse.json();
      const customersData = await customersResponse.json();

      // Validate with Zod
      const validatedDistribution: ChurnDistributionResponse =
        ChurnDistributionSchema.parse(distributionData);
      const validatedCustomers: TopRiskCustomersResponse =
        TopRiskCustomersSchema.parse(customersData);

      return {
        churnRate: validatedDistribution.churn_percentage,
        pieData: [
          {
            name: 'Will Churn',
            value: validatedDistribution.churn_percentage,
            color: '#ef4444',
          },
          {
            name: 'Will Stay',
            value: validatedDistribution.non_churn_percentage,
            color: '#10b981',
          },
        ],
        topRiskCustomers: validatedCustomers.top_risk_customers,
        summary: validatedCustomers.summary,
      };
    } catch (error) {
      console.error('Error fetching churn overview:', error);
      throw error;
    }
  }

  static async getModelPerformance(): Promise<ModelPerformanceData> {
    try {
      const response = await fetch(API_ENDPOINTS.MODEL_PERFORMANCE);

      if (!response.ok) {
        throw new Error('Failed to fetch model performance');
      }

      const data = await response.json();
      const validatedData = ModelMetricsSchema.parse(data);

      return {
        metrics: [
          {
            name: 'Accuracy',
            value: `${(validatedData.metrics.accuracy * 100).toFixed(1)}%`,
            icon: 'Target',
            color: 'text-green-600',
          },
          {
            name: 'Precision',
            value: `${(validatedData.metrics.precision * 100).toFixed(1)}%`,
            icon: 'Search',
            color: 'text-blue-600',
          },
          {
            name: 'Recall',
            value: `${(validatedData.metrics.recall * 100).toFixed(1)}%`,
            icon: 'Activity',
            color: 'text-orange-600',
          },
          {
            name: 'F1-Score',
            value: `${(validatedData.metrics.f1_score * 100).toFixed(1)}%`,
            icon: 'BarChart3',
            color: 'text-purple-600',
          },
        ],
        lastUpdated: new Date(validatedData.last_updated).toLocaleString(),
      };
    } catch (error) {
      console.error('Error fetching model performance:', error);
      throw error;
    }
  }

  static async updateModel(): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.MODEL_UPDATE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update model');
      }

      const data = await response.json();
      ModelMetricsSchema.parse(data); // Validate response
    } catch (error) {
      console.error('Error updating model:', error);
      throw error;
    }
  }

  static async getFeatureImportance(): Promise<FeatureImportanceData> {
    try {
      const response = await fetch(API_ENDPOINTS.FEATURE_IMPORTANCE_SUMMARY);

      if (!response.ok) {
        throw new Error('Failed to fetch feature importance');
      }

      const data = await response.json();
      const validatedData = FeatureImportanceApiSchema.parse(data);

      return {
        features: validatedData.top_features.map(item => ({
          feature: item.feature,
          importance: item.mean_absolute_shap_value,
        })),
      };
    } catch (error) {
      console.error('Error fetching feature importance:', error);
      throw error;
    }
  }

  static async downloadFeatureImportanceCsv(): Promise<Blob> {
    try {
      const response = await fetch(API_ENDPOINTS.FEATURE_IMPORTANCE_DOWNLOAD);

      if (!response.ok) {
        throw new Error('Failed to download CSV');
      }

      return await response.blob();
    } catch (error) {
      console.error('Error downloading CSV:', error);
      throw error;
    }
  }

  static async getRFMSegmentation(): Promise<RFMSegmentationData> {
    try {
      console.log('Fetching RFM segmentation data...');
      const [overviewRes, segmentsRes, distributionRes, paymentRes, productsRes, reviewsRes] =
        await Promise.all([
          fetch(API_ENDPOINTS.RFM_OVERVIEW),
          fetch(API_ENDPOINTS.RFM_SEGMENTS),
          fetch(API_ENDPOINTS.RFM_DISTRIBUTION),
          fetch(API_ENDPOINTS.RFM_PAYMENT_TYPES),
          fetch(API_ENDPOINTS.RFM_PRODUCTS),
          fetch(API_ENDPOINTS.RFM_REVIEW_SCORES),
        ]);

      if (
        !overviewRes.ok ||
        !segmentsRes.ok ||
        !distributionRes.ok ||
        !paymentRes.ok ||
        !productsRes.ok ||
        !reviewsRes.ok
      ) {
        throw new Error('One or more RFM API calls failed');
      }

      const [overview, segments, distribution, paymentTypes, products, reviewScores] =
        await Promise.all([
          overviewRes.json(),
          segmentsRes.json(),
          distributionRes.json(),
          paymentRes.json(),
          productsRes.json(),
          reviewsRes.json(),
        ]);

      // Validate with Zod schemas
      const validatedOverview = RFMOverviewSchema.parse(overview);
      const validatedSegments = z.array(RFMSegmentDetailSchema).parse(segments);
      const validatedDistribution = z.array(RFMSegmentDistributionSchema).parse(distribution);
      const validatedPaymentTypes = z.array(RFMPaymentTypeSchema).parse(paymentTypes);
      const validatedProducts = z.array(RFMProductSchema).parse(products);
      const validatedReviewScores = z.array(RFMReviewScoreSchema).parse(reviewScores);

      const result = {
        overview: validatedOverview,
        segments: validatedSegments,
        distribution: validatedDistribution,
        paymentTypes: validatedPaymentTypes,
        products: validatedProducts,
        reviewScores: validatedReviewScores,
      };

      console.log('Validated RFM data:', result);
      return result;
    } catch (error) {
      console.error('Error fetching RFM data:', error);
      throw error;
    }
  }

  static async getRFMSegmentDetail(segmentName: string): Promise<RFMSegmentDetail> {
    try {
      console.log('Fetching segment detail for:', segmentName);
      const response = await fetch(
        `${API_ENDPOINTS.RFM_SEGMENT_DETAIL}/${encodeURIComponent(segmentName)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch segment detail: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw segment detail response:', data);

      const validatedData = RFMSegmentDetailSchema.parse(data);
      console.log('Validated segment detail:', validatedData);

      return validatedData;
    } catch (error) {
      console.error('Error fetching segment detail:', error);
      throw error;
    }
  }

  static async getSegmentDeepDive(): Promise<SegmentDeepDiveData> {
    try {
      console.log('Fetching segment deep dive data...');
      const response = await fetch(API_ENDPOINTS.SEGMENT_DEEP_DIVE);

      if (!response.ok) {
        throw new Error('Failed to fetch segment deep dive data');
      }

      const data = await response.json();
      console.log('Segment deep dive response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching segment deep dive data:', error);
      throw error;
    }
  }
}
