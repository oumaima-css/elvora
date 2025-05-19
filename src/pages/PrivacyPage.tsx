
import React from 'react';
import PageLayout from '@/components/PageLayout';

const PrivacyPage = () => {
  return (
    <PageLayout title="Privacy Policy" subtitle="How we protect your information">
      <div className="py-16">
        <div className="luxury-container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>1. Introduction</h2>
              <p>
                At ELVORA, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, 
                use, and safeguard your information when you visit our website or make a purchase. As someone with an IT background, I've ensured 
                that our data practices go beyond the minimum requirements, implementing robust security measures to protect your information.
              </p>
              
              <h2>2. Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul>
                <li>Create an account</li>
                <li>Place an order</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact our customer support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p>
                This information may include your name, email address, postal address, phone number, and payment details. We also automatically 
                collect certain information when you visit our website, such as your IP address, browser type, and device information.
              </p>
              
              <h2>3. How We Use Your Information</h2>
              <p>
                We use your information for the following purposes:
              </p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Send transactional emails regarding your orders</li>
                <li>Provide customer support</li>
                <li>Send marketing communications (if you've opted in)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, 
                alteration, disclosure, or destruction. These measures include:
              </p>
              <ul>
                <li>End-to-end encryption for all transactions</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Strict access controls for our employees</li>
                <li>Continuous monitoring for suspicious activities</li>
              </ul>
              <p>
                However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
              
              <h2>5. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes for which we collected it, including 
                for legal, accounting, or reporting requirements.
              </p>
              
              <h2>6. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to improve your browsing experience, analyze website traffic, and personalize content. 
                You can control cookies through your browser settings.
              </p>
              
              <h2>7. Third-Party Sharing</h2>
              <p>
                We share your information with trusted third parties who assist us in operating our website, conducting our business, or serving you. 
                These include payment processors, shipping partners, and marketing service providers. We ensure that these partners respect your privacy 
                and protect your data.
              </p>
              
              <h2>8. Your Rights</h2>
              <p>
                Depending on your location, you may have the following rights regarding your data:
              </p>
              <ul>
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
              <p>
                To exercise these rights, please contact us through our Contact Us page.
              </p>
              
              <h2>9. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16.
              </p>
              
              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. 
                We will notify you of any significant changes by posting the new policy on our website.
              </p>
              
              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us at privacy@elvora.com.
              </p>
            </div>
            
            <div className="mt-16 p-6 bg-ivory-light rounded-lg text-center">
              <p className="text-lg font-medium">Last Updated: May 19, 2025</p>
              <p className="text-muted-foreground mt-2">
                This privacy policy is effective as of the date above and supersedes all previous versions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;
