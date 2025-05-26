
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { 
  getProductsByGender, 
  getAllProducts,
  getProductsByCategory,
  getProductsByGenderAndCategory,
  getCategoryDisplayName,
  Gender,
  ProductCategory
} from '@/data/products';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Filter } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import CatalogHero from '@/components/catalog/CatalogHero';
import DiscountBanner from '@/components/catalog/DiscountBanner';
import CategoryFilter from '@/components/catalog/CategoryFilter';

// Define the specific categories for each gender
const womenCategories: ProductCategory[] = [
  'bags-purses',
  'cosmetics',
  'beauty-skincare',
  'jewelry'
];

const menCategories: ProductCategory[] = [
  'portfolios',
  'watches',
  'pants-belts',
  'leather-wallets',
  'backpacks',
  'computer-bags'
];

const CatalogPage = () => {
  const { gender } = useParams<{ gender: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Convert the gender param to a valid Gender type or set to "all"
  const currentGender = gender as Gender | undefined;
  const [selectedGender, setSelectedGender] = useState<Gender | "all">(
    currentGender && (currentGender === "men" || currentGender === "women") 
      ? currentGender 
      : "all"
  );
  
  const [products, setProducts] = useState(getAllProducts()); // Initialize with all products
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Update URL when gender changes
  useEffect(() => {
    if (selectedGender !== "all" && gender !== selectedGender) {
      navigate(`/catalog/${selectedGender}`, { replace: true });
    } else if (selectedGender === "all" && gender) {
      navigate('/catalog', { replace: true });
    }
  }, [selectedGender, gender, navigate]);
  
  // Update products and categories based on gender and category selection
  useEffect(() => {
    console.log('Updating products for gender:', selectedGender, 'category:', selectedCategory);
    
    if (selectedGender === "all") {
      // Get all products when "all" is selected
      if (selectedCategory) {
        const filteredProducts = getProductsByCategory(selectedCategory);
        console.log('Filtered products by category:', filteredProducts.length);
        setProducts(filteredProducts);
      } else {
        const allProducts = getAllProducts();
        console.log('All products:', allProducts.length);
        setProducts(allProducts);
      }
      // For "all", we want to show both men's and women's categories
      setCategories([...menCategories, ...womenCategories]);
    } else if (selectedGender === "women") {
      // Get women-specific products and categories
      if (selectedCategory) {
        const filteredProducts = getProductsByGenderAndCategory(selectedGender, selectedCategory);
        console.log('Women products by category:', filteredProducts.length);
        setProducts(filteredProducts);
      } else {
        const womenProducts = getProductsByGender(selectedGender);
        console.log('All women products:', womenProducts.length);
        setProducts(womenProducts);
      }
      // Only show women's categories
      setCategories(womenCategories);
    } else {
      // Get men-specific products and categories
      if (selectedCategory) {
        const filteredProducts = getProductsByGenderAndCategory(selectedGender, selectedCategory);
        console.log('Men products by category:', filteredProducts.length);
        setProducts(filteredProducts);
      } else {
        const menProducts = getProductsByGender(selectedGender);
        console.log('All men products:', menProducts.length);
        setProducts(menProducts);
      }
      // Only show men's categories
      setCategories(menCategories);
    }
  }, [selectedGender, selectedCategory]);
  
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
  
  const switchGender = (gender: Gender | "all") => {
    console.log('Switching gender to:', gender);
    setSelectedGender(gender);
    setSelectedCategory(null); // Reset category when switching gender
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <CatalogHero 
          selectedGender={selectedGender}
          switchGender={switchGender}
        />
        
        {/* Discount Banner */}
        <DiscountBanner />
        
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
                  <span>{t("filter_products")}</span>
                </div>
                <span>{isMobileFilterOpen ? t("hide") : t("show")}</span>
              </Button>
            </div>
            
            {/* Sidebar Filters */}
            <aside className={`w-full md:w-64 ${isMobileFilterOpen ? 'block' : 'hidden'} md:block`}>
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                toggleCategory={toggleCategory}
                clearFilters={clearFilters}
              />
            </aside>
            
            {/* Product Grid */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif">
                  {selectedCategory 
                    ? getCategoryDisplayName(selectedCategory) 
                    : selectedGender !== "all"
                      ? t("all_gender_items").replace("{gender}", capitalizeFirstLetter(selectedGender))
                      : t("all_items")}
                </h2>
                <p className="text-sm text-muted-foreground">{products.length} {t("products")}</p>
              </div>
              
              <ProductGrid products={products} showFilters={true} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CatalogPage;
