
import { useLanguage } from "@/hooks/useLanguage";
import { Percent } from "lucide-react";

const DiscountBanner = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-red-600 text-white py-6 animate-fade-in">
      <div className="luxury-container">
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-full p-2 mr-4">
            <Percent className="h-6 w-6 text-red-600" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold">
              {t('special_sale')}
            </h2>
            <p className="text-lg">
              {t('discount_desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
