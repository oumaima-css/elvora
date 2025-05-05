
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
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import { CreditCard, Paypal, Wallet } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US'
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(t('Order placed successfully!'));
      clearCart();
      navigate('/order-confirmation', { state: { orderId: Math.random().toString(36).substr(2, 9) } });
    }, 1500);
  };
  
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
              <form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
                  <h2 className="text-xl font-serif font-medium mb-4">{t('Shipping Information')}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName">{t('First Name')}</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={shippingInfo.firstName} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t('Last Name')}</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={shippingInfo.lastName} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="email">{t('Email Address')}</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={shippingInfo.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="address">{t('Street Address')}</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={shippingInfo.address} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">{t('City')}</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={shippingInfo.city} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">{t('State/Province')}</Label>
                      <Input 
                        id="state" 
                        name="state" 
                        value={shippingInfo.state} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">{t('Postal Code')}</Label>
                      <Input 
                        id="postalCode" 
                        name="postalCode" 
                        value={shippingInfo.postalCode} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>
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
                        <Paypal className="h-4 w-4" />
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
                  {isProcessing ? t('Processing...') : `${t('Place Order')} • ${formatPrice(getTotalPrice())}`}
                </Button>
              </form>
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
                
                <Separator className="my-4" />
                
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('Subtotal')}</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('Shipping')}</span>
                    <span>{t('Calculated at next step')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('Tax')}</span>
                    <span>{t('Calculated at next step')}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-medium">
                  <span>{t('Total')}</span>
                  <span>{formatPrice(getTotalPrice())}</span>
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
