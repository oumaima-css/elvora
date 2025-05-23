
import { Product } from "@/data/products";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, isInCart, getQuantityInCart } = useCart();
  const quantityInCart = getQuantityInCart(product.id);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  
  // Get the image to display - either based on hovered color or first image
  const getDisplayImage = () => {
    if (hoveredColor) {
      const colorImage = product.images.find(img => img.color === hoveredColor);
      if (colorImage) return colorImage;
    }
    return product.images[0];
  };

  const displayImage = getDisplayImage();
  
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg group">
      <Link to={`/product/${product.id}`} className="flex-1">
        <div className="overflow-hidden">
          <img 
            src={displayImage.url} 
            alt={displayImage.alt || product.name}
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

          {/* Color preview dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1 mt-2">
              {product.colors.slice(0, 3).map((color) => {
                const hasImage = product.images.some(img => img.color === color);
                return (
                  <div
                    key={color}
                    className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all ${
                      hoveredColor === color ? 'border-gold scale-110' : 'border-gray-300'
                    } ${hasImage ? 'opacity-100' : 'opacity-50'}`}
                    style={{
                      backgroundColor: color.toLowerCase() === 'black' ? '#000000' :
                                     color.toLowerCase() === 'brown' ? '#8B4513' :
                                     color.toLowerCase() === 'navy' ? '#000080' :
                                     color.toLowerCase() === 'white' ? '#FFFFFF' :
                                     color.toLowerCase() === 'cream' ? '#F5F5DC' :
                                     color.toLowerCase() === 'burgundy' ? '#800020' :
                                     color.toLowerCase() === 'silver' ? '#C0C0C0' :
                                     color.toLowerCase() === 'gold' ? '#FFD700' :
                                     color.toLowerCase() === 'tan' ? '#D2B48C' :
                                     color.toLowerCase() === 'oxblood' ? '#4A0E0E' :
                                     color.toLowerCase() === 'olive' ? '#808000' :
                                     '#CCCCCC'
                    }}
                    onMouseEnter={() => hasImage && setHoveredColor(color)}
                    onMouseLeave={() => setHoveredColor(null)}
                    title={color}
                  />
                );
              })}
              {product.colors.length > 3 && (
                <span className="text-xs text-muted-foreground self-center ml-1">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
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
