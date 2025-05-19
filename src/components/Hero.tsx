
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-evermore-dark opacity-50"></div>
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg')" }}
      ></div>
      
      <div className="luxury-container relative z-10">
        <div className="max-w-lg text-white">
          <h1 className="font-serif font-medium text-5xl md:text-6xl mb-4 text-white">
            {t('timeless_luxury')}
          </h1>
          <p className="text-lg mb-8 text-white/90">
            {t('discover_premium')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark border-none text-white">
              <Link to="/catalog/men">{t('shop_men')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-evermore-dark">
              <Link to="/catalog/women">{t('shop_women')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
