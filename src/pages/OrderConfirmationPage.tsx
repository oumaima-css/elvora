
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, MapPin, Phone, User, Mail, Tag, Truck } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice, isEligibleForFreeShipping, shippingTranslations } from '@/lib/utils';

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface OrderDetails {
  orderId: string;
  date: string;
  status: string;
  subtotal?: number;
  shipping?: number;
  total?: number;
  originalTotal?: number;
  discountPercent?: number;
  items?: number;
  customerInfo?: CustomerInfo;
}

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderId: 'unknown',
    date: new Date().toLocaleDateString(),
    status: 'Paid',
  });
  
  useEffect(() => {
    // Get the orderId and other details from location state
    if (location.state?.orderId) {
      setOrderDetails({
        orderId: location.state.orderId,
        date: new Date().toLocaleDateString(),
        status: 'Paid',
        subtotal: location.state.subtotal,
        shipping: location.state.shipping,
        total: location.state.total,
        originalTotal: location.state.originalTotal,
        discountPercent: location.state.discountPercent,
        items: location.state.items,
        customerInfo: location.state.customerInfo
      });
    } else {
      // If no order details found, this might be a direct page access
      // In a real app, you would fetch order details from API
      console.log('No order details found in location state');
    }
  }, [location]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="w-full max-w-2xl text-center px-4">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-serif font-medium mb-4">
            {t('Order Confirmed')}
          </h1>
          
          <p className="text-muted-foreground mb-6">
            {t('Thank you for your purchase! Your order has been confirmed and is being processed.')}
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h2 className="font-medium text-xl mb-4">{t('Order Details')}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start">
              <div>
                <div className="mb-2">
                  <span className="text-muted-foreground">{t('Order ID')}:</span>
                  <p className="font-medium">{orderDetails.orderId}</p>
                </div>
                
                <div className="mb-2">
                  <span className="text-muted-foreground">{t('Date')}:</span>
                  <p className="font-medium">{orderDetails.date}</p>
                </div>
                
                <div className="mb-2">
                  <span className="text-muted-foreground">{t('Status')}:</span>
                  <p className="font-medium text-green-500">{t(orderDetails.status)}</p>
                </div>
              </div>
              
              <div>
                <div className="mb-2">
                  <span className="text-muted-foreground">{t('Payment Method')}:</span>
                  <p className="font-medium">{t('Credit Card')}</p>
                </div>
                
                <div className="mb-2">
                  <span className="text-muted-foreground">{t('Shipping Method')}:</span>
                  <p className="font-medium">
                    {t('Standard Shipping')} 
                    {orderDetails.subtotal && isEligibleForFreeShipping(orderDetails.subtotal) 
                      ? ` (${shippingTranslations[language].free_shipping})` 
                      : orderDetails.shipping ? ` (${formatPrice(orderDetails.shipping)})` : ''}
                  </p>
                </div>
                
                <div className="mb-2">
                  <span className="text-muted-foreground">{t('Estimated Delivery')}:</span>
                  <p className="font-medium">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            {/* Customer Information Section */}
            {orderDetails.customerInfo && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium text-lg mb-3 flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {t('Delivery Information')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start">
                  <div>
                    <div className="mb-2 flex items-start">
                      <User className="mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground block">{t('Full Name')}:</span>
                        <p className="font-medium">{orderDetails.customerInfo.fullName}</p>
                      </div>
                    </div>
                    
                    <div className="mb-2 flex items-start">
                      <Mail className="mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground block">{t('Email')}:</span>
                        <p className="font-medium">{orderDetails.customerInfo.email}</p>
                      </div>
                    </div>
                    
                    <div className="mb-2 flex items-start">
                      <Phone className="mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground block">{t('Phone')}:</span>
                        <p className="font-medium">{orderDetails.customerInfo.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-2 flex items-start">
                      <MapPin className="mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground block">{t('Shipping Address')}:</span>
                        <p className="font-medium">{orderDetails.customerInfo.address}</p>
                        <p className="font-medium">
                          {orderDetails.customerInfo.city}, {orderDetails.customerInfo.state} {orderDetails.customerInfo.postalCode}
                        </p>
                        <p className="font-medium">{orderDetails.customerInfo.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t">
              {/* Order Summary */}
              <div className="mb-4">
                {orderDetails.subtotal && (
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">{t('Subtotal')}</span>
                    <span>{formatPrice(orderDetails.subtotal)}</span>
                  </div>
                )}
                
                {/* Shipping Cost */}
                {orderDetails.subtotal && (
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-4 w-4" />
                      <span className="text-muted-foreground">{shippingTranslations[language].shipping_fee}</span>
                    </div>
                    <span>
                      {isEligibleForFreeShipping(orderDetails.subtotal)
                        ? shippingTranslations[language].free_shipping
                        : formatPrice(orderDetails.shipping || 0)
                      }
                    </span>
                  </div>
                )}
                
                {/* Display discount information if applicable */}
                {orderDetails.discountPercent && orderDetails.originalTotal && (
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center text-red-500">
                      <Tag className="mr-2 h-4 w-4" />
                      <span>{t('Discount Applied')}: {orderDetails.discountPercent}%</span>
                    </div>
                    <div className="text-right">
                      <div className="text-muted-foreground line-through">{formatPrice(orderDetails.originalTotal)}</div>
                      <p className="text-red-500">-{formatPrice(orderDetails.originalTotal * orderDetails.discountPercent / 100)}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">{t('Order Total')}:</span>
                <span className="font-medium text-xl">
                  {orderDetails.total ? formatPrice(orderDetails.total) : t('Paid')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/')} className="bg-primary">
              {t('Continue Shopping')}
            </Button>
            
            <Button variant="outline" onClick={() => navigate('/orders')}>
              {t('View All Orders')}
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            <p>{t('A confirmation email has been sent to your email address.')}</p>
            <p className="mt-2">{t('If you have any questions about your order, please contact our customer service.')}</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
