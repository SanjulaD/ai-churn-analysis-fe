import { z } from 'zod';

// Customer Profile Schema
export const CustomerProfileSchema = z.object({
  Tenure: z.number(),
  SatisfactionScore: z.number(),
  OrderCount: z.number(),
  DaySinceLastOrder: z.number(),
  CashbackAmount: z.number(),
  Complain: z.number(),
});

// Customer Schema
export const CustomerSchema = z.object({
  customer_id: z.number(),
  churn_probability: z.number(),
  predicted_churn: z.number(),
  risk_level: z.string(),
  customer_profile: CustomerProfileSchema,
});

// Churn Distribution Schema
export const ChurnDistributionSchema = z.object({
  status: z.string(),
  churn_count: z.number(),
  non_churn_count: z.number(),
  churn_percentage: z.number(),
  non_churn_percentage: z.number(),
});

// Top Risk Customers Schema
export const TopRiskCustomersSchema = z.object({
  status: z.string(),
  summary: z.object({
    total_high_risk_customers: z.number(),
    customers_returned: z.number(),
    threshold_used: z.number(),
    average_risk_probability: z.number(),
  }),
  top_risk_customers: z.array(CustomerSchema),
});

// Model Metrics Schema
export const ModelMetricsSchema = z.object({
  status: z.string(),
  metrics: z.object({
    accuracy: z.number(),
    precision: z.number(),
    recall: z.number(),
    f1_score: z.number(),
  }),
  last_updated: z.string(),
});

// Feature Importance Schema
export const FeatureImportanceItemSchema = z.object({
  feature: z.string(),
  mean_absolute_shap_value: z.number(),
});

export const FeatureImportanceApiSchema = z.object({
  status: z.string(),
  top_features: z.array(FeatureImportanceItemSchema),
});

// RFM Schemas
export const RFMOverviewSchema = z.object({
  total_customers: z.number(),
  total_segments: z.number(),
  average_recency: z.number(),
  average_frequency: z.number(),
  average_monetary: z.number(),
  average_satisfaction: z.number(),
});

export const RFMSegmentDetailSchema = z.object({
  'RFM Segment': z.string(),
  'RFM Segment Score': z.number(),
  n_customer: z.number(),
  mean_recency: z.number(),
  min_recency: z.number(),
  max_recency: z.number(),
  mean_freq: z.number(),
  min_freq: z.number(),
  max_freq: z.number(),
  mean_monetary: z.number(),
  min_monetary: z.number(),
  max_monetary: z.number(),
  most_payment_type: z.string(),
  avg_review_score: z.number(),
  most_product_buy: z.string(),
});

export const RFMSegmentDistributionSchema = z.object({
  'RFM Segment': z.string(),
  count: z.number(),
});

export const RFMPaymentTypeSchema = z.object({
  'RFM Segment': z.string(),
  most_payment_type: z.string(),
});

export const RFMProductSchema = z.object({
  'RFM Segment': z.string(),
  most_product_buy: z.string(),
});

export const RFMReviewScoreSchema = z.object({
  'RFM Segment': z.string(),
  avg_review_score: z.number(),
});

export type ChurnDistributionResponse = z.infer<typeof ChurnDistributionSchema>;
export type TopRiskCustomersResponse = z.infer<typeof TopRiskCustomersSchema>;
export type ModelMetricsResponse = z.infer<typeof ModelMetricsSchema>;
export type FeatureImportanceApiResponse = z.infer<typeof FeatureImportanceApiSchema>;
export type RFMOverview = z.infer<typeof RFMOverviewSchema>;
export type RFMSegmentDetail = z.infer<typeof RFMSegmentDetailSchema>;
export type RFMSegmentDistribution = z.infer<typeof RFMSegmentDistributionSchema>;
export type RFMPaymentType = z.infer<typeof RFMPaymentTypeSchema>;
export type RFMProduct = z.infer<typeof RFMProductSchema>;
export type RFMReviewScore = z.infer<typeof RFMReviewScoreSchema>;
