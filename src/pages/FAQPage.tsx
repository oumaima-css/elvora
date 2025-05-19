
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const faqs: FAQItem[] = [
    // Orders & Shipping
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping is 1-2 business days, and Next Day delivery is also available. International shipping varies by destination but usually takes 7-14 business days.",
      category: "orders"
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 100 countries worldwide. International customers may be subject to import duties and taxes, which are the responsibility of the recipient.",
      category: "orders"
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website and viewing your order history.",
      category: "orders"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All payments are securely processed through our payment providers.",
      category: "orders"
    },
    
    // Products
    {
      question: "Are your products authentic leather?",
      answer: "Yes, we use genuine full-grain and top-grain leather for our leather products. We also offer high-quality vegan alternatives for customers who prefer non-animal materials.",
      category: "products"
    },
    {
      question: "How do I care for my ELVORA leather product?",
      answer: "We recommend gentle cleaning with a soft cloth and specialized leather cleaner. Avoid water and harsh chemicals. Apply leather conditioner every few months to maintain suppleness. Store in the provided dust bag when not in use.",
      category: "products"
    },
    {
      question: "Are your watches water-resistant?",
      answer: "Most of our watches are water-resistant to 30 meters (3 ATM), which means they can withstand splashes and brief immersion in water. However, they are not suitable for swimming or diving. Our premium collections offer water resistance up to 100 meters.",
      category: "products"
    },
    {
      question: "Do you offer product warranties?",
      answer: "Yes, all our products come with a 1-year warranty against manufacturing defects. Our premium collections include extended warranties of up to 5 years.",
      category: "products"
    },
    
    // Returns & Exchanges
    {
      question: "What is your return policy?",
      answer: "We accept returns of unworn, undamaged items with all original tags and packaging within 30 days of purchase. Opened items may be returned within 14 days. Custom or personalized items cannot be returned unless defective.",
      category: "returns"
    },
    {
      question: "How do I return an item?",
      answer: "To initiate a return, log into your account, find your order, and follow the return prompts. You'll receive a return authorization and shipping label. Package the item securely and drop it off at the specified carrier location.",
      category: "returns"
    },
    {
      question: "How long does it take to process a refund?",
      answer: "We process returns within 3-5 business days after receiving the returned item. Refunds typically appear in your account within 3-5 additional business days, depending on your financial institution.",
      category: "returns"
    },
    {
      question: "Can I exchange an item for a different size or color?",
      answer: "For the fastest service, we recommend returning the original item and placing a new order for the size or color you prefer. This ensures you receive the replacement quickly without waiting for us to process the exchange.",
      category: "returns"
    },
    
    // Account & Technical
    {
      question: "How do I create an account?",
      answer: "Click the 'Account' icon in the top right corner of our website and select 'Create Account'. Enter your email address and create a password. You can also create an account during the checkout process.",
      category: "account"
    },
    {
      question: "I forgot my password. How do I reset it?",
      answer: "Click the 'Account' icon, select 'Login', then click 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password.",
      category: "account"
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely. We use industry-standard encryption and security protocols to protect your data. We never store your complete credit card information on our servers. All transactions are processed through secure, PCI-compliant payment providers.",
      category: "account"
    },
    {
      question: "How can I update my personal information?",
      answer: "Log into your account, navigate to 'Account Settings', and update your information as needed. You can change your address, phone number, email preferences, and other details.",
      category: "account"
    }
  ];
  
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'products', name: 'Products' },
    { id: 'returns', name: 'Returns & Exchanges' },
    { id: 'account', name: 'Account & Technical' }
  ];

  return (
    <PageLayout title="Frequently Asked Questions" subtitle="Find answers to common questions about our products and services">
      <div className="py-16">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative mb-12">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search our FAQs..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="mb-2"
                >
                  {category.name}
                </Button>
              ))}
            </div>
            
            {/* FAQs */}
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No matching FAQs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query or category filter, or contact us for specific questions.
                </p>
              </div>
            )}
            
            <div className="mt-16 p-8 bg-ivory-light rounded-lg text-center">
              <h3 className="text-2xl font-serif font-medium mb-4">Still have questions?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Our customer support team is always ready to help with any questions you might have.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-gold hover:bg-gold-dark text-white">
                  <a href="/contact">Contact Us</a>
                </Button>
                <Button variant="outline">
                  Email Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQPage;
