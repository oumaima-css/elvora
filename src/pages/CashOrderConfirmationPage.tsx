
import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Truck, Clock, MapPin, Phone, User, Mail, Package, AlertTriangle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';

const CashOrderConfirmationPage = () => {
  const { t } = useLanguage();
  const { addOrder } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
      return;
    }

    // Add order to user's order history
    addOrder({
      total: orderData.total,
      items: orderData.items.map((item: any) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      status: 'confirmed'
    });
  }, [orderData, addOrder, navigate]);

  if (!orderData) {
    return null;
  }

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
                {t('Order Confirmed!')}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {t('Your cash on delivery order has been successfully placed.')}
              </p>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 inline-block">
                <p className="text-green-800 font-medium">
                  {t('Order ID')}: <span className="font-mono text-lg">{orderData.orderId}</span>
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
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{t('Payment Method')}</span>
                    <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
                      <Truck className="h-4 w-4 text-orange-600" />
                      <span className="text-orange-800 font-medium">{t('Cash on Delivery')}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>{t('Subtotal')}</span>
                      <span>{formatPrice(orderData.subtotal)}</span>
                    </div>
                    {orderData.discountPercent && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <span>{t('Discount')} ({orderData.discountPercent}%)</span>
                        <span>-{formatPrice(orderData.subtotal * orderData.discountPercent / 100)}</span>
                      </div>
                    )}
                    <div className="flex justify-between mb-2">
                      <span>{t('Shipping')}</span>
                      <span>{orderData.shipping === 0 ? t('Free') : formatPrice(orderData.shipping)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-bold text-lg">{t('Total Amount')}</span>
                      <span className="text-xl font-bold text-gold">
                        {formatPrice(orderData.total)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-yellow-900 mb-1">
                          {t('Payment Instructions')}
                        </h4>
                        <ul className="text-yellow-800 text-sm space-y-1">
                          <li>• {t('Please have the exact amount ready for payment')}</li>
                          <li>• {t('Payment is due upon delivery')}</li>
                          <li>• {t('Inspect your items before completing the payment')}</li>
                        </ul>
                      </div>
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
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          {t('Estimated Delivery Time')}
                        </h4>
                        <p className="text-blue-700 text-sm">
                          {t('3-5 business days from order confirmation')}
                        </p>
                        <p className="text-blue-600 text-xs mt-1">
                          {t('Our delivery team will contact you before delivery')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{orderData.customerInfo.fullName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">{orderData.customerInfo.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">{orderData.customerInfo.countryCode} {orderData.customerInfo.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-gray-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">{orderData.customerInfo.address}</p>
                        <p className="text-gray-700">
                          {orderData.customerInfo.city}, {orderData.customerInfo.state} {orderData.customerInfo.postalCode}
                        </p>
                        <p className="text-gray-700 capitalize">{orderData.customerInfo.country}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                asChild 
                className="bg-gold hover:bg-gold-dark text-white px-8 py-3"
                size="lg"
              >
                <Link to="/home">{t('Continue Shopping')}</Link>
              </Button>
              
              <Button 
                variant="outline" 
                asChild
                size="lg"
                className="px-8 py-3"
              >
                <Link to="/profile">{t('View Order History')}</Link>
              </Button>
            </div>

            {/* Additional Information */}
            <div className="mt-8 text-center bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-3">{t('What happens next?')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="font-medium">{t('Order Processing')}</p>
                  <p className="text-xs">{t('We prepare your order')}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-orange-100 p-3 rounded-full mb-2">
                    <Truck className="h-5 w-5 text-orange-600" />
                  </div>
                  <p className="font-medium">{t('Out for Delivery')}</p>
                  <p className="text-xs">{t('Driver contacts you')}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-3 rounded-full mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="font-medium">{t('Delivered')}</p>
                  <p className="text-xs">{t('Pay and enjoy!')}</p>
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

export default CashOrderConfirmationPage;
