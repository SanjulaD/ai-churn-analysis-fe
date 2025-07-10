import { RiskBadge } from '@/components/atoms/RiskBadge';
import { Progress } from '@/components/ui/progress';
import type { Customer } from '@/types/dashboard';

interface CustomerRiskItemProps {
  customer: Customer;
}

export function CustomerRiskItem({ customer }: CustomerRiskItemProps) {
  const probabilityPercentage = Math.round(customer.churn_probability * 100);

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 md:gap-3 mb-2">
          <span className="font-medium text-sm md:text-base">#{customer.customer_id}</span>
          <RiskBadge risk={customer.risk_level} />
        </div>
        <div className="grid grid-cols-2 gap-1 md:gap-2 text-xs md:text-sm text-muted-foreground mb-3">
          <span>Tenure: {customer.customer_profile.Tenure} months</span>
          <span>Satisfaction: {customer.customer_profile.SatisfactionScore}/5</span>
          <span>Orders: {customer.customer_profile.OrderCount}</span>
          <span>Cashback: ${customer.customer_profile.CashbackAmount}</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={probabilityPercentage} className="flex-1" />
          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
            {probabilityPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
