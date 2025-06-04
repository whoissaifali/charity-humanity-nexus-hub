
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Users, Trophy, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Donor {
  donor_name: string;
  donor_email: string;
  donor_country: string;
  total_amount: number;
}

const TopDonors = () => {
  const { data: donors, isLoading, error } = useQuery({
    queryKey: ['top-donors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('donor_name, donor_email, donor_country, amount')
        .eq('status', 'verified')
        .order('amount', { ascending: false });
      
      if (error) throw error;

      // Group by donor and sum amounts
      const donorMap = new Map<string, Donor>();
      
      data.forEach((donation) => {
        const key = `${donation.donor_email}`;
        if (donorMap.has(key)) {
          const existing = donorMap.get(key)!;
          existing.total_amount += Number(donation.amount);
        } else {
          donorMap.set(key, {
            donor_name: donation.donor_name,
            donor_email: donation.donor_email,
            donor_country: donation.donor_country,
            total_amount: Number(donation.amount)
          });
        }
      });

      return Array.from(donorMap.values())
        .sort((a, b) => b.total_amount - a.total_amount)
        .slice(0, 10);
    }
  });

  // Fallback data for demonstration
  const fallbackDonors: Donor[] = [
    { donor_name: 'John Doe', donor_email: 'john@example.com', donor_country: 'Nepal', total_amount: 50000 },
    { donor_name: 'Jane Smith', donor_email: 'jane@example.com', donor_country: 'USA', total_amount: 45000 },
    { donor_name: 'Raj Patel', donor_email: 'raj@example.com', donor_country: 'India', total_amount: 40000 },
  ];

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'Nepal': '🇳🇵',
      'USA': '🇺🇸',
      'India': '🇮🇳',
      'UK': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺'
    };
    return flags[country] || '🌍';
  };

  const displayDonors = donors && donors.length > 0 ? donors : fallbackDonors;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading top donors...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error('Error fetching donors:', error);
  }

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
          {displayDonors.map((donor, index) => (
            <Card key={`${donor.donor_email}-${index}`} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {index < 3 && <Trophy className="h-5 w-5 text-yellow-500" />}
                      <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{donor.donor_name}</h3>
                      <p className="text-gray-600">{donor.donor_email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-2xl">{getCountryFlag(donor.donor_country)}</span>
                      <span className="text-gray-600">{donor.donor_country}</span>
                    </div>
                    <p className="text-xl font-bold text-red-600">NPR {donor.total_amount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayDonors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No verified donations yet. Be the first to support our cause!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TopDonors;
