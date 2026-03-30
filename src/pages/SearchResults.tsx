import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import FilterSection from "@/components/FilterSection";
import SearchBar from "@/components/SearchBar";
import SortControls from "@/components/SortControls";
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
  amenities: string[];
  created_at: string;
  avg_rating?: number;
  review_count?: number;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recommended");
  const { toast } = useToast();

  const keyword = searchParams.get("keyword");
  const location = searchParams.get("location");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const types = searchParams.get("types");
  const amenities = searchParams.get("amenities");

  useEffect(() => {
    searchProperties();
  }, [keyword, location, checkIn, checkOut, guests, types, maxPrice]);

  useEffect(() => {
    applyFilters();
  }, [properties, minPrice, maxPrice, types, amenities, sortBy]);

  const searchProperties = async () => {
    try {
      setLoading(true);
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
      if (maxPrice && !minPrice) query = query.lte("price_per_night", parseInt(maxPrice));
      if (guests) query = query.gte("max_guests", parseInt(guests));

      const { data, error } = await query;
      if (error) throw error;

      if (checkIn && checkOut && data) {
        const availableProperties = await filterAvailableProperties(data, checkIn, checkOut);
        const withReviews = await fetchReviewData(availableProperties);
        setProperties(withReviews);
      } else {
        const withReviews = await fetchReviewData(data || []);
        setProperties(withReviews);
      }
    } catch (error: any) {
      console.error("Error searching properties:", error);
      toast({ title: "Error", description: "Failed to search properties", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (minPrice || maxPrice) {
      const min = minPrice ? parseInt(minPrice) : 0;
      const max = maxPrice ? parseInt(maxPrice) : Infinity;
      filtered = filtered.filter((p) => p.price_per_night >= min && p.price_per_night <= max);
    }

    if (types) {
      const typeList = types.toLowerCase().split(",");
      filtered = filtered.filter((p) => typeList.includes(p.property_type.toLowerCase()));
    }

    if (amenities) {
      const amenityList = amenities.toLowerCase().split(",");
      filtered = filtered.filter((p) =>
        amenityList.every((amenity) => p.amenities?.some((a) => a.toLowerCase().includes(amenity)))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.price_per_night - b.price_per_night);
        break;
      case "price_high":
        filtered.sort((a, b) => b.price_per_night - a.price_per_night);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    setFilteredProperties(filtered);
  };

  const filterAvailableProperties = async (properties: Property[], checkIn: string, checkOut: string) => {
    const propertyIds = properties.map((p) => p.id);
    const { data: bookings } = await supabase
      .from("bookings")
      .select("property_id")
      .in("property_id", propertyIds)
      .in("status", ["pending", "confirmed"])
      .or(`and(check_in_date.lte.${checkOut},check_out_date.gte.${checkIn})`);

    const bookedPropertyIds = new Set(bookings?.map((b) => b.property_id) || []);
    return properties.filter((p) => !bookedPropertyIds.has(p.id));
  };

  const displayProperties = minPrice || maxPrice || types || amenities || sortBy !== "recommended"
    ? filteredProperties
    : properties;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-8 bg-muted/30 mt-16">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">
              {keyword && location ? `"${keyword}" in ${location}` : keyword ? `Results for "${keyword}"` : location ? `Properties in ${location}` : "Search Results"}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterSection />
            </div>

            <div className="lg:col-span-3">
              <SortControls value={sortBy} onChange={setSortBy} resultCount={displayProperties.length} />

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Searching properties...</p>
                </div>
              ) : displayProperties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg font-medium mb-2">No properties found</p>
                  <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayProperties.map((property) => (
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
