import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PaymentMethodsManagement from '@/components/PaymentMethodsManagement';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Shield, Users, DollarSign, Activity, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Check if user is admin
  const { data: userProfile } = useQuery({
    queryKey: ['admin-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Redirect to admin login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  // Fetch dashboard stats
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [donationsResult, usersResult, helpRequestsResult, transactionsResult] = await Promise.all([
        supabase.from('donations').select('amount, status'),
        supabase.from('profiles').select('id'),
        supabase.from('help_requests').select('status'),
        supabase.from('transactions').select('amount, type')
      ]);

      const totalDonations = donationsResult.data?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
      const verifiedDonations = donationsResult.data?.filter(d => d.status === 'verified').length || 0;
      const pendingDonations = donationsResult.data?.filter(d => d.status === 'pending').length || 0;
      const totalUsers = usersResult.data?.length || 0;
      const pendingRequests = helpRequestsResult.data?.filter(r => r.status === 'pending').length || 0;
      const totalExpenses = transactionsResult.data?.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0) || 0;

      return {
        totalDonations,
        verifiedDonations,
        pendingDonations,
        totalUsers,
        pendingRequests,
        totalExpenses
      };
    }
  });

  // Fetch pending donations
  const { data: pendingDonations, refetch: refetchDonations } = useQuery({
    queryKey: ['pending-donations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Verify donation
  const verifyDonation = async (donationId: string, status: 'verified' | 'rejected') => {
    const { error } = await supabase
      .from('donations')
      .update({ 
        status, 
        verified_by: user?.id,
        verified_at: new Date().toISOString()
      })
      .eq('id', donationId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: `Donation ${status} successfully`
      });
      refetchDonations();
    }
  };

  if (!user || userProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Shield className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You need admin privileges to access this page.</p>
            <Button 
              onClick={() => navigate('/admin/login')}
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Go to Admin Login
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage donations, users, and platform content</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="payments">Payment Methods</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold">{stats?.totalUsers || 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Donations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Activity className="h-8 w-8 text-orange-600" />
                    <span className="text-2xl font-bold">{stats?.pendingDonations || 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Help Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-8 w-8 text-red-600" />
                    <span className="text-2xl font-bold">{stats?.pendingRequests || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Receipt</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingDonations?.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{donation.donor_name}</p>
                            <p className="text-sm text-gray-600">{donation.donor_email}</p>
                          </div>
                        </TableCell>
                        <TableCell>NPR {Number(donation.amount).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{donation.payment_method}</Badge>
                        </TableCell>
                        <TableCell>
                          {donation.receipt_url ? (
                            <a 
                              href={donation.receipt_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View Receipt
                            </a>
                          ) : (
                            <span className="text-gray-400">No receipt</span>
                          )}
                        </TableCell>
                        <TableCell>{new Date(donation.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => verifyDonation(donation.id, 'verified')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => verifyDonation(donation.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <PaymentMethodsManagement />
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">User management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Content management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
