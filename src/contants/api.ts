
export const API_ENDPOINTS = {
    CHURN_OVERVIEW: 'http://127.0.0.1:8000/model/churn-distribution',
    TOP_RISK_CUSTOMERS: 'http://127.0.0.1:8000/model/top-risk-customers',
    MODEL_PERFORMANCE: 'http://127.0.0.1:8000/model/metrics',
    MODEL_UPDATE: 'http://127.0.0.1:8000/model/update-metrics',
    FEATURE_IMPORTANCE: '/api/feature-importance',
    FEATURE_IMPORTANCE_DOWNLOAD: '/api/feature-importance/download',
    FEATURE_IMPORTANCE_SUMMARY: '/shap/feature-importance/summary',
    RFM_OVERVIEW: 'http://127.0.0.1:8000/rfm/overview',
    RFM_SEGMENTS: 'http://127.0.0.1:8000/rfm/segments',
    RFM_SEGMENT_DETAIL: 'http://127.0.0.1:8000/rfm/segment',
    RFM_DISTRIBUTION: 'http://127.0.0.1:8000/rfm/segment-distribution',
    RFM_PAYMENT_TYPES: 'http://127.0.0.1:8000/rfm/segment-payment-types',
    RFM_PRODUCTS: 'http://127.0.0.1:8000/rfm/segment-top-products',
    RFM_REVIEW_SCORES: 'http://127.0.0.1:8000/rfm/segment-review-score',
    SEGMENT_DEEP_DIVE: '/api/segment-deep-dive'
} as const;