
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { Users } from "lucide-react";
import { Gender } from "@/data/products";

interface CatalogHeroProps {
  selectedGender: Gender | "all";
  switchGender: (gender: Gender | "all") => void;
}

const CatalogHero = ({ selectedGender, switchGender }: CatalogHeroProps) => {
  const { t } = useLanguage();

  return (
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
            ? t("mens_description")
            : selectedGender === "women"
            ? t("womens_description")
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
  );
};

export default CatalogHero;
