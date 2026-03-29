import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, Clock, Camera, Mountain, Waves, Trees, Users, Compass } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import maasaiMaraImg from "@/assets/experiences/maasai-mara.jpg";
import mountKenyaImg from "@/assets/experiences/mount-kenya.jpg";
import dianiBeachImg from "@/assets/experiences/diani-beach.jpg";
import amboseliImg from "@/assets/experiences/amboseli.jpg";
import lakeNakuruImg from "@/assets/experiences/lake-nakuru.jpg";
import lamuImg from "@/assets/experiences/lamu.jpg";

// Fallback images mapped by title keyword
const FALLBACK_IMAGES: Record<string, string> = {
  "maasai mara": maasaiMaraImg,
  "mount kenya": mountKenyaImg,
  "diani": dianiBeachImg,
  "amboseli": amboseliImg,
  "nakuru": lakeNakuruImg,
  "lamu": lamuImg,
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Wildlife: Camera,
  Adventure: Mountain,
  Beach: Waves,
  Nature: Trees,
  Cultural: Users,
  City: Compass,
};

const getFallbackImage = (title: string): string | null => {
  const lower = title.toLowerCase();
  for (const [key, img] of Object.entries(FALLBACK_IMAGES)) {
    if (lower.includes(key)) return img;
  }
  return null;
};

interface Experience {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  image_url: string | null;
  category: string;
  description: string;
}

const Experiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("experiences").select("*").eq("is_active", true).order("created_at");
      if (data) setExperiences(data as Experience[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const categories = ["All", ...Array.from(new Set(experiences.map((e) => e.category)))];
  const filtered = activeCategory === "All" ? experiences : experiences.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge variant="secondary" className="mb-4">Explore Kenya</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Discover Unique Experiences</h1>
          <p className="text-lg text-muted-foreground">
            Explore authentic local activities, tours, and adventures across Kenya.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} onClick={() => setActiveCategory(cat)}>
              {cat}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading experiences...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exp) => {
              const IconComp = CATEGORY_ICONS[exp.category] || Camera;
              const imgSrc = exp.image_url || getFallbackImage(exp.title);
              return (
                <Card key={exp.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="h-48 overflow-hidden">
                    {imgSrc ? (
                      <img src={imgSrc} alt={exp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <IconComp className="h-16 w-16 text-primary/40" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="gap-1">
                        <IconComp className="h-3 w-3" />
                        {exp.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{exp.rating}</span>
                        <span className="text-muted-foreground">({exp.reviews})</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{exp.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {exp.duration}
                      </div>
                      <p className="font-semibold text-primary">{exp.price}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No experiences found in this category.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">More Experiences Coming Soon!</h3>
              <p className="text-muted-foreground mb-6">
                We're continuously adding new local activities and experiences across Kenya.
              </p>
              <Button size="lg">Notify Me When Available</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Experiences;
