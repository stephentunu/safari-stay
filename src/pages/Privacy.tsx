import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last Updated: December 2024</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p className="text-muted-foreground">
              McDone Enterprises ("McDone", "we", "us", or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
            <h3 className="text-lg font-medium mt-4 mb-2">2.1 Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Name, email address, and phone number</li>
              <li>Government-issued ID for verification purposes</li>
              <li>Payment information (processed securely by payment providers)</li>
              <li>Profile photo and bio (optional)</li>
              <li>Communication history with hosts or guests</li>
            </ul>

            <h3 className="text-lg font-medium mt-4 mb-2">2.2 Usage Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and location data</li>
              <li>Pages visited and features used</li>
              <li>Search queries and booking history</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To facilitate bookings and payments</li>
              <li>To verify your identity and prevent fraud</li>
              <li>To communicate with you about your bookings</li>
              <li>To improve our platform and services</li>
              <li>To send promotional offers (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Hosts and Guests:</strong> Necessary booking information after confirmation</li>
              <li><strong>Payment Providers:</strong> To process transactions securely</li>
              <li><strong>Service Providers:</strong> Who assist in platform operations</li>
              <li><strong>Legal Authorities:</strong> When required by law</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We never sell your personal information to third parties.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Encrypted storage of sensitive data</li>
              <li>Regular security audits and testing</li>
              <li>Access controls and authentication measures</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              Under the Kenya Data Protection Act 2019, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information for as long as your account is active or as needed 
              to provide services. We may retain certain information for legal, tax, or regulatory purposes.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our platform is not intended for users under 18 years of age. We do not knowingly 
              collect personal information from children.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. International Transfers</h2>
            <p className="text-muted-foreground">
              Your information may be transferred to and processed in countries other than Kenya. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">10. Updates to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of significant 
              changes via email or platform notification.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">11. Contact Us</h2>
            <p className="text-muted-foreground">
              For privacy-related inquiries, contact our Data Protection Officer:
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>McDone Enterprises</strong><br />
                Email: privacy@mcdone.co.ke<br />
                Phone: +254 700 000 000<br />
                Address: Nairobi, Kenya
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
