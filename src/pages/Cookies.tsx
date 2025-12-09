import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Cookies = () => {
  const cookieTypes = [
    {
      type: "Essential",
      purpose: "Required for the platform to function properly",
      duration: "Session / 1 year",
      examples: "Authentication, security tokens"
    },
    {
      type: "Functional",
      purpose: "Remember your preferences and settings",
      duration: "1 year",
      examples: "Language, currency preferences"
    },
    {
      type: "Analytics",
      purpose: "Understand how visitors interact with our platform",
      duration: "2 years",
      examples: "Page views, feature usage"
    },
    {
      type: "Marketing",
      purpose: "Deliver relevant advertisements",
      duration: "1 year",
      examples: "Ad targeting, campaign tracking"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Cookie Policy</CardTitle>
            <p className="text-muted-foreground">Last Updated: December 2024</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. What Are Cookies?</h2>
            <p className="text-muted-foreground">
              Cookies are small text files that are stored on your device when you visit a website. 
              They help websites remember information about your visit, making your next visit easier 
              and the site more useful to you.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Cookies</h2>
            <p className="text-muted-foreground mb-4">
              McDone uses cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our platform</li>
              <li>Improve our services and user experience</li>
              <li>Deliver personalized content and ads</li>
              <li>Measure the effectiveness of our marketing</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Examples</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cookieTypes.map((cookie, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{cookie.type}</TableCell>
                      <TableCell>{cookie.purpose}</TableCell>
                      <TableCell>{cookie.duration}</TableCell>
                      <TableCell>{cookie.examples}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Essential Cookies</h2>
            <p className="text-muted-foreground">
              These cookies are strictly necessary for the platform to function. They enable core 
              functionality such as security, account access, and remembering items in your cart. 
              You cannot opt out of these cookies.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Third-Party Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We may use third-party services that set their own cookies, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Analytics Services:</strong> To measure platform performance</li>
              <li><strong>Payment Providers:</strong> To process secure payments</li>
              <li><strong>Social Media:</strong> For sharing and login features</li>
              <li><strong>Advertising Partners:</strong> To deliver relevant ads</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Managing Your Cookie Preferences</h2>
            <p className="text-muted-foreground mb-4">
              You can control and manage cookies in several ways:
            </p>
            <h3 className="text-lg font-medium mt-4 mb-2">Browser Settings</h3>
            <p className="text-muted-foreground">
              Most browsers allow you to refuse or delete cookies. The exact method varies by browser:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
              <li>Chrome: Settings → Privacy and Security → Cookies</li>
              <li>Firefox: Options → Privacy & Security → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Privacy → Cookies</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Please note that blocking certain cookies may impact your experience on our platform.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Do Not Track</h2>
            <p className="text-muted-foreground">
              Some browsers have a "Do Not Track" feature that signals to websites that you do not 
              want your online activity tracked. We currently respond to these signals.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Updates to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for legal reasons. We will notify you of significant changes.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about our use of cookies, please contact us:
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

export default Cookies;
