
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SizeGuidePage = () => {
  const [measurementUnit, setMeasurementUnit] = useState<'cm' | 'inches'>('cm');
  
  const toggleMeasurementUnit = () => {
    setMeasurementUnit(prev => prev === 'cm' ? 'inches' : 'cm');
  };
  
  // Conversion function
  const convertMeasurement = (cm: number): string => {
    if (measurementUnit === 'cm') {
      return `${cm} cm`;
    } else {
      // Convert to inches (1 cm ≈ 0.393701 inches)
      const inches = (cm * 0.393701).toFixed(1);
      return `${inches}"`;
    }
  };

  return (
    <PageLayout title="Size Guide" subtitle="Find your perfect fit">
      <div className="py-16">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-end mb-6">
              <button 
                onClick={toggleMeasurementUnit} 
                className="text-sm px-3 py-1 border border-muted-foreground rounded-md hover:bg-muted"
              >
                Switch to {measurementUnit === 'cm' ? 'inches' : 'cm'}
              </button>
            </div>
            
            <Tabs defaultValue="wallets">
              <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="wallets">Wallets</TabsTrigger>
                <TabsTrigger value="bags">Bags</TabsTrigger>
                <TabsTrigger value="belts">Belts</TabsTrigger>
                <TabsTrigger value="watches">Watches</TabsTrigger>
              </TabsList>
              
              <TabsContent value="wallets" className="mt-8">
                <h2 className="text-2xl font-serif font-medium mb-4">Wallet Dimensions</h2>
                <p className="text-muted-foreground mb-6">
                  Our wallets come in various sizes to accommodate different needs. Find the perfect size for you below.
                </p>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Style</TableHead>
                      <TableHead>Length</TableHead>
                      <TableHead>Width</TableHead>
                      <TableHead>Card Slots</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Bifold Slim</TableCell>
                      <TableCell>{convertMeasurement(11)}</TableCell>
                      <TableCell>{convertMeasurement(9)}</TableCell>
                      <TableCell>6</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bifold Classic</TableCell>
                      <TableCell>{convertMeasurement(11.5)}</TableCell>
                      <TableCell>{convertMeasurement(9.5)}</TableCell>
                      <TableCell>8</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Long Wallet</TableCell>
                      <TableCell>{convertMeasurement(19)}</TableCell>
                      <TableCell>{convertMeasurement(9)}</TableCell>
                      <TableCell>12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Card Holder</TableCell>
                      <TableCell>{convertMeasurement(10)}</TableCell>
                      <TableCell>{convertMeasurement(7)}</TableCell>
                      <TableCell>4</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="bags" className="mt-8">
                <h2 className="text-2xl font-serif font-medium mb-4">Bag Dimensions</h2>
                <p className="text-muted-foreground mb-6">
                  Find the perfect bag size for your daily needs or special occasions.
                </p>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Style</TableHead>
                      <TableHead>Length</TableHead>
                      <TableHead>Height</TableHead>
                      <TableHead>Width</TableHead>
                      <TableHead>Strap Drop</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Mini Crossbody</TableCell>
                      <TableCell>{convertMeasurement(20)}</TableCell>
                      <TableCell>{convertMeasurement(15)}</TableCell>
                      <TableCell>{convertMeasurement(6)}</TableCell>
                      <TableCell>{convertMeasurement(55)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Classic Tote</TableCell>
                      <TableCell>{convertMeasurement(40)}</TableCell>
                      <TableCell>{convertMeasurement(35)}</TableCell>
                      <TableCell>{convertMeasurement(15)}</TableCell>
                      <TableCell>{convertMeasurement(22)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Work Briefcase</TableCell>
                      <TableCell>{convertMeasurement(45)}</TableCell>
                      <TableCell>{convertMeasurement(32)}</TableCell>
                      <TableCell>{convertMeasurement(12)}</TableCell>
                      <TableCell>{convertMeasurement(15)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="belts" className="mt-8">
                <h2 className="text-2xl font-serif font-medium mb-4">Belt Sizing</h2>
                <p className="text-muted-foreground mb-6">
                  To find your correct belt size, measure around where you wear your belt, typically at the waistline. We recommend ordering a belt that is 5-7 cm (2-3 inches) larger than your waist measurement.
                </p>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Size</TableHead>
                      <TableHead>Waist Measurement</TableHead>
                      <TableHead>Belt Length</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">S</TableCell>
                      <TableCell>{convertMeasurement(75)}-{convertMeasurement(85)}</TableCell>
                      <TableCell>{convertMeasurement(90)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">M</TableCell>
                      <TableCell>{convertMeasurement(85)}-{convertMeasurement(95)}</TableCell>
                      <TableCell>{convertMeasurement(100)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">L</TableCell>
                      <TableCell>{convertMeasurement(95)}-{convertMeasurement(105)}</TableCell>
                      <TableCell>{convertMeasurement(110)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">XL</TableCell>
                      <TableCell>{convertMeasurement(105)}-{convertMeasurement(115)}</TableCell>
                      <TableCell>{convertMeasurement(120)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="watches" className="mt-8">
                <h2 className="text-2xl font-serif font-medium mb-4">Watch Specifications</h2>
                <p className="text-muted-foreground mb-6">
                  Our watches come in different case sizes to suit different wrist sizes and style preferences.
                </p>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Case Diameter</TableHead>
                      <TableHead>Case Thickness</TableHead>
                      <TableHead>Strap Width</TableHead>
                      <TableHead>Min Wrist Size</TableHead>
                      <TableHead>Max Wrist Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Classic S</TableCell>
                      <TableCell>{convertMeasurement(36)}</TableCell>
                      <TableCell>{convertMeasurement(7)}</TableCell>
                      <TableCell>{convertMeasurement(18)}</TableCell>
                      <TableCell>{convertMeasurement(14)}</TableCell>
                      <TableCell>{convertMeasurement(20)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Classic M</TableCell>
                      <TableCell>{convertMeasurement(40)}</TableCell>
                      <TableCell>{convertMeasurement(8)}</TableCell>
                      <TableCell>{convertMeasurement(20)}</TableCell>
                      <TableCell>{convertMeasurement(15)}</TableCell>
                      <TableCell>{convertMeasurement(21)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Chronograph</TableCell>
                      <TableCell>{convertMeasurement(42)}</TableCell>
                      <TableCell>{convertMeasurement(11)}</TableCell>
                      <TableCell>{convertMeasurement(22)}</TableCell>
                      <TableCell>{convertMeasurement(16)}</TableCell>
                      <TableCell>{convertMeasurement(22)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
            
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-medium mb-4">How to Measure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-3">For Wallets & Bags</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li><strong>Length:</strong> Measure from one end to the other at the longest point</li>
                    <li><strong>Height:</strong> Measure from top to bottom at the tallest point</li>
                    <li><strong>Width:</strong> Measure from front to back at the widest point</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-3">For Belts</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Measure around your waist where you typically wear your belt</li>
                    <li>Add 5-7 cm (2-3 inches) to your waist measurement for the ideal belt size</li>
                    <li>If between sizes, we recommend going up to the larger size</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-ivory-light rounded-lg">
              <h3 className="text-xl font-medium mb-3">Need Additional Help?</h3>
              <p className="text-muted-foreground mb-4">
                If you need assistance determining the right size for you, please don't hesitate to contact our customer service team.
              </p>
              <a href="/contact" className="text-gold hover:underline">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SizeGuidePage;
