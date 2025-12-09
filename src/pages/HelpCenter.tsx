import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Home, CreditCard, User, Shield, Calendar, MessageCircle, Phone, Mail } from "lucide-react";

const HelpCenter = () => {
  const categories = [
    {
      icon: Home,
      title: "Booking",
      description: "How to search, book, and manage reservations",
      articles: 12
    },
    {
      icon: CreditCard,
      title: "Payments",
      description: "M-Pesa, cards, refunds, and billing",
      articles: 8
    },
    {
      icon: User,
      title: "Account",
      description: "Profile settings, password, and preferences",
      articles: 6
    },
    {
      icon: Shield,
      title: "Safety & Trust",
      description: "Verification, security, and protection",
      articles: 10
    },
    {
      icon: Calendar,
      title: "Cancellations",
      description: "Cancellation policies and procedures",
      articles: 5
    },
    {
      icon: Home,
      title: "Hosting",
      description: "Listing properties and managing bookings",
      articles: 15
    },
  ];

  const popularArticles = [
    "How to make a booking on McDone",
    "How to pay with M-Pesa",
    "How to cancel a reservation",
    "How to become a host",
    "Understanding cancellation policies",
    "How to leave a review",
    "Managing your account settings",
    "What to do if there's a problem with my stay",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to your questions and learn how to get the most out of McDone.
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.articles} articles</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="grid md:grid-cols-2 gap-4">
                {popularArticles.map((article, idx) => (
                  <li key={idx}>
                    <a 
                      href="#" 
                      className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <span className="text-primary">→</span>
                      {article}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Quick Links */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>For Travelers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-colors">
                  Frequently Asked Questions
                </Link>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Booking Guide
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Payment Methods
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Cancellation Policies
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>For Hosts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Getting Started as a Host
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Listing Your Property
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Managing Reservations
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Host Payouts
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Still Need Help?</h2>
                <p className="text-muted-foreground">
                  Our support team is available 24/7 to assist you
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team in real-time
                  </p>
                  <Button>Start Chat</Button>
                </div>
                
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us at +254 700 000 000
                  </p>
                  <Button variant="outline">Call Now</Button>
                </div>
                
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    support@mcdone.co.ke
                  </p>
                  <Button variant="outline">Send Email</Button>
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

export default HelpCenter;
