
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { User, TrendingUp, Heart, Award, Bell, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const UserDashboard = () => {
  const { user } = useAuth();

  // Fetch user donation stats
  const { data: userStats } = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('user_donation_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user
  });

  // Fetch user donations
  const { data: userDonations } = useQuery({
    queryKey: ['user-donations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Fetch notifications
  const { data: notifications } = useQuery({
    queryKey: ['user-notifications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .or(`user_id.eq.${user.id},user_id.is.null`)
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <User className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
            <p className="text-gray-600">You need to be signed in to view your dashboard.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getRankBadge = (rank: number | null) => {
    if (!rank) return <Badge variant="outline">Unranked</Badge>;
    if (rank === 1) return <Badge className="bg-yellow-500">🥇 #1 Top Donor</Badge>;
    if (rank === 2) return <Badge className="bg-gray-400">🥈 #2 Top Donor</Badge>;
    if (rank === 3) return <Badge className="bg-amber-600">🥉 #3 Top Donor</Badge>;
    if (rank <= 10) return <Badge className="bg-blue-600">Top 10 Donor</Badge>;
    return <Badge variant="outline">#{rank}</Badge>;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {profile?.full_name || 'User'}!
          </h1>
          <p className="text-gray-600">Track your donations and impact</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Donated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-8 w-8 text-red-600" />
                    <span className="text-2xl font-bold">
                      NPR {Number(userStats?.total_donated || 0).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Donations Count</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <span className="text-2xl font-bold">{userStats?.donation_count || 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Your Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Award className="h-8 w-8 text-purple-600" />
                    <div>{getRankBadge(userStats?.rank_position)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Donation History */}
            <Card>
              <CardHeader>
                <CardTitle>Your Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userDonations?.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">
                          NPR {Number(donation.amount).toLocaleString()}
                        </TableCell>
                        <TableCell>{donation.payment_method}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={donation.status === 'verified' ? 'default' : 'outline'}
                            className={donation.status === 'verified' ? 'bg-green-600' : ''}
                          >
                            {donation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(donation.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {(!userDonations || userDonations.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                          No donations yet. Start making a difference today!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{profile?.full_name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Country</p>
                  <p className="font-medium">{profile?.country || 'Not set'}</p>
                </div>
                {userStats?.last_donation_date && (
                  <div>
                    <p className="text-sm text-gray-600">Last Donation</p>
                    <p className="font-medium">
                      {new Date(userStats.last_donation_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Recent Updates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications?.map((notification) => (
                  <div key={notification.id} className="border-l-4 border-blue-500 pl-3 py-2">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {(!notifications || notifications.length === 0) && (
                  <p className="text-gray-500 text-sm">No recent updates</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
