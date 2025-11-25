import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";

interface PropertyCardProps {
  id?: string;
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  type?: string;
}

const PropertyCard = ({ id, image, title, location, price, rating, reviews, type = "Property" }: PropertyCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer border-border"
      onClick={() => id && navigate(`/property/${id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full">
          <FavoriteButton propertyId={id || ""} size="sm" />
        </div>
        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
          {type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span>{rating}</span>
            <span className="text-muted-foreground">({reviews})</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">KES {price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">/ night</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
