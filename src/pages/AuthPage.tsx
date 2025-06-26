
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
  name: string; 
  lastName: string; 
}

const AuthPage = () => {
  const { t } = useLanguage();
  const { login, register, loginAsGuest, isAuthenticated } = useAuth();
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
      name: '',
      lastName: '',
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
      if (data.password !== data.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      const success = await register(data.email, data.password, data.name, data.lastName);
      
      if (success) {
        toast({
          title: "Success",
          description: "Account created successfully! Please login.",
        });
        // Switch to login tab after successful registration
        const loginTab = document.querySelector('[value="login"]') as HTMLElement;
        loginTab?.click();
      } else {
        toast({
          title: "Error",
          description: "User already exists or registration failed.",
          variant: "destructive",
        });
      }
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

  const handleGuestLogin = () => {
    loginAsGuest();
    toast({
      title: "Success",
      description: "Logged in as guest!",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="luxury-container">
          <div className="max-w-md mx-auto">
            {/* Guest Login Button */}
            <div className="mb-6 text-center">
              <Button 
                onClick={handleGuestLogin}
                variant="outline" 
                className="w-full mb-4"
              >
                Continue as Guest
              </Button>
              <p className="text-sm text-muted-foreground">Or create an account / login below</p>
            </div>

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
                          rules={{
                            required: "Email is required",
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Invalid email address",
                            },
                          }}
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
                          rules={{
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          }}
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
                          name="name"
                          rules={{
                            required: "First name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="First Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="lastName"
                          rules={{
                            required: "Last name is required",
                            minLength: {
                              value: 2,
                              message: "Last name must be at least 2 characters",
                            },
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Last Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="email"
                          rules={{
                            required: "Email is required",
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Invalid email address",
                            },
                          }}
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
                          rules={{
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          }}
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
                          rules={{
                            required: "Please confirm your password",
                            validate: (value) => {
                              const password = registerForm.getValues('password');
                              return value === password || "Passwords do not match";
                            },
                          }}
                          render={({ field }) => {
                            const password = registerForm.watch('password');
                            const confirmPassword = field.value;
                            const isMatched = password === confirmPassword && confirmPassword !== '';
                            const hasError = confirmPassword !== '' && password !== confirmPassword;

                            return (
                              <FormItem>
                                <FormLabel>{t('confirm_password')}</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="password" 
                                    {...field} 
                                    className={`${
                                      isMatched ? 'border-green-500 bg-green-50' : 
                                      hasError ? 'border-red-500 bg-red-50' : ''
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
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
