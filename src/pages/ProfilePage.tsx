
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Shield } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="luxury-container">
          <div className="max-w-2xl mx-auto">
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
