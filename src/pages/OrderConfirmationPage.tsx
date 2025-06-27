
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MapPin, Phone, User, Mail, Tag, Truck, Package, CreditCard, Download } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice, isEligibleForFreeShipping, shippingTranslations } from '@/lib/utils';

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
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
  items?: any[];
  customerInfo?: CustomerInfo;
  paymentMethod?: string;
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
        customerInfo: location.state.customerInfo,
        paymentMethod: location.state.paymentMethod || 'credit-card'
      });
    } else {
      console.log('No order details found in location state');
    }
  }, [location]);

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case 'credit-card':
        return t('Credit Card');
      case 'paypal':
        return 'PayPal';
      case 'other':
        return t('Other Payment Method');
      default:
        return t('Online Payment');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="luxury-container py-8">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8 bg-white p-8 rounded-lg shadow-sm">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-serif font-medium text-green-700 mb-2">
                {t('Payment Successful!')}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {t('Thank you for your purchase! Your order has been confirmed and is being processed.')}
              </p>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 inline-block">
                <p className="text-green-800 font-medium">
                  {t('Order ID')}: <span className="font-mono text-lg">{orderDetails.orderId}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Details */}
              <Card className="shadow-sm">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Package className="h-5 w-5" />
                    {t('Order Summary')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('Order Date')}</p>
                      <p className="font-medium">{orderDetails.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('Status')}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-600">{t(orderDetails.status)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-medium">{t('Payment Method')}</span>
                    <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800 font-medium">{getPaymentMethodDisplay(orderDetails.paymentMethod || 'credit-card')}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    {orderDetails.subtotal && (
                      <div className="flex justify-between mb-2">
                        <span>{t('Subtotal')}</span>
                        <span>{formatPrice(orderDetails.subtotal)}</span>
                      </div>
                    )}
                    
                    {/* Display discount information if applicable */}
                    {orderDetails.discountPercent && orderDetails.originalTotal && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <div className="flex items-center">
                          <Tag className="mr-2 h-4 w-4" />
                          <span>{t('Discount Applied')} ({orderDetails.discountPercent}%)</span>
                        </div>
                        <span>-{formatPrice(orderDetails.originalTotal * orderDetails.discountPercent / 100)}</span>
                      </div>
                    )}
                    
                    {/* Shipping Cost */}
                    {orderDetails.subtotal && (
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <Truck className="mr-2 h-4 w-4" />
                          <span>{shippingTranslations[language].shipping_fee}</span>
                        </div>
                        <span>
                          {isEligibleForFreeShipping(orderDetails.subtotal)
                            ? shippingTranslations[language].free_shipping
                            : formatPrice(orderDetails.shipping || 0)
                          }
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-bold text-lg">{t('Total Paid')}</span>
                      <span className="text-xl font-bold text-gold">
                        {orderDetails.total ? formatPrice(orderDetails.total) : t('Paid')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card className="shadow-sm">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <MapPin className="h-5 w-5" />
                    {t('Delivery Information')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h4 className="font-medium text-blue-900 mb-2">
                      {t('Shipping Method')}
                    </h4>
                    <p className="text-blue-700 text-sm mb-1">
                      {t('Standard Shipping')} 
                      {orderDetails.subtotal && isEligibleForFreeShipping(orderDetails.subtotal) 
                        ? ` (${shippingTranslations[language].free_shipping})` 
                        : orderDetails.shipping ? ` (${formatPrice(orderDetails.shipping)})` : ''}
                    </p>
                    <p className="text-blue-600 text-xs">
                      {t('Estimated Delivery')}: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Customer Information Section */}
                  {orderDetails.customerInfo && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">{orderDetails.customerInfo.fullName}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700">{orderDetails.customerInfo.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700">{orderDetails.customerInfo.countryCode} {orderDetails.customerInfo.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700">{orderDetails.customerInfo.address}</p>
                          <p className="text-gray-700">
                            {orderDetails.customerInfo.city}, {orderDetails.customerInfo.state} {orderDetails.customerInfo.postalCode}
                          </p>
                          <p className="text-gray-700 capitalize">{orderDetails.customerInfo.country}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                onClick={() => navigate('/home')} 
                className="bg-gold hover:bg-gold-dark text-white px-8 py-3"
                size="lg"
              >
                {t('Continue Shopping')}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/profile')}
                size="lg"
                className="px-8 py-3"
              >
                {t('View Order History')}
              </Button>

              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-3 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {t('Download Receipt')}
              </Button>
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-4 text-center">{t('Important Information')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('Order Processing')}</h4>
                  <ul className="space-y-1">
                    <li>• {t('A confirmation email has been sent to your email address.')}</li>
                    <li>• {t('Your order will be processed within 1-2 business days.')}</li>
                    <li>• {t('You will receive tracking information once shipped.')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('Customer Support')}</h4>
                  <ul className="space-y-1">
                    <li>• {t('If you have any questions about your order, please contact our customer service.')}</li>
                    <li>• {t('Returns and exchanges are accepted within 30 days.')}</li>
                    <li>• {t('Keep your order ID for reference.')}</li>
                  </ul>
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

export default OrderConfirmationPage;
