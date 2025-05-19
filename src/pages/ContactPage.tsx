
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here in a real application
    console.log("Form submitted");
  };

  return (
    <PageLayout title="Contact Us" subtitle="We'd love to hear from you">
      <div className="py-16">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-serif font-medium mb-6">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-ivory-light rounded-full">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visit Our Store</h3>
                    <p className="text-muted-foreground">
                      123 Luxury Avenue<br />
                      Fashion District<br />
                      Paris, 75008<br />
                      France
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-ivory-light rounded-full">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      Customer Support: support@elvora.com<br />
                      General Inquiries: info@elvora.com<br />
                      Press: press@elvora.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-ivory-light rounded-full">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      Customer Support: +33 1 23 45 67 89<br />
                      International: +33 9 87 65 43 21
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-ivory-light rounded-full">
                    <Clock className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 10:00 AM - 7:00 PM<br />
                      Saturday: 11:00 AM - 6:00 PM<br />
                      Sunday: 12:00 PM - 5:00 PM<br />
                      <span className="text-sm italic">(All times local)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-medium mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <Select>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product Inquiry</SelectItem>
                      <SelectItem value="order">Order Status</SelectItem>
                      <SelectItem value="returns">Returns & Exchanges</SelectItem>
                      <SelectItem value="wholesale">Wholesale Opportunities</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    className="min-h-[150px]" 
                    required 
                  />
                </div>
                
                <Button type="submit" className="bg-gold hover:bg-gold-dark text-white">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-medium mb-6">Find Us</h2>
            <div className="h-96 bg-muted rounded-lg overflow-hidden">
              {/* In a real implementation, you would embed a Google Maps or similar map here */}
              <div className="w-full h-full flex items-center justify-center bg-evermore-dark/10">
                <p className="text-muted-foreground">Map placeholder - In the real app, this would be an embedded map showing the store location</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Shortcut */}
          <div className="mt-16 p-8 bg-ivory-light rounded-lg text-center">
            <h3 className="text-2xl font-serif font-medium mb-4">Have a question?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Check our frequently asked questions for quick answers to common inquiries.
            </p>
            <Button asChild variant="outline" className="border-evermore-dark text-evermore-dark hover:bg-evermore-dark hover:text-white">
              <a href="/faq">View FAQs</a>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
