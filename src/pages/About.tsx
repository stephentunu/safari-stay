import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Globe, Award, Heart, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About McDone</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're building Africa's most trusted accommodation booking platform, 
            connecting travelers with verified hosts for unforgettable experiences.
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Founded in 2024, McDone was born from a simple observation: African travelers deserve a booking platform that truly understands their needs. While global platforms existed, none were optimized for local payment methods, local hosts, or the unique travel experiences Africa offers.
              </p>
              <p className="text-muted-foreground mb-4">
                Our founders, a team of Kenyan entrepreneurs and technologists, set out to build something different. Starting in Nairobi, we created a platform that accepts M-Pesa as a primary payment method, verifies every host, and celebrates the diversity of African hospitality.
              </p>
              <p className="text-muted-foreground">
                Today, McDone connects thousands of travelers with verified accommodations across Kenya, from luxury villas on the coast to cozy apartments in the city. We're expanding across East Africa and beyond, always staying true to our mission of making travel accessible and secure for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To make accommodation booking fast, secure, and accessible for every African traveler through local payment solutions and verified properties.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-8">
                <Globe className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become Africa's leading travel platform, showcasing the continent's incredible hospitality to the world while empowering local hosts to thrive.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Trust & Safety</h4>
                <p className="text-sm text-muted-foreground">
                  Every host is verified. Every payment is secure. Your safety is our priority.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-10 w-10 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Community First</h4>
                <p className="text-sm text-muted-foreground">
                  We empower local hosts and celebrate African hospitality traditions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-10 w-10 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Excellence</h4>
                <p className="text-sm text-muted-foreground">
                  We continuously improve to deliver the best booking experience possible.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: "James Mwangi", role: "CEO & Founder", image: "JM" },
              { name: "Sarah Ochieng", role: "COO", image: "SO" },
              { name: "David Kimani", role: "CTO", image: "DK" },
              { name: "Grace Wanjiku", role: "Head of Operations", image: "GW" },
            ].map((member, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">{member.image}</span>
                  </div>
                  <h4 className="font-semibold">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">10,000+</p>
              <p className="text-muted-foreground">Happy Travelers</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
              <p className="text-muted-foreground">Verified Properties</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">47</p>
              <p className="text-muted-foreground">Counties Covered</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
