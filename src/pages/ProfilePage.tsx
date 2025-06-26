
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Shield, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const ProfilePage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  {user.isGuest ? 'Guest User Profile' : 'Your account information'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {user.isGuest && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <Shield className="h-5 w-5" />
                      <span className="font-medium">Guest Account</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      You are browsing as a guest. Create an account to save your preferences and order history.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Full Name</p>
                      <p className="text-muted-foreground">
                        {user.lastName ? `${user.name} ${user.lastName}` : user.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex gap-4">
                    {user.isGuest && (
                      <Button onClick={() => navigate('/auth')} className="flex-1">
                        Create Account
                      </Button>
                    )}
                    <Button 
                      onClick={handleLogout} 
                      variant="outline" 
                      className={user.isGuest ? "flex-1" : "w-full"}
                    >
                      {user.isGuest ? 'Switch Account' : 'Logout'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  Order History
                </CardTitle>
                <CardDescription>
                  View your confirmed orders and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders found</p>
                    <Button onClick={() => navigate('/catalog')} className="mt-4">
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {user.orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>{formatDate(order.date)}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <div key={index} className="text-sm">
                                  {item.name} x{item.quantity}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{formatPrice(order.total)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
