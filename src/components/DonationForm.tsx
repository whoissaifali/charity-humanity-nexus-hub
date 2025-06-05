
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

interface DonationFormProps {
  onSuccess?: () => void;
}

const DonationForm = ({ onSuccess }: DonationFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    donor_name: '',
    donor_email: user?.email || '',
    donor_country: '',
    payment_method: '',
    notes: ''
  });

  // Fetch payment methods
  const { data: paymentMethods } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.donor_name || !formData.payment_method) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('donations')
        .insert({
          ...formData,
          amount: parseFloat(formData.amount),
          user_id: user?.id || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Donation Submitted",
        description: "Your donation has been submitted and is pending verification. You will be notified once it's processed."
      });

      setFormData({
        amount: '',
        donor_name: '',
        donor_email: user?.email || '',
        donor_country: '',
        payment_method: '',
        notes: ''
      });

      onSuccess?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Submit Donation</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="donor_name">Full Name *</Label>
              <Input
                id="donor_name"
                value={formData.donor_name}
                onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="donor_email">Email *</Label>
              <Input
                id="donor_email"
                type="email"
                value={formData.donor_email}
                onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount (NPR) *</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="donor_country">Country *</Label>
              <Input
                id="donor_country"
                value={formData.donor_country}
                onChange={(e) => setFormData({ ...formData, donor_country: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="payment_method">Payment Method *</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, payment_method: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods?.map((method) => (
                  <SelectItem key={method.id} value={method.method_name}>
                    {method.method_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional information about your donation..."
              rows={3}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Next Steps</h4>
                <p className="text-sm text-blue-700 mt-1">
                  After submitting this form, please make your payment using the selected method and 
                  upload your payment receipt for verification.
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700">
            {loading ? "Submitting..." : "Submit Donation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
