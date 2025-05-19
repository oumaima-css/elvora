
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
  return (
    <PageLayout title="Our Story" subtitle="The journey behind ELVORA">
      <div className="py-16">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-6">The Beginning</h2>
              <p className="text-lg text-muted-foreground mb-6">
                My journey began at the intersection of technology and business. As an IT student pursuing my Master's degree, 
                I was deeply fascinated by digital innovation and its transformative potential. However, my foundation in 
                Business Administration from my bachelor's degree provided me with a unique lens to view technology—not just 
                as code and systems, but as solutions to real human needs.
              </p>
              <p className="text-lg text-muted-foreground">
                During my years in sales, I noticed something critical: there was a disconnect between luxury products and 
                the digital experience surrounding them. The elegant craftsmanship of premium accessories rarely translated 
                to their online presence. This gap became my inspiration.
              </p>
            </div>
            <div className="bg-muted h-80 rounded-lg"></div>
          </div>
          
          <Separator className="my-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1 bg-muted h-80 rounded-lg"></div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-serif font-medium mb-6">The Vision</h2>
              <p className="text-lg text-muted-foreground mb-6">
                ELVORA was born from this convergence of passions. I envisioned a brand that would bridge the gap between 
                traditional luxury craftsmanship and modern digital experience. A brand that would offer timeless accessories 
                while embracing technology to enhance rather than diminish the luxury experience.
              </p>
              <p className="text-lg text-muted-foreground">
                My background in IT gave me the tools to build a seamless online platform, while my business education 
                and sales experience informed our customer-centric approach. Every decision at ELVORA—from our ethically 
                sourced materials to our intuitive website—reflects this unique blend of disciplines.
              </p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center mt-16">
            <h2 className="text-3xl font-serif font-medium mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8">
              At ELVORA, we believe that luxury need not be detached from practicality, nor craftsmanship from innovation. 
              Our mission is to create accessories that enhance the modern lifestyle while honoring timeless traditions of quality.
            </p>
            <p className="text-xl font-medium">
              "We don't just sell products; we curate experiences that merge the best of both worlds—the elegance of traditional 
              craftsmanship with the convenience of modern technology."
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
