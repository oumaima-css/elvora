
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { getFeaturedProducts, getNewArrivals, getBestSellers } from '@/data/products';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  
  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts());
    setNewArrivals(getNewArrivals());
    setBestSellers(getBestSellers());
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16 bg-ivory-light">
        <div className="luxury-container">
          <h2 className="text-3xl font-serif font-medium text-center mb-12">Shop By Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Men's Section */}
            <div className="group relative overflow-hidden rounded-lg h-80 bg-evermore-dark">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "url('/placeholder.svg')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-3xl font-serif text-white mb-2">Men's Collection</h3>
                <p className="text-white/80 mb-4">Sophisticated essentials for the modern man</p>
                <Button asChild className="bg-gold hover:bg-gold-dark text-white">
                  <Link to="/catalog/men">Shop Men</Link>
                </Button>
              </div>
            </div>
            
            {/* Women's Section */}
            <div className="group relative overflow-hidden rounded-lg h-80 bg-evermore-dark">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "url('/placeholder.svg')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-3xl font-serif text-white mb-2">Women's Collection</h3>
                <p className="text-white/80 mb-4">Elegant accessories for every occasion</p>
                <Button asChild className="bg-gold hover:bg-gold-dark text-white">
                  <Link to="/catalog/women">Shop Women</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="luxury-container">
          <h2 className="text-3xl font-serif font-medium text-center mb-2">Featured Products</h2>
          <p className="text-center text-muted-foreground mb-12">Handpicked selections from our collection</p>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-evermore-dark text-evermore-dark hover:bg-evermore-dark hover:text-white">
              <Link to="/catalog/men">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials / Brand Promise Section */}
      <section className="py-16 bg-evermore-dark text-white">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-medium mb-6">Crafted with Excellence</h2>
            <p className="text-lg text-white/80 mb-12">
              Every EVERMORE product represents our commitment to quality materials, thoughtful design, and meticulous craftsmanship.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quality */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gold/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl mb-2">Premium Materials</h3>
                <p className="text-white/70">Only the finest materials selected for durability and beauty.</p>
              </div>
              
              {/* Craftsmanship */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gold/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl mb-2">Expert Craftsmanship</h3>
                <p className="text-white/70">Meticulously crafted by skilled artisans with attention to detail.</p>
              </div>
              
              {/* Timeless Design */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gold/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl mb-2">Timeless Design</h3>
                <p className="text-white/70">Elegant, functional designs that transcend trends.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="luxury-container">
          <h2 className="text-3xl font-serif font-medium text-center mb-2">New Arrivals</h2>
          <p className="text-center text-muted-foreground mb-12">The latest additions to our collection</p>
          <ProductGrid products={newArrivals} />
          <div className="text-center mt-8">
            <Button asChild className="bg-gold hover:bg-gold-dark text-white">
              <Link to="/new-arrivals">View All New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Best Sellers Section */}
      <section className="py-16 bg-ivory-light">
        <div className="luxury-container">
          <h2 className="text-3xl font-serif font-medium text-center mb-2">Best Sellers</h2>
          <p className="text-center text-muted-foreground mb-12">Our most popular products</p>
          <ProductGrid products={bestSellers} />
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-evermore-dark text-evermore-dark hover:bg-evermore-dark hover:text-white">
              <Link to="/bestsellers">View All Best Sellers</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-evermore-dark">
        <div className="luxury-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-medium text-white mb-4">Join Our Mailing List</h2>
            <p className="text-white/80 mb-6">
              Subscribe to receive updates on new arrivals, special offers, and exclusive events.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <Button className="bg-gold hover:bg-gold-dark text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
