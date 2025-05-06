
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import { useLanguage } from "@/hooks/useLanguage";

interface ProductGridProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
}

const ProductGrid = ({ products: initialProducts, title, showFilters = false }: ProductGridProps) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedGender, setSelectedGender] = useState<"all" | "men" | "women">("all");
  
  // Apply filters to products
  const filteredProducts = initialProducts.filter((product) => {
    // Filter by search query
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by price range
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    // Filter by gender
    const matchesGender = selectedGender === "all" || product.gender === selectedGender;
    
    return matchesSearch && matchesPrice && matchesGender;
  });
  
  if (initialProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-serif font-medium text-evermore-dark">{t('no_products_found')}</h2>
        <p className="text-gray-500 mt-2">{t('try_adjusting_filters')}</p>
      </div>
    );
  }
  
  // Find the min and max price from all products
  const allPrices = initialProducts.map(p => p.price);
  const lowestPrice = Math.min(...allPrices);
  const highestPrice = Math.max(...allPrices);
  
  // Handle price range update
  const handlePriceRangeUpdate = () => {
    // Validate that min price is not greater than max price
    if (minPrice > maxPrice) {
      // Swap the values if min is greater than max
      setMinPrice(maxPrice);
      setMaxPrice(minPrice);
    }
  };
  
  return (
    <div className="py-8">
      {title && (
        <h2 className="text-3xl font-serif font-medium text-evermore-dark mb-8 text-center">
          {title}
        </h2>
      )}
      
      {showFilters && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search by name */}
            <div>
              <Label htmlFor="search" className="mb-2 block">{t('search_products')}</Label>
              <Input
                id="search"
                type="text"
                placeholder={t('search_products')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Filter by gender */}
            <div>
              <Label className="mb-2 block">{t('filter_by_gender')}</Label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedGender("all")}
                  className={`px-4 py-2 rounded border ${
                    selectedGender === "all" ? "bg-evermore-dark text-white" : "bg-white"
                  }`}
                >
                  {t('all')}
                </button>
                <button
                  onClick={() => setSelectedGender("men")}
                  className={`px-4 py-2 rounded border ${
                    selectedGender === "men" ? "bg-evermore-dark text-white" : "bg-white"
                  }`}
                >
                  {t('men')}
                </button>
                <button
                  onClick={() => setSelectedGender("women")}
                  className={`px-4 py-2 rounded border ${
                    selectedGender === "women" ? "bg-evermore-dark text-white" : "bg-white"
                  }`}
                >
                  {t('women')}
                </button>
              </div>
            </div>
            
            {/* Filter by price range with custom inputs */}
            <div>
              <Label className="mb-2 block">{t('price_range')}: {formatPrice(minPrice)} - {formatPrice(maxPrice)}</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  placeholder={t('min')}
                  min={0}
                  className="w-1/3"
                />
                <span>{t('to')}</span>
                <Input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  placeholder={t('max')}
                  min={0}
                  className="w-1/3"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handlePriceRangeUpdate}
                  className="shrink-0"
                >
                  {t('apply')}
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {t('price_range')}: {formatPrice(lowestPrice)} - {formatPrice(highestPrice)}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-xl font-medium text-gray-700">{t('no_products_match')}</h3>
            <p className="text-gray-500 mt-2">{t('adjust_criteria')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
