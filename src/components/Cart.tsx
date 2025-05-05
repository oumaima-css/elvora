
import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const Cart = () => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium text-evermore-dark mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6 text-center">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Button asChild className="bg-gold hover:bg-gold-dark">
          <Link to="/catalog/men">Start Shopping</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="font-serif text-xl font-medium">
          Your Cart ({getTotalItems()})
        </h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={clearCart}
          className="text-sm hover:text-destructive"
        >
          Clear All
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
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(getTotalPrice())}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-muted-foreground">Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex justify-between text-lg font-medium mb-6">
          <span>Total</span>
          <span>{formatPrice(getTotalPrice())}</span>
        </div>
        
        <Button asChild className="w-full bg-evermore-dark hover:bg-black text-white">
          <Link to="/checkout">
            Proceed to Checkout
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
