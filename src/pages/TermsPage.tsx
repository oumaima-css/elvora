
import React from 'react';
import PageLayout from '@/components/PageLayout';

const TermsPage = () => {
  return (
    <PageLayout title="Terms of Service" subtitle="Please read these terms carefully">
      <div className="py-16">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Welcome to ELVORA. By accessing our website and making purchases, you agree to be bound by these Terms of Service. 
                These terms outline the rules for using our website and services, so please read them carefully.
              </p>
              
              <h2>2. Interpretation</h2>
              <p>
                The following terminology applies throughout these Terms of Service: "Customer," "You," and "Your" refers to you, the person 
                accessing this website and accepting these terms. "The Company," "Ourselves," "We," "Our," and "Us," refers to ELVORA. 
                "Party," "Parties," or "Us," refers to both the Customer and ourselves.
              </p>
              
              <h2>3. Products</h2>
              <p>
                We make every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that 
                your computer monitor's display of any color will be accurate. We reserve the right to limit sales of our products to any person, 
                geographic region, or jurisdiction.
              </p>
              
              <h2>4. Pricing & Payment</h2>
              <p>
                All prices are shown in the selected currency and do not include taxes and shipping costs, which are calculated during checkout. 
                We reserve the right to modify prices at any time. We accept various payment methods as indicated during checkout. All payments 
                are processed securely through our payment providers.
              </p>
              
              <h2>5. Shipping & Delivery</h2>
              <p>
                We ship worldwide. Delivery times depend on your location and the shipping method selected. While we make every effort to meet 
                estimated delivery times, delays may occasionally occur due to unforeseen circumstances. We are not liable for any delays caused 
                by events outside our control.
              </p>
              
              <h2>6. Returns & Refunds</h2>
              <p>
                Please refer to our Shipping & Returns policy for detailed information on returns, exchanges, and refunds. All returns must be 
                in their original condition with all tags attached.
              </p>
              
              <h2>7. Intellectual Property</h2>
              <p>
                All content on our website, including but not limited to text, graphics, logos, images, and software, is the property of ELVORA 
                and is protected by intellectual property laws. You may not use, reproduce, or distribute any content from our website without 
                our express written permission.
              </p>
              
              <h2>8. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate information. You are responsible for maintaining the confidentiality 
                of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
              
              <h2>9. Limitation of Liability</h2>
              <p>
                ELVORA shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of 
                our services. Our total liability to you for any damages shall not exceed the amount paid by you for the product or service in question.
              </p>
              
              <h2>10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
              </p>
              
              <h2>11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued 
                use of our services after any such changes constitutes your acceptance of the new terms.
              </p>
              
              <h2>12. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us through our Contact Us page or email us at support@elvora.com.
              </p>
            </div>
            
            <div className="mt-16 p-6 bg-ivory-light rounded-lg text-center">
              <p className="text-lg font-medium">Last Updated: May 19, 2025</p>
              <p className="text-muted-foreground mt-2">
                These terms are effective as of the date above and supersede all previous versions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsPage;
