import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  getProductsByGender, 
  getAllProducts,
  getProductsByCategory,
  getProductsByGenderAndCategory,
  getCategoriesByGender,
  getCategoryDisplayName,
  Gender,
  ProductCategory
} from '@/data/products';
import { capitalizeFirstLetter, discountTranslations } from '@/lib/utils';
import { Filter, Percent, Users, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

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
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  // Convert the gender param to a valid Gender type or set to "all"
  const currentGender = gender as Gender | undefined;
  const [selectedGender, setSelectedGender] = useState<Gender | "all">(
    currentGender && (currentGender === "men" || currentGender === "women") 
      ? currentGender 
      : "all"
  );
  
  const [products, setProducts] = useState([]);
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
    if (selectedGender === "all") {
      // Get all products when "all" is selected
      if (selectedCategory) {
        setProducts(getProductsByCategory(selectedCategory));
      } else {
        setProducts(getAllProducts());
      }
      // For "all", we want to show both men's and women's categories
      setCategories([...menCategories, ...womenCategories]);
    } else if (selectedGender === "women") {
      // Get women-specific products and categories
      if (selectedCategory) {
        setProducts(getProductsByGenderAndCategory(selectedGender, selectedCategory));
      } else {
        setProducts(getProductsByGender(selectedGender));
      }
      // Only show women's categories
      setCategories(womenCategories);
    } else {
      // Get men-specific products and categories
      if (selectedCategory) {
        setProducts(getProductsByGenderAndCategory(selectedGender, selectedCategory));
      } else {
        setProducts(getProductsByGender(selectedGender));
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
    setSelectedGender(gender);
    setSelectedCategory(null); // Reset category when switching gender
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <div className="relative bg-evermore-dark text-white py-16">
          <div className="luxury-container text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">
              {selectedGender === "men" 
                ? t("mens_collection") 
                : selectedGender === "women" 
                  ? t("womens_collection") 
                  : t("all_collections")}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {selectedGender === "men"
                ? t("mens_collection_desc")
                : selectedGender === "women"
                ? t("womens_collection_desc")
                : t("all_collections_desc")}
            </p>
            
            {/* Gender selection tabs */}
            <div className="mt-8 flex justify-center gap-4">
              <Button 
                variant={selectedGender === "all" ? "default" : "outline"}
                onClick={() => switchGender("all")}
                className="px-8"
              >
                <Users className="mr-2 h-4 w-4" />
                {t("all")}
              </Button>
              <Button 
                variant={selectedGender === "men" ? "default" : "outline"}
                onClick={() => switchGender("men")}
                className="px-8"
              >
                {t("men")}
              </Button>
              <Button 
                variant={selectedGender === "women" ? "default" : "outline"}
                onClick={() => switchGender("women")}
                className="px-8"
              >
                {t("women")}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Discount Banner - NEW SECTION */}
        <div className="bg-red-600 text-white py-6 animate-fade-in">
          <div className="luxury-container">
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-full p-2 mr-4">
                <Percent className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-serif font-bold">
                  {discountTranslations[language].special_sale}
                </h2>
                <p className="text-lg">
                  {discountTranslations[language].discount_desc}
                </p>
              </div>
            </div>
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
                  <span>{t("filter_products")}</span>
                </div>
                <span>{isMobileFilterOpen ? t("hide") : t("show")}</span>
              </Button>
            </div>
            
            {/* Sidebar Filters */}
            <aside className={`w-full md:w-64 ${isMobileFilterOpen ? 'block' : 'hidden'} md:block`}>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">{t("categories")}</h2>
                  {selectedCategory && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs"
                    >
                      {t("clear_all")}
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
                    : selectedGender !== "all"
                      ? t("all_gender_items", { gender: capitalizeFirstLetter(selectedGender) })
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
