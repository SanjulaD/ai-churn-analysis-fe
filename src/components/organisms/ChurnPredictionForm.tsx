import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { type ChurnPredictionData, churnPredictionSchema } from '@/schemas/apiSchemas';
import { usePredictionStore } from '@/stores/predictionStore';

import { PredictionResultDialog } from '../molecules/PredictionResultDialog';

export function ChurnPredictionForm() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { fetchPrediction, isLoading, prediction } = usePredictionStore();
  const { toast } = useToast();

  const form = useForm<ChurnPredictionData>({
    resolver: zodResolver(churnPredictionSchema),
    defaultValues: {
      Tenure: 0,
      PreferredLoginDevice: '',
      CityTier: 1,
      WarehouseToHome: 0,
      PreferredPaymentMode: '',
      Gender: '',
      HourSpendOnApp: 0,
      NumberOfDeviceRegistered: 1,
      PreferedOrderCat: '',
      SatisfactionScore: 3,
      MaritalStatus: '',
      NumberOfAddress: 1,
      Complain: 0,
      OrderAmountHikeFromlastYear: 0,
      CouponUsed: 0,
      OrderCount: 0,
      DaySinceLastOrder: 0,
      CashbackAmount: 0,
    },
  });

  const onSubmit = async (data: ChurnPredictionData) => {
    try {
      await fetchPrediction(data);

      if (prediction && prediction.probability !== undefined) {
        setDialogOpen(true);
        toast({
          title: 'Prediction Complete',
          description: `Churn probability calculated: ${(prediction.probability * 100).toFixed(1)}%`,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Prediction data is incomplete. Please try again.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to predict churn. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full  mx-auto">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="Tenure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenure</FormLabel>
                    <Select
                      onValueChange={value => field.onChange(value === 'Yes' ? 1 : 0)}
                      defaultValue={field.value ? 'Yes' : 'No'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Tenure" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="PreferredLoginDevice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Login Device</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select device" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mobile Phone">Mobile Phone</SelectItem>
                        <SelectItem value="Computer">Computer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="CityTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City Tier</FormLabel>
                    <Select
                      onValueChange={value => field.onChange(parseInt(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Tier 1</SelectItem>
                        <SelectItem value="2">Tier 2</SelectItem>
                        <SelectItem value="3">Tier 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="WarehouseToHome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse to Home (km)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="PreferredPaymentMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Payment Mode</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Debit Card">Debit Card</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="COD">Cash on Delivery</SelectItem>
                        <SelectItem value="E Wallet">E Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="HourSpendOnApp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours Spend on App</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="NumberOfDeviceRegistered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Devices Registered</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="PreferedOrderCat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Order Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Laptop & Accessory">Laptop & Accessory</SelectItem>
                        <SelectItem value="Mobile Phone">Mobile Phone</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Grocery">Grocery</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="SatisfactionScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Satisfaction Score (1-5)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 3)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="MaritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="NumberOfAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Addresses</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Complain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Has Complaints</FormLabel>
                    <Select
                      onValueChange={value => field.onChange(parseInt(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">No</SelectItem>
                        <SelectItem value="1">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="OrderAmountHikeFromlastYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Amount Hike (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="CouponUsed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupons Used</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="OrderCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Count</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="DaySinceLastOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Days Since Last Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="CashbackAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cashback Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6">
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? 'Predicting...' : 'Predict Churn'}
              </Button>

              {prediction && (
                <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">
                        Churn Probability:{' '}
                        <span className="text-lg font-bold">
                          {prediction.probability !== undefined
                            ? (prediction.probability * 100).toFixed(1)
                            : 'N/A'}
                          %
                        </span>
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </form>
        </Form>

        <PredictionResultDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          predictionResult={{
            prediction: prediction?.prediction ?? 0,
            probability: prediction?.probability ?? 0,
            top_shap_features: prediction?.top_shap_features ?? {},
            top_shap_explanations: prediction?.top_shap_explanations ?? {},
          }}
        />
      </CardContent>
    </Card>
  );
}
