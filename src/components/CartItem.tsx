
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  selectedSize?: string;
}

const CartItem = ({ 
  id,
  name,
  price,
  quantity,
  image,
  selectedColor,
  selectedSize 
}: CartItemProps) => {
  const { updateItemQuantity, removeItem } = useCart();
  
  return (
    <div className="flex py-4 border-b">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="ml-4 flex-grow">
        <h3 className="font-medium text-evermore-dark">{name}</h3>
        <p className="text-sm text-muted-foreground">
          {selectedColor && `Color: ${selectedColor}`}
          {selectedColor && selectedSize && ' | '}
          {selectedSize && `Size: ${selectedSize}`}
        </p>
        <p className="mt-1 font-medium text-gold-dark">{formatPrice(price)}</p>
        
        {/* Quantity Controls */}
        <div className="flex items-center mt-2">
          <Button 
            variant="outline" 
            size="icon"
            className="h-7 w-7"
            onClick={() => updateItemQuantity(id, quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="mx-2 w-8 text-center">{quantity}</span>
          <Button 
            variant="outline" 
            size="icon"
            className="h-7 w-7"
            onClick={() => updateItemQuantity(id, quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end justify-between">
        <span className="font-medium">
          {formatPrice(price * quantity)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(id)}
          className="text-gray-500 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
