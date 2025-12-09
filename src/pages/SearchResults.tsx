import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import FilterSection from "@/components/FilterSection";
import SearchBar from "@/components/SearchBar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  images: string[];
  property_type: string;
  max_guests: number;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const location = searchParams.get("location");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  useEffect(() => {
    searchProperties();
  }, [location, checkIn, checkOut, guests]);

  const searchProperties = async () => {
    try {
      let query = supabase
        .from("properties")
        .select("*")
        .eq("is_approved", true)
        .eq("is_active", true);

      // Filter by location if provided
      if (location) {
        query = query.ilike("location", `%${location}%`);
      }

      // Filter by guest capacity if provided
      if (guests) {
        query = query.gte("max_guests", parseInt(guests));
      }

      const { data, error } = await query;

      if (error) throw error;

      // Filter out properties with overlapping bookings
      if (checkIn && checkOut && data) {
        const availableProperties = await filterAvailableProperties(data, checkIn, checkOut);
        setProperties(availableProperties);
      } else {
        setProperties(data || []);
      }
    } catch (error: any) {
      console.error("Error searching properties:", error);
      toast({
        title: "Error",
        description: "Failed to search properties",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAvailableProperties = async (properties: Property[], checkIn: string, checkOut: string) => {
    const propertyIds = properties.map(p => p.id);

    const { data: bookings } = await supabase
      .from("bookings")
      .select("property_id")
      .in("property_id", propertyIds)
      .in("status", ["pending", "confirmed"])
      .or(`and(check_in_date.lte.${checkOut},check_out_date.gte.${checkIn})`);

    const bookedPropertyIds = new Set(bookings?.map(b => b.property_id) || []);
    return properties.filter(p => !bookedPropertyIds.has(p.id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {location ? `Properties in ${location}` : "Search Results"}
            </h1>
            <p className="text-muted-foreground">
              {properties.length} properties found
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterSection />
            </div>
            
            <div className="lg:col-span-3">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Searching properties...</p>
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg font-medium mb-2">No properties found</p>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      image={property.images[0]}
                      title={property.title}
                      location={property.location}
                      price={property.price_per_night}
                      rating={4.5}
                      reviews={0}
                      type={property.property_type}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchResults;
