import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import FilterSection from "@/components/FilterSection";
import heroBg from "@/assets/hero-bg.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, CreditCard, Headphones } from "lucide-react";

const Index = () => {
  const featuredProperties = [
    {
      id: 1,
      image: property1,
      title: "Diani Beach Oceanfront Resort",
      location: "Diani Beach, Mombasa",
      price: 12500,
      rating: 4.9,
      reviews: 342,
      type: "Beach Resort"
    },
    {
      id: 2,
      image: property2,
      title: "Maasai Mara Luxury Safari Camp",
      location: "Maasai Mara, Narok",
      price: 28000,
      rating: 5.0,
      reviews: 189,
      type: "Safari Lodge"
    },
    {
      id: 3,
      image: property3,
      title: "Nairobi Skyline Penthouse",
      location: "Westlands, Nairobi",
      price: 15000,
      rating: 4.8,
      reviews: 267,
      type: "Apartment"
    },
    {
      id: 4,
      image: property4,
      title: "Kenya Highlands Cottage",
      location: "Nanyuki, Laikipia",
      price: 8500,
      rating: 4.7,
      reviews: 154,
      type: "Cottage"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroBg})` }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Discover Kenya's Finest Stays
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Book verified accommodations with M-Pesa payments. Fast, secure, and built for Africa.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Verified Properties</h3>
              <p className="text-sm text-muted-foreground">All hosts are verified for your safety</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">M-Pesa Payments</h3>
              <p className="text-sm text-muted-foreground">Pay instantly with M-Pesa or card</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Bookings</h3>
              <p className="text-sm text-muted-foreground">Your data and payments are protected</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">We're here to help anytime you need</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
            <p className="text-muted-foreground">Discover the best stays across Kenya</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterSection />
            </div>
            
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
                {featuredProperties.map((property) => (
                  <PropertyCard 
                    key={`duplicate-${property.id}`} 
                    {...property} 
                    title={property.title + " - Special Offer"}
                    price={property.price - 1000}
                  />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button size="lg" variant="outline">
                  Load More Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-hover">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Host on McDone?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            List your property and reach thousands of travelers across Kenya and beyond.
          </p>
          <Button size="lg" variant="accent" className="text-lg px-8">
            Become a Host Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">McDone</h3>
              <p className="text-sm text-muted-foreground">
                Kenya's leading accommodation booking platform. Fast, secure, and reliable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 McDone Bookings. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
