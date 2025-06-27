
import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Truck, Clock, MapPin } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="luxury-container py-8">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-serif font-medium text-green-700 mb-2">
                {t('Order Confirmed!')}
              </h1>
              <p className="text-muted-foreground">
                {t('Your cash on delivery order has been successfully placed.')}
              </p>
            </div>

            {/* Order Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  {t('Order Details')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">{t('Order ID')}</span>
                  <span className="font-mono text-sm">{orderData.orderId}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">{t('Payment Method')}</span>
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    {t('Cash on Delivery')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">{t('Total Amount')}</span>
                  <span className="text-lg font-bold text-gold">
                    {formatPrice(orderData.total)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">{t('Items')}</span>
                  <span>{orderData.items} {t('items')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t('Delivery Information')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">
                    {t('Important Notes')}
                  </h4>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• {t('Please have the exact amount ready for payment')}</li>
                    <li>• {t('Our delivery team will contact you before delivery')}</li>
                    <li>• {t('Inspect your items before completing the payment')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t('Delivery Address')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{orderData.customerInfo.fullName}</p>
                  <p>{orderData.customerInfo.address}</p>
                  <p>{orderData.customerInfo.city}, {orderData.customerInfo.state} {orderData.customerInfo.postalCode}</p>
                  <p>{orderData.customerInfo.country}</p>
                  <p className="text-muted-foreground">
                    {t('Phone')}: {orderData.customerInfo.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                className="bg-gold hover:bg-gold-dark text-white"
              >
                <Link to="/home">{t('Continue Shopping')}</Link>
              </Button>
              
              <Button 
                variant="outline" 
                asChild
              >
                <Link to="/profile">{t('View Order History')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CashOrderConfirmationPage;
