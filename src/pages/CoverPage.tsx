
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CoverPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-evermore-dark via-black to-evermore-dark flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-gold rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-gold rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 border border-gold rounded-full"></div>
      </div>
      
      <div className="luxury-container relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-gold mb-4">
              EVERMORE
            </h1>
            <div className="w-24 h-0.5 bg-gold mx-auto"></div>
          </div>
          
          {/* Marketing Message */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 leading-tight">
              Where Luxury Meets
              <br />
              <span className="text-gold">Timeless Elegance</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-4 font-light">
              Discover a world of carefully curated accessories that transcend trends
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Each piece tells a story of craftsmanship, quality, and sophistication. 
              Step into a realm where every detail matters and excellence is the standard.
            </p>
          </div>
          
          {/* Call to Action */}
          <div className="space-y-6">
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold-dark text-black font-semibold px-12 py-4 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Join Our Community Now
              </Button>
            </Link>
            
            <div className="flex items-center justify-center space-x-8 text-white/60 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Premium Materials</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Expert Craftsmanship</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Exclusive Collections</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle animation elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/3 left-1/6 w-1 h-1 bg-gold rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-1 h-1 bg-gold rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-gold rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default CoverPage;
