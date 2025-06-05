
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, CreditCard, Image as ImageIcon } from 'lucide-react';
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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
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

  const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `payment-receipts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('receipts')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload receipt image",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

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
      let receiptUrl = null;
      
      if (receiptImage) {
        receiptUrl = await handleImageUpload(receiptImage);
        if (!receiptUrl) {
          setLoading(false);
          return;
        }
      }

      const { error } = await supabase
        .from('donations')
        .insert({
          ...formData,
          amount: parseFloat(formData.amount),
          user_id: user?.id || null,
          status: 'pending',
          receipt_url: receiptUrl
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
      setReceiptImage(null);

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
            <Label htmlFor="receipt">Payment Receipt *</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="receipt-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload payment receipt image
                    </span>
                    <input
                      id="receipt-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setReceiptImage(file);
                        }
                      }}
                    />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {receiptImage && (
                <div className="mt-4 text-center">
                  <p className="text-sm font-medium text-green-600">
                    ✓ {receiptImage.name} selected
                  </p>
                </div>
              )}
            </div>
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
                <h4 className="font-medium text-blue-900">Upload Instructions</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Please upload a clear image of your payment receipt/screenshot for verification. 
                  This helps us confirm your donation and process it faster.
                </p>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading || uploadingImage || !receiptImage} 
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {loading ? "Submitting..." : uploadingImage ? "Uploading Receipt..." : "Submit Donation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
