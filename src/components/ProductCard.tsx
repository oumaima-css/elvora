
import { Product } from "@/data/products";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, isInCart, getQuantityInCart } = useCart();
  const quantityInCart = getQuantityInCart(product.id);
  
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg group">
      <Link to={`/product/${product.id}`} className="flex-1">
        <div className="overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4 flex-1">
          {/* Badge */}
          {(product.new || product.featured || product.bestSeller) && (
            <div className="mb-2">
              {product.new && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                  New
                </span>
              )}
              {product.bestSeller && (
                <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded mr-2">
                  Best Seller
                </span>
              )}
              {product.featured && (
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  Featured
                </span>
              )}
            </div>
          )}
          
          {/* Title */}
          <h3 className="text-lg font-medium text-evermore-dark font-serif">{product.name}</h3>
          
          {/* Price */}
          <p className="text-gold-dark font-medium mt-1">{formatPrice(product.price)}</p>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0">
        <div className="w-full relative">
          <Button 
            className="w-full bg-evermore-dark hover:bg-black text-white flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            disabled={product.stock <= 0}
          >
            <ShoppingBag size={16} />
            {product.stock <= 0 
              ? 'Out of Stock' 
              : 'Add to Cart'
            }
          </Button>
          
          {/* Quantity Badge */}
          {quantityInCart > 0 && (
            <div className="absolute -top-2 -right-2 bg-gold text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
              {quantityInCart}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
