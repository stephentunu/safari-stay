import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ExternalLink, CalendarDays } from "lucide-react";
import { useState } from "react";

const EVENT_CATEGORIES = ["All", "Conference", "Festival", "Workshop", "Exhibition", "Networking"];

const EVENTS = [
  {
    id: "1",
    title: "Kenya Hospitality & Tourism Summit 2026",
    description: "The premier annual gathering for Kenya's hospitality industry leaders, featuring keynotes on digital transformation, sustainable tourism, and market trends.",
    date: "2026-04-15",
    endDate: "2026-04-17",
    time: "9:00 AM - 5:00 PM",
    location: "KICC, Nairobi",
    category: "Conference",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    status: "upcoming",
    price: "KES 5,000",
  },
  {
    id: "2",
    title: "Lamu Cultural Festival 2026",
    description: "Experience the rich Swahili culture with traditional dhow races, donkey races, poetry readings, and authentic coastal cuisine at this UNESCO World Heritage site.",
    date: "2026-05-20",
    endDate: "2026-05-23",
    time: "All Day",
    location: "Lamu Island, Lamu County",
    category: "Festival",
    attendees: 2000,
    image: "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=600&h=400&fit=crop",
    status: "upcoming",
    price: "Free",
  },
  {
    id: "3",
    title: "Eco-Lodge Management Masterclass",
    description: "A hands-on workshop for hospitality professionals on building and managing eco-friendly lodges, with case studies from top Kenyan conservancies.",
    date: "2026-04-28",
    endDate: "2026-04-29",
    time: "10:00 AM - 4:00 PM",
    location: "Sarova Stanley Hotel, Nairobi",
    category: "Workshop",
    attendees: 100,
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=400&fit=crop",
    status: "upcoming",
    price: "KES 3,500",
  },
  {
    id: "4",
    title: "Kenya International Food & Beverage Expo",
    description: "Showcasing Kenya's finest culinary talents, food producers, and beverage brands — a must-attend for restaurateurs and hoteliers.",
    date: "2026-06-10",
    endDate: "2026-06-12",
    time: "9:00 AM - 6:00 PM",
    location: "Sarit Expo Centre, Nairobi",
    category: "Exhibition",
    attendees: 3000,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop",
    status: "upcoming",
    price: "KES 1,500",
  },
  {
    id: "5",
    title: "Coastal Hoteliers Networking Evening",
    description: "An exclusive networking event for Mombasa-region hospitality professionals to connect, share best practices, and explore partnerships.",
    date: "2026-05-05",
    time: "6:00 PM - 9:00 PM",
    location: "Serena Beach Resort, Mombasa",
    category: "Networking",
    attendees: 150,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
    status: "upcoming",
    price: "KES 2,000",
  },
  {
    id: "6",
    title: "Magical Kenya Travel Expo",
    description: "The largest travel trade fair in East Africa, bringing together tour operators, hoteliers, and travel agents from across the continent.",
    date: "2026-07-01",
    endDate: "2026-07-03",
    time: "8:00 AM - 5:00 PM",
    location: "Kenyatta International Convention Centre, Nairobi",
    category: "Exhibition",
    attendees: 5000,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop",
    status: "upcoming",
    price: "KES 2,500",
  },
];

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-KE", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

const Events = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = activeCategory === "All"
    ? EVENTS
    : EVENTS.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-accent/15 via-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-accent/40 text-accent">
            <CalendarDays className="h-3 w-3 mr-1" />
            Events Calendar
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Hospitality Events in Kenya
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover conferences, festivals, workshops, and networking events shaping Kenya's hospitality and tourism landscape.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {EVENT_CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "accent" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-primary/10">
                <div className="relative h-48 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-accent text-accent-foreground">{event.category}</Badge>
                    <Badge variant="secondary">{event.price}</Badge>
                  </div>
                  {/* Date badge */}
                  <div className="absolute top-3 right-3 bg-background/95 rounded-lg p-2 text-center min-w-[60px] shadow-lg">
                    <div className="text-xs font-bold text-primary uppercase">{new Date(event.date).toLocaleDateString("en-KE", { month: "short" })}</div>
                    <div className="text-xl font-black text-foreground leading-none">{new Date(event.date).getDate()}</div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{formatDate(event.date)}{event.endDate ? ` — ${formatDate(event.endDate)}` : ""}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      <span>{event.attendees.toLocaleString()} expected attendees</span>
                    </div>
                  </div>
                  <Button variant="accent" size="sm" className="w-full mt-4 gap-1">
                    <ExternalLink className="h-3.5 w-3.5" /> Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events in this category. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
