
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/components/ui/use-toast';

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData extends LoginFormData {
  confirmPassword: string;
}

const AuthPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
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
      // Here we would normally connect to a backend API for authentication
      // For now, we'll just simulate a successful login
      console.log('Login data:', data);
      
      toast({
        title: "Success",
        description: "You have been logged in successfully!",
      });
      
      // In a real implementation, you'd store the auth token and redirect
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please check your credentials.",
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
      
      // Here we would normally connect to a backend API for registration
      // For now, we'll just simulate a successful registration
      console.log('Register data:', data);
      
      toast({
        title: "Success",
        description: "Your account has been created successfully!",
      });
      
      // In a real implementation, you'd store the auth token and redirect
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
