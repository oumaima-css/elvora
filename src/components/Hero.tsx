
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
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
            Timeless Luxury for Modern Life
          </h1>
          <p className="text-lg mb-8 text-white/90">
            Discover premium accessories that blend elegant design with everyday functionality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark border-none text-white">
              <Link to="/catalog/men">Shop Men</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-evermore-dark">
              <Link to="/catalog/women">Shop Women</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
