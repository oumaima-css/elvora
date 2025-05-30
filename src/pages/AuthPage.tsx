
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData extends LoginFormData {
  confirmPassword: string;
}

const AuthPage = () => {
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Login form setup
  const loginForm = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Register form setup
  const registerForm = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        toast({
          title: "Success",
          description: "You have been logged in successfully!",
        });
        navigate('/');
      } else {
        toast({
          title: "Error",
          description: "Incorrect email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Check if passwords match
      if (data.password !== data.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }
      
      // For now, just show a message that registration is not implemented
      toast({
        title: "Info",
        description: "Registration is not available yet. Please use the login form.",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="luxury-container">
          <div className="max-w-md mx-auto">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">{t('login')}</TabsTrigger>
                <TabsTrigger value="register">{t('register')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('login_to_account')}</CardTitle>
                    <CardDescription>Enter your email and password to access your account.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('email')}</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('password')}</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? 'Loading...' : t('login')}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('create_account')}</CardTitle>
                    <CardDescription>Enter your details to create a new account.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('email')}</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('password')}</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('confirm_password')}</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? 'Loading...' : t('register')}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
