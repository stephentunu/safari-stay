import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PropertyCard from "./PropertyCard";

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  images: string[];
}

interface SimilarPropertiesProps {
  currentPropertyId: string;
  location: string;
  priceRange: number;
}

const SimilarProperties = ({ currentPropertyId, location, priceRange }: SimilarPropertiesProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSimilarProperties();
  }, [currentPropertyId, location]);

  const fetchSimilarProperties = async () => {
    try {
      const minPrice = priceRange * 0.7;
      const maxPrice = priceRange * 1.3;

      const { data, error } = await supabase
        .from("properties")
        .select("id, title, location, price_per_night, images")
        .eq("is_approved", true)
        .eq("is_active", true)
        .neq("id", currentPropertyId)
        .ilike("location", `%${location}%`)
        .gte("price_per_night", minPrice)
        .lte("price_per_night", maxPrice)
        .limit(3);

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching similar properties:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || properties.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarProperties;
