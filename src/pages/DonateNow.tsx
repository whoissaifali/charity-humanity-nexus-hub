
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Heart, CreditCard, QrCode, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DonationForm from '@/components/DonationForm';

const DonateNow = () => {
  const [activeTab, setActiveTab] = useState('methods');

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

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'bank': return <CreditCard className="h-5 w-5" />;
      case 'esewa': case 'khalti': case 'upi': return <QrCode className="h-5 w-5" />;
      default: return <CreditCard className="h-5 w-5" />;
    }
  };

  const renderAccountDetails = (method: any) => {
    const details = method.account_details;
    
    switch (method.method_type) {
      case 'bank':
        return (
          <div className="space-y-2 text-sm">
            <p><strong>Bank:</strong> {details.bank_name}</p>
            <p><strong>Account Name:</strong> {details.account_name}</p>
            <p><strong>Account Number:</strong> {details.account_number}</p>
            {details.swift_code && <p><strong>SWIFT:</strong> {details.swift_code}</p>}
          </div>
        );
      case 'esewa':
        return (
          <div className="space-y-2 text-sm">
            <p><strong>eSewa ID:</strong> {details.phone}</p>
            {details.merchant_code && <p><strong>Merchant Code:</strong> {details.merchant_code}</p>}
          </div>
        );
      case 'khalti':
        return (
          <div className="space-y-2 text-sm">
            <p><strong>Khalti ID:</strong> {details.phone}</p>
            {details.merchant_id && <p><strong>Merchant ID:</strong> {details.merchant_id}</p>}
          </div>
        );
      case 'upi':
        return (
          <div className="space-y-2 text-sm">
            <p><strong>UPI ID:</strong> {details.upi_id}</p>
            <p><strong>Name:</strong> {details.merchant_name}</p>
          </div>
        );
      default:
        return <p className="text-sm">Contact us for payment details</p>;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Donation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every contribution makes a difference. Choose your preferred method below.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="form">Submit Donation</TabsTrigger>
          </TabsList>

          <TabsContent value="methods" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paymentMethods?.map((method) => (
                <Card key={method.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {getMethodIcon(method.method_type)}
                      <span>{method.method_name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {renderAccountDetails(method)}
                    </div>
                    {method.qr_code_url && (
                      <div className="text-center">
                        <img 
                          src={method.qr_code_url} 
                          alt={`${method.method_name} QR Code`}
                          className="w-32 h-32 mx-auto border rounded"
                        />
                        <p className="text-sm text-gray-600 mt-2">Scan QR Code to Pay</p>
                      </div>
                    )}
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(method.account_details, null, 2));
                      }}
                    >
                      Copy Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="h-6 w-6 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900">Important Instructions</h3>
                  <div className="text-blue-800 mt-2 space-y-1">
                    <p>1. Make your payment using any of the methods above</p>
                    <p>2. Take a screenshot or save the payment receipt</p>
                    <p>3. Fill out the donation form in the next tab</p>
                    <p>4. Upload your receipt for verification</p>
                    <p>5. You'll receive confirmation once verified</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="form" className="mt-8">
            <DonationForm onSuccess={() => setActiveTab('methods')} />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default DonateNow;
