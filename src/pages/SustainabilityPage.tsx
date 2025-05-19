
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Separator } from "@/components/ui/separator";

const SustainabilityPage = () => {
  return (
    <PageLayout title="Sustainability" subtitle="Our commitment to a better future">
      <div className="py-16">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-medium mb-6 text-center">Our Approach</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At ELVORA, sustainability isn't just a goal—it's woven into every decision we make. As someone who has studied both technology 
              and business, I understand that true sustainability requires both innovation and responsible business practices. Our approach 
              combines cutting-edge methods with time-tested responsibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-ivory-light p-8 rounded-lg">
              <h3 className="text-xl font-serif font-medium mb-4">Ethical Sourcing</h3>
              <p className="text-muted-foreground">
                We personally visit and audit our suppliers to ensure fair labor practices and responsible resource management. 
                Every material we use can be traced back to its ethical source.
              </p>
            </div>
            <div className="bg-ivory-light p-8 rounded-lg">
              <h3 className="text-xl font-serif font-medium mb-4">Eco-Friendly Materials</h3>
              <p className="text-muted-foreground">
                Our products incorporate recycled metals, responsibly harvested leather alternatives, and innovative bio-based 
                materials that reduce environmental impact without compromising quality.
              </p>
            </div>
            <div className="bg-ivory-light p-8 rounded-lg">
              <h3 className="text-xl font-serif font-medium mb-4">Zero Waste Production</h3>
              <p className="text-muted-foreground">
                We've implemented a zero-waste manufacturing process, utilizing digital design tools to minimize material waste and 
                repurposing scraps into new products or donating them to local artisans.
              </p>
            </div>
          </div>
          
          <Separator className="my-16" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-6">Our Impact</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that transparency is key to genuine sustainability. That's why we regularly publish detailed impact reports 
                that document our environmental footprint, community initiatives, and ongoing improvement efforts.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>50% reduction in carbon emissions since our founding</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>100% renewable energy in our main workshop</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>5% of profits dedicated to environmental conservation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>Tree planting program that has planted over 10,000 trees</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted h-80 rounded-lg"></div>
          </div>
          
          <div className="max-w-3xl mx-auto text-center mt-16">
            <h2 className="text-3xl font-serif font-medium mb-6">Looking Forward</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our journey toward complete sustainability is ongoing. My background in IT has allowed us to implement digital solutions 
              that track our environmental impact in real-time, helping us to continuously improve. We invite you to join us on this 
              journey and hold us accountable to our commitments.
            </p>
            <p className="text-xl font-medium">
              "Sustainability at ELVORA isn't about perfection—it's about progress, transparency, and a genuine commitment to doing better each day."
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SustainabilityPage;
