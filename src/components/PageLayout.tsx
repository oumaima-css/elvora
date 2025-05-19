
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-24 bg-ivory-light">
        <div className="luxury-container">
          <h1 className="text-4xl font-serif font-medium text-center">{title}</h1>
          {subtitle && <p className="text-center text-muted-foreground mt-2">{subtitle}</p>}
        </div>
      </div>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;
