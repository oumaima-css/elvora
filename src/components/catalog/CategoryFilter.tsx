
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCategoryDisplayName, ProductCategory } from "@/data/products";
import { useLanguage } from "@/hooks/useLanguage";

interface CategoryFilterProps {
  categories: ProductCategory[];
  selectedCategory: ProductCategory | null;
  toggleCategory: (category: ProductCategory) => void;
  clearFilters: () => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  toggleCategory, 
  clearFilters 
}: CategoryFilterProps) => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default CategoryFilter;
