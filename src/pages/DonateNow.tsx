
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Heart, CreditCard, QrCode, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DonateNow = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Donation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every contribution makes a difference. Choose your preferred donation method below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bank Transfer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Bank Transfer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Bank Details</h4>
                <p className="text-sm text-gray-600">
                  Bank: Nepal Investment Bank<br/>
                  Account: CharityHumanity Nepal<br/>
                  A/C No: 01234567890<br/>
                  SWIFT: NIBLNPKT
                </p>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Copy Bank Details
              </Button>
            </CardContent>
          </Card>

          {/* Digital Wallets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="h-5 w-5" />
                <span>Digital Wallets</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full">eSewa QR</Button>
                <Button variant="outline" className="w-full">Khalti QR</Button>
                <Button variant="outline" className="w-full">UPI (India)</Button>
              </div>
            </CardContent>
          </Card>

          {/* Upload Receipt */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Receipt</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                After making a donation, upload your payment receipt for verification.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Upload Receipt
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DonateNow;
