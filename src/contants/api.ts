// Base URLs
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const MODEL_BASE_URL = `${BASE_URL}/model`;
export const SHAP_BASE_URL = `${BASE_URL}/shap`;
export const FEATURE_IMPORTANCE_BASE_URL = `${SHAP_BASE_URL}/feature-importance`;
export const RFM_BASE_URL = `${BASE_URL}/rfm`;

// API Endpoints
export const API_ENDPOINTS = {
  CUSTOMER_PREDICT: `${MODEL_BASE_URL}/predict`,
  CHURN_OVERVIEW: `${MODEL_BASE_URL}/churn-distribution`,
  TOP_RISK_CUSTOMERS: `${MODEL_BASE_URL}/top-risk-customers`,
  MODEL_PERFORMANCE: `${MODEL_BASE_URL}/metrics`,
  MODEL_UPDATE: `${MODEL_BASE_URL}/update-metrics`,
  FEATURE_IMPORTANCE: `${FEATURE_IMPORTANCE_BASE_URL}`,
  FEATURE_IMPORTANCE_DOWNLOAD: `${FEATURE_IMPORTANCE_BASE_URL}/csv`,
  FEATURE_IMPORTANCE_SUMMARY: `${FEATURE_IMPORTANCE_BASE_URL}/summary?top_n=10`,
  RFM_OVERVIEW: `${RFM_BASE_URL}/overview`,
  RFM_SEGMENTS: `${RFM_BASE_URL}/segments`,
  RFM_SEGMENT_DETAIL: `${RFM_BASE_URL}/segment`,
  RFM_DISTRIBUTION: `${RFM_BASE_URL}/segment-distribution`,
  RFM_PAYMENT_TYPES: `${RFM_BASE_URL}/segment-payment-types`,
  RFM_PRODUCTS: `${RFM_BASE_URL}/segment-top-products`,
  RFM_REVIEW_SCORES: `${RFM_BASE_URL}/segment-review-score`,
} as const;
