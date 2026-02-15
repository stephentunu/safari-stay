import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import FilterSection from "@/components/FilterSection";
import Marquee from "@/components/Marquee";
import heroBg from "@/assets/hero-bg.jpg";
import property1 from "@/assets/property-1.jpg";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, CreditCard, Headphones } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import NewsletterSignup from "@/components/NewsletterSignup";

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
}

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchResults, setSearchResults] = useState<Property[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("is_approved", true)
        .eq("is_active", true)
        .limit(6);

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHomeSearch = useCallback(async (params: URLSearchParams) => {
    const keyword = params.get("keyword");
    const location = params.get("location");
    const types = params.get("types");
    const maxPrice = params.get("maxPrice");
    const guests = params.get("guests");

    if (!keyword && !location && !types && !maxPrice && !guests) {
      setSearchResults(null);
      return;
    }

    try {
      setSearchLoading(true);
      let query = supabase
        .from("properties")
        .select("*")
        .eq("is_approved", true)
        .eq("is_active", true);

      if (location) query = query.ilike("location", `%${location}%`);
      if (keyword) {
        query = query.or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`);
      }
      if (types) {
        const typeList = types.split(",");
        if (typeList.length === 1) {
          query = query.eq("property_type", typeList[0] as any);
        } else {
          query = query.in("property_type", typeList as any[]);
        }
      }
      if (maxPrice) query = query.lte("price_per_night", parseInt(maxPrice));
      if (guests) query = query.gte("max_guests", parseInt(guests));

      const { data, error } = await query.limit(12);
      if (error) throw error;
      setSearchResults(data || []);
    } catch (error: any) {
      console.error("Error searching:", error);
      toast({ title: "Error", description: "Failed to search properties", variant: "destructive" });
    } finally {
      setSearchLoading(false);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Marquee Advertisement */}
      <Marquee />
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
          <SearchBar onSearch={handleHomeSearch} />
        </div>
      </section>

      {/* Inline Search Results */}
      {searchResults !== null && (
        <section className="py-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              {searchLoading ? "Searching..." : `${searchResults.length} ${searchResults.length === 1 ? "property" : "properties"} found`}
            </h2>
            {searchLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Searching properties...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lg font-medium mb-2">No properties match your search</p>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {searchResults.map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    image={property.images[0] || property1}
                    images={property.images}
                    title={property.title}
                    location={property.location}
                    price={property.price_per_night}
                    rating={4.5}
                    reviews={0}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading properties...</p>
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg font-medium mb-2">No properties available yet</p>
                  <p className="text-muted-foreground">Be the first to list your property on McDone!</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.map((property) => (
                      <PropertyCard 
                        key={property.id}
                        id={property.id}
                        image={property.images[0] || property1}
                        images={property.images}
                        title={property.title}
                        location={property.location}
                        price={property.price_per_night}
                        rating={4.5}
                        reviews={0}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button size="lg" variant="outline">
                      Load More Properties
                    </Button>
                  </div>
                </>
              )}
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
          <Button size="lg" variant="accent" className="text-lg px-8" onClick={() => navigate("/add-property")}>
            Become a Host Today
          </Button>
        </div>
      </section>

      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Index;
