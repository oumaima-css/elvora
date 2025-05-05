
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Get the orderId from location state
  const orderId = location.state?.orderId || 'unknown';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="w-full max-w-lg text-center px-4">
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
            <h2 className="font-medium mb-4">{t('Order Details')}</h2>
            
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">{t('Order ID')}:</span>
              <span className="font-medium">{orderId}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">{t('Date')}:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Status')}:</span>
              <span className="font-medium text-green-500">{t('Paid')}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/')}>
              {t('Continue Shopping')}
            </Button>
            
            <Button variant="outline" onClick={() => navigate('/orders')}>
              {t('View All Orders')}
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
