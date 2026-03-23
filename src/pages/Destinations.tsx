import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight, Compass, Sun, Mountain, Waves, TreePine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DESTINATIONS = [
  {
    id: "nairobi",
    name: "Nairobi",
    tagline: "The Safari Capital",
    description: "Kenya's vibrant capital blends urban sophistication with wild encounters. Visit Nairobi National Park, the Giraffe Centre, and world-class restaurants — all within city limits.",
    image: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&h=500&fit=crop",
    icon: Sun,
    highlights: ["Nairobi National Park", "Karen Blixen Museum", "Giraffe Centre", "Maasai Market"],
    propertyCount: 45,
    avgPrice: 4500,
    rating: 4.6,
  },
  {
    id: "mombasa",
    name: "Mombasa & Coast",
    tagline: "Tropical Paradise",
    description: "White sandy beaches, crystal-clear waters, and rich Swahili heritage. From Diani to Watamu, the Kenyan coast offers unforgettable beach holidays and water adventures.",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&h=500&fit=crop",
    icon: Waves,
    highlights: ["Diani Beach", "Fort Jesus", "Watamu Marine Park", "Old Town"],
    propertyCount: 62,
    avgPrice: 6000,
    rating: 4.7,
  },
  {
    id: "maasai-mara",
    name: "Maasai Mara",
    tagline: "The Great Migration",
    description: "Home to the world-famous Great Migration, the Mara offers unparalleled wildlife viewing with luxury lodges and tented camps set in breathtaking savannah landscapes.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=500&fit=crop",
    icon: Mountain,
    highlights: ["Great Migration", "Big Five Safaris", "Hot Air Balloons", "Maasai Villages"],
    propertyCount: 28,
    avgPrice: 15000,
    rating: 4.9,
  },
  {
    id: "nakuru",
    name: "Nakuru & Rift Valley",
    tagline: "Flamingo Paradise",
    description: "Lake Nakuru's flamingo-lined shores and the dramatic Great Rift Valley offer stunning landscapes, wildlife, and unique geothermal wonders.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=500&fit=crop",
    icon: TreePine,
    highlights: ["Lake Nakuru", "Lake Naivasha", "Hell's Gate", "Menengai Crater"],
    propertyCount: 20,
    avgPrice: 5500,
    rating: 4.5,
  },
  {
    id: "mount-kenya",
    name: "Mount Kenya Region",
    tagline: "Africa's Second Peak",
    description: "Explore the towering peaks, lush forests, and diverse wildlife of the Mount Kenya region — ideal for trekking, mountain biking, and eco-tourism.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=500&fit=crop",
    icon: Mountain,
    highlights: ["Mt. Kenya Trek", "Ol Pejeta Conservancy", "Nanyuki Town", "Sweetwaters"],
    propertyCount: 15,
    avgPrice: 8000,
    rating: 4.6,
  },
  {
    id: "lamu",
    name: "Lamu Archipelago",
    tagline: "UNESCO Heritage Island",
    description: "Step back in time on Lamu Island — a UNESCO World Heritage Site with ancient Swahili architecture, pristine beaches, and no cars, just donkeys and dhows.",
    image: "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800&h=500&fit=crop",
    icon: Compass,
    highlights: ["Lamu Old Town", "Shela Beach", "Dhow Sailing", "Manda Island"],
    propertyCount: 12,
    avgPrice: 7500,
    rating: 4.8,
  },
];

const Destinations = () => {
  const navigate = useNavigate();

  const handleExplore = (destinationName: string) => {
    navigate(`/search?location=${encodeURIComponent(destinationName)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-primary/20 via-accent/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
            <Compass className="h-3 w-3 mr-1" />
            Destination Guides
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Kenya's Top Destinations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From pristine beaches to majestic mountains, discover curated guides to Kenya's most spectacular regions with handpicked stays.
          </p>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-12">
        <div className="container mx-auto px-4 space-y-10">
          {DESTINATIONS.map((dest, index) => {
            const Icon = dest.icon;
            const isReversed = index % 2 !== 0;
            return (
              <Card key={dest.id} className="overflow-hidden border-primary/10 hover:shadow-xl transition-all duration-300">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${isReversed ? "lg:direction-rtl" : ""}`}>
                  {/* Image */}
                  <div className={`relative h-64 lg:h-auto min-h-[300px] ${isReversed ? "lg:order-2" : ""}`}>
                    <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-accent-foreground text-sm px-3 py-1">
                        <Icon className="h-3.5 w-3.5 mr-1" />
                        {dest.tagline}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className={`p-6 lg:p-8 flex flex-col justify-center ${isReversed ? "lg:order-1" : ""}`}>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{dest.name}</h2>
                    <p className="text-muted-foreground mb-5 leading-relaxed">{dest.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {dest.highlights.map((h) => (
                        <Badge key={h} variant="secondary" className="text-xs">{h}</Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mb-6 text-sm">
                      <div className="flex items-center gap-1 text-primary font-semibold">
                        <MapPin className="h-4 w-4" />
                        {dest.propertyCount} properties
                      </div>
                      <div className="flex items-center gap-1 text-accent font-semibold">
                        <Star className="h-4 w-4 fill-accent" />
                        {dest.rating}
                      </div>
                      <div className="text-muted-foreground">
                        From <span className="font-bold text-foreground">KES {dest.avgPrice.toLocaleString()}</span>/night
                      </div>
                    </div>

                    <Button variant="accent" className="w-fit gap-2" onClick={() => handleExplore(dest.name)}>
                      Explore {dest.name} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Can't Find Your Destination?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">We're constantly adding new destinations. Let us know where you'd like to stay and we'll help you find the perfect property.</p>
          <Button variant="accent" size="lg" onClick={() => navigate("/request-property")}>
            Request a Property
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
