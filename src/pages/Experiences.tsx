import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Star, Clock, Camera, Mountain, Waves, Trees } from "lucide-react";

const Experiences = () => {
  const experiences = [
    {
      title: "Maasai Mara Safari",
      location: "Narok County",
      duration: "3 Days",
      price: "From KES 45,000",
      rating: 4.9,
      reviews: 234,
      image: "🦁",
      icon: Camera,
      category: "Wildlife",
      description: "Witness the incredible wildlife of Maasai Mara including the Big Five"
    },
    {
      title: "Mount Kenya Hiking",
      location: "Nyeri County",
      duration: "4 Days",
      price: "From KES 35,000",
      rating: 4.8,
      reviews: 156,
      image: "🏔️",
      icon: Mountain,
      category: "Adventure",
      description: "Conquer Africa's second-highest peak with experienced guides"
    },
    {
      title: "Diani Beach Getaway",
      location: "Kwale County",
      duration: "2 Days",
      price: "From KES 25,000",
      rating: 4.7,
      reviews: 312,
      image: "🏖️",
      icon: Waves,
      category: "Beach",
      description: "Relax on pristine white sand beaches and explore coral reefs"
    },
    {
      title: "Amboseli National Park",
      location: "Kajiado County",
      duration: "2 Days",
      price: "From KES 28,000",
      rating: 4.9,
      reviews: 189,
      image: "🐘",
      icon: Camera,
      category: "Wildlife",
      description: "See elephants against the backdrop of Mount Kilimanjaro"
    },
    {
      title: "Lake Nakuru Tour",
      location: "Nakuru County",
      duration: "1 Day",
      price: "From KES 12,000",
      rating: 4.6,
      reviews: 278,
      image: "🦩",
      icon: Trees,
      category: "Nature",
      description: "Home to flamingos and rhinos in a stunning soda lake setting"
    },
    {
      title: "Lamu Cultural Tour",
      location: "Lamu County",
      duration: "3 Days",
      price: "From KES 32,000",
      rating: 4.8,
      reviews: 145,
      image: "🏛️",
      icon: Users,
      category: "Cultural",
      description: "Explore the ancient Swahili culture in a UNESCO World Heritage site"
    },
  ];

  const categories = [
    { name: "All", count: 24 },
    { name: "Wildlife", count: 8 },
    { name: "Beach", count: 5 },
    { name: "Adventure", count: 6 },
    { name: "Cultural", count: 5 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge variant="secondary" className="mb-4">Coming Soon</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Unique Experiences
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore authentic local activities, tours, and adventures across Kenya. 
            From wildlife safaris to cultural immersions, find your next adventure.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, idx) => (
            <Button
              key={idx}
              variant={idx === 0 ? "default" : "outline"}
              className="gap-2"
            >
              {category.name}
              <Badge variant="secondary" className="ml-1">{category.count}</Badge>
            </Button>
          ))}
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => (
            <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
                {exp.image}
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="gap-1">
                    <exp.icon className="h-3 w-3" />
                    {exp.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{exp.rating}</span>
                    <span className="text-muted-foreground">({exp.reviews})</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {exp.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {exp.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  {exp.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {exp.duration}
                  </div>
                  <p className="font-semibold text-primary">{exp.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Experiences Coming Soon!</h3>
              <p className="text-muted-foreground mb-6">
                We're working on bringing you the best local activities and experiences across Kenya. 
                Sign up to be notified when we launch!
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