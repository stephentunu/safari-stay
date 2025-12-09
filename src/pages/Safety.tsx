import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, UserCheck, Lock, Eye, AlertTriangle, Phone, CheckCircle } from "lucide-react";

const Safety = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Safety is Our Priority</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At McDone, we're committed to creating a safe and trustworthy platform for 
            travelers and hosts. Learn about the measures we take to protect you.
          </p>
        </div>

        {/* Trust & Safety Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How We Keep You Safe</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <UserCheck className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Verified Hosts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every host on McDone goes through a verification process. We verify identity, 
                  contact information, and property ownership to ensure legitimacy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All payments are processed through secure, encrypted channels. We never share 
                  your payment details with hosts. M-Pesa and card payments are fully protected.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Property Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Properties are reviewed before listing and can only receive reviews from 
                  verified guests who actually stayed there.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Booking Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If a property isn't as advertised, we'll help you find alternative 
                  accommodation or provide a full refund under our Guest Protection Policy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Phone className="h-10 w-10 text-primary mb-4" />
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our support team is available around the clock. If you encounter any issues, 
                  we're just a call or message away.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Fraud Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced fraud detection systems monitor all transactions and listings 
                  to identify and prevent suspicious activity.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* For Travelers */}
        <section className="mb-16">
          <Card className="bg-muted/50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Safety Tips for Travelers</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-primary">Before Booking</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Read property reviews from verified guests
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Check the host's verification status
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Review the cancellation policy
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Use the platform messaging for communication
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-primary">During Your Stay</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Report any issues immediately through the app
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Keep your booking confirmation accessible
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Document any discrepancies with photos
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Contact support if you feel unsafe
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* For Hosts */}
        <section className="mb-16">
          <Card className="bg-muted/50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Safety Tips for Hosts</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-primary">Before Accepting Guests</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Review guest profiles and past reviews
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Communicate through the platform
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Set clear house rules
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Maintain adequate property insurance
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-primary">Protecting Your Property</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Document property condition before check-in
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Use secure key exchange methods
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Report damages promptly through the app
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      Use our Host Damage Protection program
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Contact */}
        <section>
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Emergency?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                If you're in immediate danger, contact local emergency services first. 
                For urgent booking-related issues, our emergency line is available 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-sm text-muted-foreground">Emergency Line</p>
                  <p className="text-xl font-bold">+254 700 000 000</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <p className="text-sm text-muted-foreground">Kenya Emergency</p>
                  <p className="text-xl font-bold">999</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Safety;
