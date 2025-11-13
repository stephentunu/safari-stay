import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";

const Experiences = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Unique Experiences
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore authentic local activities, tours, and adventures across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Safari Adventures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Experience wildlife safaris in Maasai Mara, Amboseli, and other national parks
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Cultural Tours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Immerse yourself in local culture with authentic community experiences
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Beach Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Enjoy water sports, diving, and coastal adventures along the Indian Ocean
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            More experiences coming soon! We're working on bringing you the best local activities.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Experiences;
