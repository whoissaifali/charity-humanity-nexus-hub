
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { HelpCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RequestHelp = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Request Help</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            If you know someone in need or need help yourself, submit a request and we'll do our best to assist.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Help Request Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requestor-name">Your Name</Label>
                <Input id="requestor-name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requestor-email">Your Email</Label>
                <Input id="requestor-email" type="email" placeholder="Enter your email" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="beneficiary-name">Person/Family in Need</Label>
                <Input id="beneficiary-name" placeholder="Name of person needing help" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, District" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="help-type">Type of Help Needed</Label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Select help type</option>
                <option value="money">Financial Support</option>
                <option value="food">Food & Groceries</option>
                <option value="clothes">Clothing</option>
                <option value="medical">Medical Assistance</option>
                <option value="education">Educational Support</option>
                <option value="shelter">Housing/Shelter</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <textarea
                id="description"
                className="w-full p-3 border border-gray-300 rounded-md h-32"
                placeholder="Please provide details about the situation and what kind of help is needed..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="low">Low - Can wait a few weeks</option>
                <option value="medium">Medium - Needed within a week</option>
                <option value="high">High - Urgent, needed within days</option>
                <option value="critical">Critical - Emergency situation</option>
              </select>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Submit Help Request</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default RequestHelp;
