
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { 
  formatPrice, 
  calculateDiscountedPrice, 
  VALID_DISCOUNT_CODES, 
  discountCodeTranslations,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
  isEligibleForFreeShipping
} from '@/lib/utils';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/useLanguage';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import CustomerInfoForm, { CheckoutFormValues } from '@/components/checkout/CustomerInfoForm';
import PaymentMethodSection from '@/components/checkout/PaymentMethodSection';
import OrderSummary from '@/components/checkout/OrderSummary';
import { AlertCircle } from 'lucide-react';

// Define the minimum order value
const MINIMUM_ORDER_VALUE = 249;

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(z.object({
      fullName: z.string().min(3, { message: "Full name is required" }),
      email: z.string().email({ message: "Valid email is required" }),
      phone: z.string().min(5, { message: "Phone number is required" }),
      address: z.string().min(5, { message: "Address is required" }),
      city: z.string().min(2, { message: "City is required" }),
      state: z.string().min(2, { message: "State/Province is required" }),
      postalCode: z.string().min(3, { message: "Postal code is required" }),
      country: z.string().min(2, { message: "Country is required" }),
    })),
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
    const subtotal = getTotalPrice();
    
    // Check if order meets minimum value requirement
    if (subtotal < MINIMUM_ORDER_VALUE) {
      toast.error(t('Minimum order value is') + ' ' + formatPrice(MINIMUM_ORDER_VALUE));
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Process the payment (this would be replaced with Stripe)
      const orderId = await processPayment();
      
      // Calculate the final amount with discount and shipping
      const isShippingFree = isEligibleForFreeShipping(subtotal);
      const shippingCost = isShippingFree ? 0 : SHIPPING_FEE;
      
      const discountedSubtotal = appliedDiscount !== null 
        ? calculateDiscountedPrice(subtotal, appliedDiscount) 
        : subtotal;
        
      const total = discountedSubtotal + shippingCost;
      
      // Clear the cart and redirect to confirmation page with all order details
      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderId,
          customerInfo: data,
          subtotal: subtotal,
          shipping: shippingCost,
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
  
  // Calculate the final price for the Place Order button
  const subtotal = getTotalPrice();
  const isShippingFree = isEligibleForFreeShipping(subtotal);
  const shippingCost = isShippingFree ? 0 : SHIPPING_FEE;
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount / 100) : 0;
  const finalTotal = subtotal - discountAmount + shippingCost;
  
  // Check if order meets minimum value
  const isBelowMinimum = subtotal < MINIMUM_ORDER_VALUE;
  
  const { language } = useLanguage();
  
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
          
          {/* Minimum order warning */}
          {isBelowMinimum && (
            <div className="mb-6 p-4 border border-red-300 bg-red-50 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">{t('Minimum Order Value Required')}</h3>
                <p className="text-red-700">
                  {t('Orders must be at least')} {formatPrice(MINIMUM_ORDER_VALUE)}. {t('Your current subtotal is')} {formatPrice(subtotal)}.
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="lg:col-span-2">
                <CustomerInfoForm form={form} />
                <PaymentMethodSection 
                  paymentMethod={paymentMethod} 
                  setPaymentMethod={setPaymentMethod} 
                />
                
                {/* Place Order Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold-dark text-white h-12 text-lg"
                  disabled={isProcessing || isBelowMinimum}
                >
                  {isProcessing 
                    ? t('Processing...') 
                    : isBelowMinimum 
                      ? `${t('Minimum')} ${formatPrice(MINIMUM_ORDER_VALUE)} ${t('Required')}`
                      : `${t('Place Order')} • ${formatPrice(finalTotal)}`}
                </Button>
              </form>
            </Form>
            
            {/* Order Summary */}
            <OrderSummary
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
              appliedDiscount={appliedDiscount}
              applyDiscountCode={applyDiscountCode}
              removeDiscount={removeDiscount}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
