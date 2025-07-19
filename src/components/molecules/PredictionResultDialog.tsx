import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PredictionResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  predictionResult: {
    prediction: number | undefined;
    probability: number | undefined;
    top_shap_features: Record<string, number>;
    top_shap_explanations: Record<string, string>;
  };
}

export function PredictionResultDialog({
  isOpen,
  onClose,
  predictionResult,
}: PredictionResultDialogProps) {
  const { prediction, probability, top_shap_features, top_shap_explanations } = predictionResult;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl mx-auto overflow-y-auto"
        style={{
          maxHeight: '80vh',
        }}
      >
        <DialogHeader>
          <DialogTitle>Prediction Result</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Prediction and Probability */}
          <Card>
            <CardHeader>
              <CardTitle>Prediction Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Prediction:</strong>{' '}
                {prediction === 1 ? 'Likely to Churn' : 'Not Likely to Churn'}
              </p>
              {probability !== undefined ? (
                <p>
                  <strong>Probability:</strong> {(probability * 100).toFixed(2)}%
                </p>
              ) : (
                <p>
                  <strong>Probability:</strong> Not available
                </p>
              )}
            </CardContent>
          </Card>

          {/* Top SHAP Features */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributing Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {Object.entries(top_shap_features).map(([feature, shapValue]) => (
                  <li key={feature}>
                    <strong>{feature.replace(/^(iterative_imputer__|remainder__)/, '')}:</strong>{' '}
                    {shapValue.toFixed(3)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* SHAP Explanations */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Explanations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {Object.entries(top_shap_explanations).map(([feature, explanation]) => (
                  <li key={feature}>
                    <strong>{feature.replace(/^(iterative_imputer__|remainder__)/, '')}:</strong>
                    <p>{explanation}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
