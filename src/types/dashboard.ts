import { RiskLevel, PaymentMethod, SegmentType } from "./enums";
import {
  RFMOverview,
  RFMSegmentDetail,
  RFMSegmentDistribution,
  RFMPaymentType,
  RFMProduct,
  RFMReviewScore,
} from "@/schemas/apiSchemas";

export interface CustomerProfile {
  Tenure: number;
  SatisfactionScore: number;
  OrderCount: number;
  DaySinceLastOrder: number;
  CashbackAmount: number;
  Complain: number;
}

export interface Customer {
  customer_id: number;
  churn_probability: number;
  predicted_churn: number;
  risk_level: string;
  customer_profile: CustomerProfile;
}

export interface ChurnDistributionResponse {
  status: string;
  churn_count: number;
  non_churn_count: number;
  churn_percentage: number;
  non_churn_percentage: number;
}

export interface TopRiskCustomersResponse {
  status: string;
  summary: {
    total_high_risk_customers: number;
    customers_returned: number;
    threshold_used: number;
    average_risk_probability: number;
  };
  top_risk_customers: Customer[];
}

export interface ChurnData {
  churnRate: number;
  pieData: Array<{ name: string; value: number; color: string }>;
  topRiskCustomers: Customer[];
  summary?: {
    total_high_risk_customers: number;
    customers_returned: number;
    threshold_used: number;
    average_risk_probability: number;
  };
}

export interface ModelMetricsResponse {
  status: string;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
  };
  last_updated: string;
}

export interface MetricData {
  name: string;
  value: string;
  icon: string;
  color: string;
}

export interface ModelPerformanceData {
  metrics: MetricData[];
  lastUpdated: string;
}

export interface FeatureData {
  feature: string;
  importance: number;
}

export interface FeatureImportanceData {
  features: FeatureData[];
}

export interface SegmentData {
  segment: string;
  revenue: number;
  customers: number;
}

export interface RecencyData {
  segment: string;
  avgRecency: number;
}

export interface RFMSegmentationData {
  overview: RFMOverview;
  segments: RFMSegmentDetail[];
  distribution: RFMSegmentDistribution[];
  paymentTypes: RFMPaymentType[];
  products: RFMProduct[];
  reviewScores: RFMReviewScore[];
}

export interface SegmentDistribution {
  segment: string;
  count: number;
  percentage: number;
}

export interface PaymentType {
  method: PaymentMethod;
  value: number;
  color: string;
}

export interface ProductSegment {
  product: string;
  segment: SegmentType | string;
  sales: number;
}

export interface ReviewScore {
  segment: string;
  score: number;
}

export interface SegmentDeepDiveData {
  segmentDistribution: SegmentDistribution[];
  paymentTypes: PaymentType[];
  topProducts: ProductSegment[];
  reviewScores: ReviewScore[];
}
