
import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle, ShoppingBag, Truck } from "lucide-react";
import { formatPrice, FREE_SHIPPING_THRESHOLD, isEligibleForFreeShipping, shippingTranslations } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { Progress } from "./ui/progress";

// Define the minimum order value
const MINIMUM_ORDER_VALUE = 249;

const Cart = () => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { t, language } = useLanguage();
  
  const subtotal = getTotalPrice();
  const freeShippingEligible = isEligibleForFreeShipping(subtotal);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  
  // Check if order meets minimum value
  const isBelowMinimum = subtotal < MINIMUM_ORDER_VALUE;
  const amountToMinimum = MINIMUM_ORDER_VALUE - subtotal;
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium text-evermore-dark mb-2">{t('your_cart_is_empty')}</h3>
        <p className="text-muted-foreground mb-6 text-center">
          {t('add_some_items')}
        </p>
        <Button asChild className="bg-gold hover:bg-gold-dark">
          <Link to="/catalog/men">{t('continue_shopping')}</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="font-serif text-xl font-medium">
          {t('cart')} ({getTotalItems()})
        </h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={clearCart}
          className="text-sm hover:text-destructive"
        >
          {t('clear_all')}
        </Button>
      </div>
      
      <div className="flex-grow overflow-auto py-4">
        {items.map((item) => (
          <CartItem
            key={item.product.id}
            id={item.product.id}
            name={item.product.name}
            price={item.product.price}
            quantity={item.quantity}
            image={item.product.images[0]}
            selectedColor={item.selectedColor}
            selectedSize={item.selectedSize}
          />
        ))}
      </div>
      
      <div className="border-t pt-4 mt-auto">
        {/* Minimum order warning */}
        {isBelowMinimum && (
          <div className="mb-4 p-3 bg-red-50 rounded-md">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle className="text-red-500 h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  {t('Minimum order value:')} {formatPrice(MINIMUM_ORDER_VALUE)}
                </p>
                <p className="text-xs text-red-700">
                  {t('Add')} {formatPrice(amountToMinimum)} {t('more to place an order')}
                </p>
              </div>
            </div>
            <Progress value={(subtotal / MINIMUM_ORDER_VALUE) * 100} className="h-1.5" />
          </div>
        )}
        
        {/* Free shipping progress */}
        {!freeShippingEligible && !isBelowMinimum && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="text-amber-500 h-4 w-4" />
              <p className="text-sm">
                {t('Add')} {formatPrice(amountToFreeShipping)} {t('more for free shipping')}
              </p>
            </div>
            <Progress value={freeShippingProgress} className="h-1.5" />
          </div>
        )}
        
        {freeShippingEligible && (
          <div className="mb-4 p-3 bg-green-50 rounded-md">
            <div className="flex items-center gap-2">
              <Truck className="text-green-500 h-4 w-4" />
              <p className="text-sm text-green-600">{t('You qualify for free shipping!')}</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">{t('subtotal')}</span>
          <span className="font-medium">{formatPrice(getTotalPrice())}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-muted-foreground">{t('shipping')}</span>
          <span>
            {freeShippingEligible 
              ? shippingTranslations[language].free_shipping
              : t('To be calculated')}
          </span>
        </div>
        <div className="flex justify-between text-lg font-medium mb-6">
          <span>{t('total')}</span>
          <span>{formatPrice(getTotalPrice())}</span>
        </div>
        
        <Button 
          asChild 
          className="w-full bg-evermore-dark hover:bg-black text-white"
          disabled={isBelowMinimum}
        >
          <Link to="/checkout">
            {isBelowMinimum 
              ? `${t('Minimum')} ${formatPrice(MINIMUM_ORDER_VALUE)} ${t('Required')}`
              : t('checkout')}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
