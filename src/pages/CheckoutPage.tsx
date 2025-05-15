import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice, calculateDiscountedPrice, VALID_DISCOUNT_CODES, discountCodeTranslations } from '@/lib/utils';
import { toast } from 'sonner';
import { CreditCard, CreditCardIcon, Wallet, User, Phone, MapPin, Building, Flag, Tag } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Create a schema for form validation
const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State/Province is required" }),
  postalCode: z.string().min(3, { message: "Postal code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
    }
  });
  
  const processPayment = () => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        // Generate a mock order ID
        const orderId = Math.random().toString(36).substr(2, 9);
        resolve(orderId);
      }, 1500);
    });
  };
  
  const onSubmit = async (data: CheckoutFormValues) => {
    setIsProcessing(true);
    
    try {
      // Process the payment (this would be replaced with Stripe)
      const orderId = await processPayment();
      
      // Calculate the final amount with discount
      const subtotal = getTotalPrice();
      const total = appliedDiscount !== null 
        ? calculateDiscountedPrice(subtotal, appliedDiscount) 
        : subtotal;
      
      // Clear the cart and redirect to confirmation page with all order details
      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderId,
          customerInfo: data,
          total: total,
          originalTotal: subtotal,
          discountPercent: appliedDiscount,
          items: items.length
        } 
      });
      
      // Success message
      toast.success(t('Order placed successfully!'));
    } catch (error) {
      toast.error(t('Payment processing failed. Please try again.'));
    } finally {
      setIsProcessing(false);
    }
  };
  
  const applyDiscountCode = () => {
    if (!discountCode) return;
    
    if (discountCode in VALID_DISCOUNT_CODES) {
      const discountValue = VALID_DISCOUNT_CODES[discountCode as keyof typeof VALID_DISCOUNT_CODES];
      setAppliedDiscount(discountValue);
      toast.success(discountCodeTranslations[language].discount_applied);
    } else {
      toast.error(discountCodeTranslations[language].invalid_code);
    }
  };
  
  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    toast.info(discountCodeTranslations[language].discount_removed);
  };
  
  // Calculate the final price
  const subtotal = getTotalPrice();
  const taxAmount = Math.round(subtotal * 0.1);
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount / 100) : 0;
  const finalTotal = subtotal + taxAmount - discountAmount;
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-medium mb-4">{t('Your cart is empty')}</h1>
            <p className="text-muted-foreground mb-6">{t('Add some items to your cart before proceeding to checkout.')}</p>
            <Button onClick={() => navigate('/')}>{t('Continue Shopping')}</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="luxury-container py-8">
          <h1 className="text-3xl font-serif font-medium mb-8">{t('Checkout')}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {/* Customer Information */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
                    <h2 className="text-xl font-serif font-medium mb-4">
                      <User className="inline mr-2" size={20} />
                      {t('Customer Information')}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('Full Name')}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('Email Address')}</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Phone className="inline mr-2" size={16} />
                            {t('Phone Number')}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Shipping Information */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
                    <h2 className="text-xl font-serif font-medium mb-4">
                      <MapPin className="inline mr-2" size={20} />
                      {t('Shipping Information')}
                    </h2>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>{t('Street Address')}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Building className="inline mr-2" size={16} />
                              {t('City')}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('State/Province')}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('Postal Code')}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>
                            <Flag className="inline mr-2" size={16} />
                            {t('Country')}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Payment Method */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
                    <h2 className="text-xl font-serif font-medium mb-4">{t('Payment Method')}</h2>
                    
                    <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod} value={paymentMethod}>
                      <TabsList className="mb-4 grid grid-cols-3 w-full">
                        <TabsTrigger value="credit-card" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span className="hidden sm:inline">{t('Credit Card')}</span>
                        </TabsTrigger>
                        <TabsTrigger value="paypal" className="flex items-center gap-2">
                          <CreditCardIcon className="h-4 w-4" />
                          <span className="hidden sm:inline">PayPal</span>
                        </TabsTrigger>
                        <TabsTrigger value="other" className="flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          <span className="hidden sm:inline">{t('Other')}</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="credit-card">
                        <div className="mb-4">
                          <Label htmlFor="card-number">{t('Card Number')}</Label>
                          <Input 
                            id="card-number" 
                            placeholder="1234 5678 9012 3456" 
                            required 
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor="expiry">{t('Expiry Date')}</Label>
                            <Input 
                              id="expiry" 
                              placeholder="MM/YY" 
                              required 
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input 
                              id="cvc" 
                              placeholder="123" 
                              required 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="name-on-card">{t('Name on Card')}</Label>
                          <Input 
                            id="name-on-card" 
                            placeholder="John Doe" 
                            required 
                          />
                        </div>

                        <div className="flex flex-wrap gap-3 mt-4">
                          <div className="border rounded-md p-2 w-12 h-8 flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                                 alt="Visa" className="max-h-full max-w-full" />
                          </div>
                          <div className="border rounded-md p-2 w-12 h-8 flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                                 alt="Mastercard" className="max-h-full max-w-full" />
                          </div>
                          <div className="border rounded-md p-2 w-12 h-8 flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" 
                                 alt="American Express" className="max-h-full max-w-full" />
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="paypal">
                        <div className="text-center py-6">
                          <p className="text-muted-foreground mb-4">
                            {t('You will be redirected to PayPal to complete your purchase securely.')}
                          </p>
                          <Button type="button" className="bg-blue-500 hover:bg-blue-600">
                            {t('Proceed with PayPal')}
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="other">
                        <div className="space-y-4">
                          <div className="border rounded-md p-4 flex items-center gap-3">
                            <input type="radio" id="apple-pay" name="other-payment" />
                            <label htmlFor="apple-pay" className="flex items-center gap-2">
                              <span className="font-medium">Apple Pay</span>
                            </label>
                          </div>
                          
                          <div className="border rounded-md p-4 flex items-center gap-3">
                            <input type="radio" id="google-pay" name="other-payment" />
                            <label htmlFor="google-pay" className="flex items-center gap-2">
                              <span className="font-medium">Google Pay</span>
                            </label>
                          </div>
                          
                          <div className="border rounded-md p-4 flex items-center gap-3">
                            <input type="radio" id="bank-transfer" name="other-payment" />
                            <label htmlFor="bank-transfer" className="flex items-center gap-2">
                              <span className="font-medium">{t('Bank Transfer')}</span>
                            </label>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  {/* Place Order Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-gold hover:bg-gold-dark text-white h-12 text-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? t('Processing...') : `${t('Place Order')} • ${formatPrice(finalTotal)}`}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
                <h2 className="text-xl font-serif font-medium mb-4">{t('Order Summary')}</h2>
                
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {t('Qty')}: {item.quantity}
                          {item.selectedColor && ` • ${item.selectedColor}`}
                          {item.selectedSize && ` • ${item.selectedSize}`}
                        </p>
                      </div>
                      <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                
                {/* Discount Code Input */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={16} className="text-red-500" />
                    <Label htmlFor="discount-code" className="text-sm font-medium">
                      {discountCodeTranslations[language].discount_code}
                    </Label>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      id="discount-code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="80off"
                      disabled={appliedDiscount !== null}
                      className="flex-grow"
                    />
                    {appliedDiscount === null ? (
                      <Button 
                        type="button" 
                        onClick={applyDiscountCode} 
                        disabled={!discountCode}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        {discountCodeTranslations[language].apply}
                      </Button>
                    ) : (
                      <Button 
                        type="button" 
                        onClick={removeDiscount}
                        variant="outline"
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                  
                  {appliedDiscount !== null && (
                    <p className="text-sm text-green-600 mt-1">
                      {discountCodeTranslations[language].discount_applied}: {appliedDiscount}%
                    </p>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('Subtotal')}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('Shipping')}</span>
                    <span>{t('Free')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('Tax')}</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>
                  
                  {/* Show discount if applied */}
                  {appliedDiscount !== null && (
                    <div className="flex justify-between text-red-500">
                      <span>{t('Discount')} ({appliedDiscount}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-medium">
                  <span>{t('Total')}</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
