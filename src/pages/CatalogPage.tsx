
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  getProductsByGender, 
  getProductsByCategory,
  getProductsByGenderAndCategory,
  getCategoriesByGender, 
  getCategoryDisplayName,
  Gender,
  ProductCategory
} from '@/data/products';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Filter, X } from 'lucide-react';

const CatalogPage = () => {
  const { gender } = useParams<{ gender: string }>();
  const validGender = gender as Gender;
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  useEffect(() => {
    if (validGender) {
      if (selectedCategory) {
        setProducts(getProductsByGenderAndCategory(validGender, selectedCategory));
      } else {
        setProducts(getProductsByGender(validGender));
      }
      setCategories(getCategoriesByGender(validGender));
    }
  }, [validGender, selectedCategory]);
  
  const toggleCategory = (category: ProductCategory) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  
  const clearFilters = () => {
    setSelectedCategory(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <div className="relative bg-evermore-dark text-white py-16">
          <div className="luxury-container text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">
              {validGender === 'men' ? "Men's Collection" : "Women's Collection"}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {validGender === 'men'
                ? "Discover our premium selection of accessories crafted for the modern gentleman."
                : "Explore our luxurious collection designed for the contemporary woman."}
            </p>
          </div>
        </div>
        
        <div className="luxury-container py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <Button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} 
                variant="outline"
                className="w-full flex justify-between items-center"
              >
                <div className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  <span>Filter Products</span>
                </div>
                <span>{isMobileFilterOpen ? "Hide" : "Show"}</span>
              </Button>
            </div>
            
            {/* Sidebar Filters */}
            <aside className={`w-full md:w-64 ${isMobileFilterOpen ? 'block' : 'hidden'} md:block`}>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Categories</h2>
                  {selectedCategory && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                <Separator className="mb-4" />
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className={`justify-start w-full ${selectedCategory === category ? 'bg-gold hover:bg-gold-dark' : ''}`}
                      onClick={() => toggleCategory(category)}
                    >
                      {getCategoryDisplayName(category)}
                    </Button>
                  ))}
                </div>
              </div>
            </aside>
            
            {/* Product Grid */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif">
                  {selectedCategory 
                    ? getCategoryDisplayName(selectedCategory) 
                    : `All ${capitalizeFirstLetter(validGender)}'s Items`}
                </h2>
                <p className="text-sm text-muted-foreground">{products.length} products</p>
              </div>
              
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CatalogPage;
