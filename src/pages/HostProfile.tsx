import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Star, Clock, MessageCircle, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface HostData {
  id: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  is_verified_host: boolean;
  response_rate: number | null;
  response_time: string | null;
  host_since: string | null;
  languages: string[] | null;
}

interface HostProperty {
  id: string;
  title: string;
  location: string;
  price_per_night: number;
  images: string[];
  property_type: string;
}

const HostProfile = () => {
  const { hostId } = useParams();
  const [host, setHost] = useState<HostData | null>(null);
  const [properties, setProperties] = useState<HostProperty[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hostId) {
      fetchHostData();
    }
  }, [hostId]);

  const fetchHostData = async () => {
    try {
      const [hostRes, propsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", hostId).single(),
        supabase.from("properties").select("*").eq("host_id", hostId).eq("is_approved", true).eq("is_active", true),
      ]);

      if (hostRes.data) setHost(hostRes.data as unknown as HostData);
      if (propsRes.data) {
        setProperties(propsRes.data);
        
        // Fetch review stats for all properties
        const propertyIds = propsRes.data.map((p: any) => p.id);
        if (propertyIds.length > 0) {
          const { data: reviews } = await supabase
            .from("reviews")
            .select("rating")
            .in("property_id", propertyIds);
          
          if (reviews && reviews.length > 0) {
            setReviewCount(reviews.length);
            setAvgRating(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching host data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 mt-16 text-center">
          <p className="text-muted-foreground">Loading host profile...</p>
        </div>
      </div>
    );
  }

  if (!host) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Host Info Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {host.full_name?.charAt(0) || "H"}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold mb-1">{host.full_name || "Host"}</h1>
                {host.is_verified_host && (
                  <Badge className="mb-3 gap-1">
                    <Shield className="h-3 w-3" />
                    Verified Host
                  </Badge>
                )}
                {host.bio && (
                  <p className="text-sm text-muted-foreground mb-4">{host.bio}</p>
                )}

                <div className="space-y-3 text-sm text-left">
                  {avgRating > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-accent" />
                      <span>{avgRating.toFixed(1)} rating · {reviewCount} reviews</span>
                    </div>
                  )}
                  {host.response_rate && (
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{host.response_rate}% response rate</span>
                    </div>
                  )}
                  {host.response_time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Responds {host.response_time}</span>
                    </div>
                  )}
                  {host.host_since && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Hosting since {format(new Date(host.host_since), "MMM yyyy")}</span>
                    </div>
                  )}
                  {host.languages && host.languages.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {host.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Host Listings */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6">
              {host.full_name || "Host"}'s Listings ({properties.length})
            </h2>
            {properties.length === 0 ? (
              <p className="text-muted-foreground">No active listings.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    image={property.images?.[0] || ""}
                    title={property.title}
                    location={property.location}
                    price={property.price_per_night}
                    rating={avgRating}
                    reviews={reviewCount}
                    type={property.property_type}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HostProfile;
