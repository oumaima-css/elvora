
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { getProductById, getProductsByCategory, Product } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addItem, getQuantityInCart } = useCart();
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors ? foundProduct.colors[0] : undefined);
        setSelectedSize(foundProduct.sizes ? foundProduct.sizes[0] : undefined);
        
        // Get related products
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity, selectedColor, selectedSize);
    }
  };

  const quantityInCart = product ? getQuantityInCart(product.id) : 0;
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="luxury-container py-8">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-gold-dark">Home</Link>
              </li>
              <li className="mx-2 text-muted-foreground">/</li>
              <li>
                <Link to={`/catalog/${product.gender}`} className="text-muted-foreground hover:text-gold-dark">
                  {product.gender === 'men' ? "Men's Collection" : "Women's Collection"}
                </Link>
              </li>
              <li className="mx-2 text-muted-foreground">/</li>
              <li className="text-evermore-dark font-medium">{product.name}</li>
            </ol>
          </nav>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-gray-100 rounded-md overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-serif font-medium mb-2">{product.name}</h1>
              <p className="text-2xl text-gold-dark font-medium mb-4">{formatPrice(product.price)}</p>
              
              {product.new && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded mb-4 mr-2">
                  New Arrival
                </span>
              )}
              
              {product.bestSeller && (
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded mb-4">
                  Best Seller
                </span>
              )}
              
              <p className="text-muted-foreground mb-8">{product.description}</p>
              
              <Separator className="mb-6" />
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Color: {selectedColor}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        className={`px-4 ${selectedColor === color ? 'bg-gold hover:bg-gold-dark' : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Size: {selectedSize}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        className={`min-w-[3rem] ${selectedSize === size ? 'bg-gold hover:bg-gold-dark' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Quantity:</h3>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decreaseQuantity} 
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={increaseQuantity} 
                    disabled={product.stock <= quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="ml-4 text-sm text-muted-foreground">
                    {product.stock} available
                  </span>
                </div>
              </div>
              
              {/* Add to Cart Button with quantity badge */}
              <div className="relative w-full">
                <Button 
                  className="w-full bg-evermore-dark hover:bg-black text-white h-12 flex items-center gap-2"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </Button>
                
                {/* Quantity in cart badge */}
                {quantityInCart > 0 && (
                  <div className="absolute -top-2 -right-2 bg-gold text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {quantityInCart}
                  </div>
                )}
              </div>
              
              {/* Additional Info */}
              <Tabs defaultValue="details" className="mt-12">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="returns">Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-4">
                      Our {product.name} is crafted with the highest quality materials for durability and lasting style. 
                      Each piece is meticulously inspected to ensure it meets our rigorous standards.
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Premium materials</li>
                      <li>Expert craftsmanship</li>
                      <li>Timeless design</li>
                      <li>Built to last</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="pt-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">Free standard shipping on all orders over $75.</p>
                    <ul className="mb-4">
                      <li>Standard Shipping (3-5 business days): $5.99</li>
                      <li>Express Shipping (1-2 business days): $12.99</li>
                    </ul>
                    <p>All orders are processed within 24 hours during business days.</p>
                  </div>
                </TabsContent>
                <TabsContent value="returns" className="pt-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">We stand behind our products with a 30-day return policy.</p>
                    <p>
                      If you're not completely satisfied with your purchase, you can return it within 30 days
                      for a full refund or exchange. Items must be unused and in original packaging.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-serif font-medium mb-8">You May Also Like</h2>
              <ProductGrid products={relatedProducts} />
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
