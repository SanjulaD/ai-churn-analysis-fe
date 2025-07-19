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

export const churnPredictionSchema = z.object({
  Tenure: z.number().min(0, 'Tenure must be positive'),
  PreferredLoginDevice: z.string().min(1, 'Please select a login device'),
  CityTier: z.number().int().min(1).max(3, 'City tier must be 1, 2, or 3'),
  WarehouseToHome: z.number().min(0, 'Distance must be positive'),
  PreferredPaymentMode: z.string().min(1, 'Please select a payment mode'),
  Gender: z.string().min(1, 'Please select gender'),
  HourSpendOnApp: z.number().min(0, 'Hours must be positive'),
  NumberOfDeviceRegistered: z.number().int().min(0, 'Number of devices must be positive'),
  PreferedOrderCat: z.string().min(1, 'Please select order category'),
  SatisfactionScore: z.number().int().min(1).max(5, 'Score must be between 1-5'),
  MaritalStatus: z.string().min(1, 'Please select marital status'),
  NumberOfAddress: z.number().int().min(0, 'Number of addresses must be positive'),
  Complain: z.number().int().min(0).max(1, 'Complain must be 0 or 1'),
  OrderAmountHikeFromlastYear: z.number(),
  CouponUsed: z.number().min(0, 'Coupon used must be positive'),
  OrderCount: z.number().min(0, 'Order count must be positive'),
  DaySinceLastOrder: z.number().min(0, 'Days must be positive'),
  CashbackAmount: z.number().min(0, 'Cashback amount must be positive'),
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
export type ChurnPredictionData = z.infer<typeof churnPredictionSchema>;
