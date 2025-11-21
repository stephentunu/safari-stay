import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface FavoriteButtonProps {
  propertyId: string;
  size?: "sm" | "default" | "lg";
}

const FavoriteButton = ({ propertyId, size = "default" }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkFavoriteStatus();
  }, [propertyId]);

  const checkFavoriteStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const favorites = localStorage.getItem(`favorites_${user.id}`);
    if (favorites) {
      const favList = JSON.parse(favorites);
      setIsFavorite(favList.includes(propertyId));
    }
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setLoading(true);

    try {
      const storageKey = `favorites_${user.id}`;
      const favorites = localStorage.getItem(storageKey);
      let favList: string[] = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        favList = favList.filter(id => id !== propertyId);
        toast({
          title: "Removed from favorites",
          description: "Property removed from your wishlist",
        });
      } else {
        favList.push(propertyId);
        toast({
          title: "Added to favorites",
          description: "Property saved to your wishlist",
        });
      }

      localStorage.setItem(storageKey, JSON.stringify(favList));
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleFavorite}
      disabled={loading}
      className="hover:scale-110 transition-transform"
    >
      <Heart
        className={`h-5 w-5 ${
          isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
        }`}
      />
    </Button>
  );
};

export default FavoriteButton;
