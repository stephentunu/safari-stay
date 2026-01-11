import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Home, Star } from "lucide-react";

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  property_type: string;
}

const Marquee = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("id, title, location, price_per_night, property_type")
        .eq("is_approved", true)
        .eq("is_active", true)
        .limit(10);

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties for marquee:", error);
    } finally {
      setLoading(false);
    }
  };

  const staticAnnouncements = [
    "🏠 Find your dream stay in Kenya! Book verified properties with M-Pesa & Card payments",
    "✨ New: Explore Airbnbs, Resorts, Motels & More!",
    "🎉 Special Offers: Up to 30% off on selected coastal properties",
    "🌴 Discover Kenya's hidden gems - From Nairobi to Mombasa",
    "💳 Secure payments • Verified hosts • 24/7 Support",
  ];

  const formatPropertyType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Generate property announcements
  const propertyAnnouncements = properties.map((property) => ({
    id: property.id,
    text: `🔥 ${property.title} in ${property.location} - KES ${property.price_per_night.toLocaleString()}/night`,
    type: property.property_type,
  }));

  return (
    <div className="bg-gradient-to-r from-primary via-primary/90 to-primary overflow-hidden py-3 border-b border-primary-foreground/10">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* Static announcements */}
        {staticAnnouncements.map((text, index) => (
          <span
            key={`static-${index}`}
            className="mx-8 text-primary-foreground font-medium text-sm flex items-center gap-2"
          >
            {text}
          </span>
        ))}
        
        {/* Property listings */}
        {!loading && propertyAnnouncements.length > 0 && (
          <>
            <span className="mx-4 text-primary-foreground/60">|</span>
            <span className="mx-4 text-primary-foreground font-bold text-sm flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              FEATURED PROPERTIES
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </span>
          </>
        )}
        
        {propertyAnnouncements.map((property) => (
          <span
            key={property.id}
            className="mx-8 text-primary-foreground font-medium text-sm flex items-center gap-2 bg-primary-foreground/10 px-4 py-1 rounded-full"
          >
            <Home className="h-4 w-4" />
            {property.text}
            <span className="text-xs bg-primary-foreground/20 px-2 py-0.5 rounded-full">
              {formatPropertyType(property.type)}
            </span>
          </span>
        ))}

        {/* Duplicate for seamless loop */}
        {staticAnnouncements.map((text, index) => (
          <span
            key={`static-dup-${index}`}
            className="mx-8 text-primary-foreground font-medium text-sm flex items-center gap-2"
          >
            {text}
          </span>
        ))}
        
        {propertyAnnouncements.map((property) => (
          <span
            key={`dup-${property.id}`}
            className="mx-8 text-primary-foreground font-medium text-sm flex items-center gap-2 bg-primary-foreground/10 px-4 py-1 rounded-full"
          >
            <Home className="h-4 w-4" />
            {property.text}
            <span className="text-xs bg-primary-foreground/20 px-2 py-0.5 rounded-full">
              {formatPropertyType(property.type)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
