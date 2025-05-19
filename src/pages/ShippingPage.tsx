
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ShippingPage = () => {
  return (
    <PageLayout title="Shipping & Returns" subtitle="Everything you need to know about our shipping and return policies">
      <div className="py-16">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="shipping">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
              </TabsList>
              
              <TabsContent value="shipping" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="p-6 border border-muted rounded-lg">
                    <h3 className="text-xl font-serif font-medium mb-3">Standard Shipping</h3>
                    <p className="text-muted-foreground mb-2">3-5 business days</p>
                    <p className="text-xl font-medium text-gold">$8.95</p>
                    <p className="text-sm text-muted-foreground mt-2">Free for orders over $100</p>
                  </div>
                  
                  <div className="p-6 border border-gold rounded-lg bg-ivory-light">
                    <div className="text-xs uppercase text-gold font-bold mb-2">Most Popular</div>
                    <h3 className="text-xl font-serif font-medium mb-3">Express Shipping</h3>
                    <p className="text-muted-foreground mb-2">1-2 business days</p>
                    <p className="text-xl font-medium text-gold">$14.95</p>
                    <p className="text-sm text-muted-foreground mt-2">Free for orders over $250</p>
                  </div>
                  
                  <div className="p-6 border border-muted rounded-lg">
                    <h3 className="text-xl font-serif font-medium mb-3">Next Day Delivery</h3>
                    <p className="text-muted-foreground mb-2">Guaranteed next business day</p>
                    <p className="text-xl font-medium text-gold">$24.95</p>
                    <p className="text-sm text-muted-foreground mt-2">Order before 2pm local time</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-serif font-medium mb-6">Shipping Information</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Processing Time</h3>
                    <p className="text-muted-foreground">
                      All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. 
                      You will receive another notification when your order has shipped.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">International Shipping</h3>
                    <p className="text-muted-foreground">
                      We ship to over 100 countries worldwide. International delivery typically takes 7-14 business days depending on the destination. 
                      Please note that customs duties and taxes may apply for international orders and are the responsibility of the customer.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Tracking Your Order</h3>
                    <p className="text-muted-foreground">
                      Once your order ships, you will receive a confirmation email with a tracking number that will allow you to monitor your shipment's 
                      progress. You can also track your order by logging into your account on our website.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Shipping Restrictions</h3>
                    <p className="text-muted-foreground">
                      There may be certain countries or regions we cannot ship to due to import/export restrictions. If you are uncertain about whether 
                      we ship to your location, please contact our customer service before placing your order.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="returns" className="mt-8">
                <div className="bg-ivory-light p-6 rounded-lg mb-12">
                  <h2 className="text-2xl font-serif font-medium mb-3">Our Return Policy</h2>
                  <p className="text-lg text-muted-foreground">
                    We want you to be completely satisfied with your ELVORA purchase. If you're not entirely happy with your order, we're here to help.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Return Eligibility</h3>
                    <p className="text-muted-foreground mb-4">
                      You may return most new, unopened items within 30 days of delivery for a full refund. We also accept returns of opened items within 
                      14 days if the item is in its original condition, unworn, undamaged, with all tags attached, and in the original packaging.
                    </p>
                    <p className="text-muted-foreground">
                      Custom-made or personalized items cannot be returned unless they arrive damaged or defective.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">How to Return an Item</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                      <li>Login to your account and navigate to your order history</li>
                      <li>Select the order and items you wish to return</li>
                      <li>Follow the prompts to generate a return authorization and shipping label</li>
                      <li>Package the item securely in its original packaging if possible</li>
                      <li>Attach the provided shipping label and drop off at the designated carrier location</li>
                    </ol>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Refunds</h3>
                    <p className="text-muted-foreground mb-4">
                      Once we receive your returned item, our team will inspect it and process your refund. The money will be refunded to the original 
                      payment method used for the purchase.
                    </p>
                    <p className="text-muted-foreground">
                      Refunds typically take 3-5 business days to appear in your account after we've processed the return, 
                      depending on your financial institution.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Exchanges</h3>
                    <p className="text-muted-foreground">
                      If you'd like to exchange an item for a different size or color, please follow the return process and then place a new order for 
                      the desired item. This ensures the fastest processing of your exchange.
                    </p>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-medium mb-4">Frequently Asked Questions</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Do I have to pay for return shipping?</AccordionTrigger>
                      <AccordionContent>
                        For standard returns, customers are responsible for return shipping costs unless the return is due to our error (such as 
                        shipping the wrong item) or if the product is defective. For luxury collection items over $500, we provide complimentary 
                        return shipping.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How long will it take to process my return?</AccordionTrigger>
                      <AccordionContent>
                        Returns are typically processed within 3-5 business days after we receive your package. You'll receive an email confirmation 
                        once your return has been processed.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Can I return a gift?</AccordionTrigger>
                      <AccordionContent>
                        Yes, gifts can be returned. You'll need the order number and the email address used to place the order. If you don't have this 
                        information, our customer service team can assist you. Gift returns are issued as store credit unless otherwise specified.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>What if my item arrives damaged?</AccordionTrigger>
                      <AccordionContent>
                        If your item arrives damaged or defective, please contact us within 48 hours of receipt. We'll arrange for a return and send 
                        you a replacement at no additional cost. Please take photos of the damaged item and packaging to help us process your claim quickly.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-16 p-6 text-center bg-evermore-dark text-white rounded-lg">
              <h3 className="text-xl font-medium mb-3">Need Additional Help?</h3>
              <p className="text-white/80 mb-4">
                Our customer service team is here to assist you with any questions about shipping, returns, or exchanges.
              </p>
              <a href="/contact" className="text-gold hover:text-gold-light hover:underline">Contact Customer Service</a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShippingPage;
