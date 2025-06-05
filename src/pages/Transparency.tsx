
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TrendingUp, DollarSign, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Transparency = () => {
  // Fetch transparency data
  const { data: stats } = useQuery({
    queryKey: ['transparency-stats'],
    queryFn: async () => {
      const [donationsResult, transactionsResult, usersResult] = await Promise.all([
        supabase.from('donations').select('amount, status'),
        supabase.from('transactions').select('amount, type, description, created_at'),
        supabase.from('user_donation_stats').select('total_donated')
      ]);

      const verifiedDonations = donationsResult.data?.filter(d => d.status === 'verified') || [];
      const totalDonations = verifiedDonations.reduce((sum, d) => sum + Number(d.amount), 0);
      
      const expenses = transactionsResult.data?.filter(t => t.type === 'expense') || [];
      const totalExpenses = expenses.reduce((sum, t) => sum + Number(t.amount), 0);
      
      const currentBalance = totalDonations - totalExpenses;
      const peopleHelped = Math.floor(totalExpenses / 300); // Estimate based on average help cost

      const recentTransactions = transactionsResult.data?.slice(0, 5) || [];

      return {
        totalDonations,
        totalExpenses,
        currentBalance,
        peopleHelped,
        recentTransactions
      };
    }
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <TrendingUp className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Transparency Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete transparency in all our operations. See exactly how donations are collected and distributed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold">NPR {stats?.totalDonations?.toLocaleString() || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Funds Distributed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold">NPR {stats?.totalExpenses?.toLocaleString() || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-red-600" />
                <span className="text-2xl font-bold">NPR {stats?.currentBalance?.toLocaleString() || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">People Helped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold">{stats?.peopleHelped || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentTransactions?.map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}NPR {Number(transaction.amount).toLocaleString()}
                    </span>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-8">No recent transactions</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fund Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Emergency Relief</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-sm">60%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Education Support</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                    <span className="text-sm">25%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Medical Aid</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '15%'}}></div>
                    </div>
                    <span className="text-sm">15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Transparency;
