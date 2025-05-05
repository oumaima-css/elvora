
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, Menu, X } from 'lucide-react';
import Cart from './Cart';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'}`}>
      <div className="luxury-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="font-serif font-bold text-2xl tracking-wider text-evermore-dark">
            EVERMORE
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/catalog/men" className="luxury-underline text-evermore-dark font-medium hover:text-gold-dark transition-colors">
            Men
          </Link>
          <Link to="/catalog/women" className="luxury-underline text-evermore-dark font-medium hover:text-gold-dark transition-colors">
            Women
          </Link>
          <Link to="/new-arrivals" className="luxury-underline text-evermore-dark font-medium hover:text-gold-dark transition-colors">
            New Arrivals
          </Link>
          <Link to="/bestsellers" className="luxury-underline text-evermore-dark font-medium hover:text-gold-dark transition-colors">
            Best Sellers
          </Link>
        </nav>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] overflow-y-auto">
              <Cart />
            </SheetContent>
          </Sheet>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              to="/catalog/men" 
              className="text-evermore-dark px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Men
            </Link>
            <Link 
              to="/catalog/women" 
              className="text-evermore-dark px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Women
            </Link>
            <Link 
              to="/new-arrivals" 
              className="text-evermore-dark px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link 
              to="/bestsellers" 
              className="text-evermore-dark px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Best Sellers
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
