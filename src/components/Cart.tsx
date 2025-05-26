
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import CartItem from './CartItem';
import { formatPrice } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const Cart = () => {
  const { items, getTotal, getTotalItems, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const total = getTotal();
  const itemCount = getTotalItems();

  const handleCheckout = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-serif">{t('shopping_cart')}</SheetTitle>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                {t('clear_all')}
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <div className="mt-6 flex-1">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">{t('cart_empty')}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t('cart_empty_description')}</p>
              <Button onClick={() => setIsOpen(false)} className="bg-evermore-dark hover:bg-black text-white">
                {t('continue_shopping')}
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <CartItem 
                    key={`${item.product.id}-${item.selectedColor || 'default'}`} 
                    {...item}
                  />
                ))}
              </div>
              
              <div className="mt-6 border-t pt-6">
                <div className="flex justify-between items-center text-lg font-medium mb-4">
                  <span>{t('total')}</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                <Link to="/checkout" onClick={handleCheckout}>
                  <Button className="w-full bg-evermore-dark hover:bg-black text-white">
                    {t('proceed_to_checkout')}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
