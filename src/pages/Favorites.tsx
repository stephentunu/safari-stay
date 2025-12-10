import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface Property {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  images: string[];
  property_type: string;
}

const Favorites = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndFetchFavorites();
  }, []);

  const checkAuthAndFetchFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to view your favorites",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    await fetchFavorites(user.id);
  };

  const fetchFavorites = async (userId: string) => {
    try {
      const favorites = localStorage.getItem(`favorites_${userId}`);
      
      if (!favorites) {
        setLoading(false);
        return;
      }

      const favList: string[] = JSON.parse(favorites);

      if (favList.length === 0) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .in("id", favList)
        .eq("is_approved", true)
        .eq("is_active", true);

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      console.error("Error fetching favorites:", error);
      toast({
        title: "Error",
        description: "Failed to load your favorites",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              My Favorites
            </h1>
            <p className="text-muted-foreground">Properties you've saved for later</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading your favorites...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No favorites yet</p>
              <p className="text-muted-foreground mb-6">Start exploring and save properties you love</p>
              <Button onClick={() => navigate("/")}>
                Explore Properties
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      </section>

      <Footer />
    </div>
  );
};

export default Favorites;
