
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Upload, QrCode } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const PaymentMethodsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingMethod, setEditingMethod] = useState<any>(null);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: paymentMethods, refetch } = useQuery({
    queryKey: ['admin-payment-methods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data;
    }
  });

  const uploadQRCode = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `qr-${Date.now()}.${fileExt}`;
      const filePath = `qr-codes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('qr-codes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('qr-codes')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading QR code:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload QR code",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const updatePaymentMethod = async (id: string, updates: any) => {
    try {
      let qrUrl = updates.qr_code_url;
      
      if (qrFile) {
        qrUrl = await uploadQRCode(qrFile);
        if (!qrUrl) return;
      }

      const { error } = await supabase
        .from('payment_methods')
        .update({ ...updates, qr_code_url: qrUrl })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Payment method updated successfully"
      });

      setEditingMethod(null);
      setQrFile(null);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const toggleMethodStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('payment_methods')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Payment method ${!isActive ? 'activated' : 'deactivated'}`
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <QrCode className="h-5 w-5" />
          <span>Payment Methods Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>QR Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentMethods?.map((method) => (
              <TableRow key={method.id}>
                <TableCell className="font-medium">{method.method_name}</TableCell>
                <TableCell>{method.method_type}</TableCell>
                <TableCell>
                  {method.qr_code_url ? (
                    <img 
                      src={method.qr_code_url} 
                      alt="QR Code" 
                      className="w-12 h-12 object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No QR Code</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    method.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {method.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingMethod(method)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Payment Method</DialogTitle>
                        </DialogHeader>
                        {editingMethod && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="method_name">Method Name</Label>
                              <Input
                                id="method_name"
                                value={editingMethod.method_name}
                                onChange={(e) => setEditingMethod({
                                  ...editingMethod,
                                  method_name: e.target.value
                                })}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="qr_upload">Upload New QR Code</Label>
                              <Input
                                id="qr_upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) setQrFile(file);
                                }}
                              />
                              {qrFile && (
                                <p className="text-sm text-green-600 mt-1">
                                  ✓ {qrFile.name} selected
                                </p>
                              )}
                            </div>

                            {editingMethod.qr_code_url && (
                              <div>
                                <Label>Current QR Code</Label>
                                <img 
                                  src={editingMethod.qr_code_url} 
                                  alt="Current QR" 
                                  className="w-32 h-32 object-cover border rounded mt-2"
                                />
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <Button
                                onClick={() => updatePaymentMethod(editingMethod.id, editingMethod)}
                                disabled={uploading}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                {uploading ? "Uploading..." : "Save Changes"}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setEditingMethod(null);
                                  setQrFile(null);
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      size="sm"
                      variant={method.is_active ? "destructive" : "default"}
                      onClick={() => toggleMethodStatus(method.id, method.is_active)}
                    >
                      {method.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsManagement;
