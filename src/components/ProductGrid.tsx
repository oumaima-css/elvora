
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { formatPrice } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
}

const ProductGrid = ({ products: initialProducts, title, showFilters = false }: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedGender, setSelectedGender] = useState<"all" | "men" | "women">("all");

  // Apply filters to products
  const filteredProducts = initialProducts.filter((product) => {
    // Filter by search query
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by price range
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Filter by gender
    const matchesGender = selectedGender === "all" || product.gender === selectedGender;
    
    return matchesSearch && matchesPrice && matchesGender;
  });
  
  if (initialProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-serif font-medium text-evermore-dark">No products found</h2>
        <p className="text-gray-500 mt-2">Try adjusting your filters or check back later for new arrivals.</p>
      </div>
    );
  }
  
  // Find the min and max price from all products for the slider
  const allPrices = initialProducts.map(p => p.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  
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
              <Label htmlFor="search" className="mb-2 block">Search Products</Label>
              <Input
                id="search"
                type="text"
                placeholder="Search by product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Filter by gender */}
            <div>
              <Label className="mb-2 block">Filter by Gender</Label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedGender("all")}
                  className={`px-4 py-2 rounded border ${
                    selectedGender === "all" ? "bg-evermore-dark text-white" : "bg-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedGender("men")}
                  className={`px-4 py-2 rounded border ${
                    selectedGender === "men" ? "bg-evermore-dark text-white" : "bg-white"
                  }`}
                >
                  Men
                </button>
                <button
                  onClick={() => setSelectedGender("women")}
                  className={`px-4 py-2 rounded border ${
                    selectedGender === "women" ? "bg-evermore-dark text-white" : "bg-white"
                  }`}
                >
                  Women
                </button>
              </div>
            </div>
            
            {/* Filter by price range */}
            <div>
              <Label className="mb-2 block">Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</Label>
              <Slider
                defaultValue={[minPrice, maxPrice]}
                min={minPrice}
                max={maxPrice}
                step={5}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
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
            <h3 className="text-xl font-medium text-gray-700">No products match your filters</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
