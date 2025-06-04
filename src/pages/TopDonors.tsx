
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Users, Trophy, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TopDonors = () => {
  // Mock data - replace with real data from Supabase
  const donors = [
    { id: 1, name: 'John Doe', email: 'john@example.com', country: 'Nepal', amount: 50000, flag: '🇳🇵' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', country: 'USA', amount: 45000, flag: '🇺🇸' },
    { id: 3, name: 'Raj Patel', email: 'raj@example.com', country: 'India', amount: 40000, flag: '🇮🇳' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Users className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Top Donors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Recognizing our generous supporters who make our mission possible.
          </p>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Donor Leaderboard</h2>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        <div className="space-y-4">
          {donors.map((donor, index) => (
            <Card key={donor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {index < 3 && <Trophy className="h-5 w-5 text-yellow-500" />}
                      <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{donor.name}</h3>
                      <p className="text-gray-600">{donor.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-2xl">{donor.flag}</span>
                      <span className="text-gray-600">{donor.country}</span>
                    </div>
                    <p className="text-xl font-bold text-red-600">NPR {donor.amount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TopDonors;
