import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, TrendingUp, Newspaper, Globe } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["All", "Travel Tips", "Industry News", "Destination Guides", "Hospitality Trends", "Events"];

const BLOG_POSTS = [
  {
    id: "1",
    title: "Top 10 Hidden Gems in Kenya's Coastal Region",
    excerpt: "Discover lesser-known beaches, cultural sites, and boutique stays along Kenya's stunning coastline that most tourists miss.",
    category: "Destination Guides",
    date: "2026-03-20",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Kenya's Hospitality Industry Sees Record Growth in 2026",
    excerpt: "The Kenya Association of Hotelkeepers reports a 23% increase in bookings, driven by domestic tourism and eco-friendly accommodations.",
    category: "Industry News",
    date: "2026-03-18",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "3",
    title: "How to Plan the Perfect Safari & Beach Combo Trip",
    excerpt: "A step-by-step guide to combining a Maasai Mara safari with a relaxing Diani Beach getaway for the ultimate Kenyan holiday.",
    category: "Travel Tips",
    date: "2026-03-15",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "4",
    title: "Sustainable Tourism: Kenya Leads Africa in Eco-Lodges",
    excerpt: "From solar-powered lodges to community conservancies, Kenya is setting the standard for sustainable hospitality across Africa.",
    category: "Hospitality Trends",
    date: "2026-03-12",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "5",
    title: "Budget Travel: Explore Nairobi Under KES 5,000/Night",
    excerpt: "Our curated list of affordable yet stylish stays in Nairobi that won't break the bank — from hostels to boutique guesthouses.",
    category: "Travel Tips",
    date: "2026-03-10",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "6",
    title: "KAHC Annual Conference 2026: Key Takeaways",
    excerpt: "Highlights from this year's Kenya Association of Hotelkeepers and Caterers conference on digital transformation in hospitality.",
    category: "Events",
    date: "2026-03-08",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    featured: false,
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filteredPosts = activeCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featuredPosts = BLOG_POSTS.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-primary/15 via-accent/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
            <Newspaper className="h-3 w-3 mr-1" />
            McDone Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            News, Tips & Travel Inspiration
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest hospitality trends, travel guides, and insider tips for exploring Kenya's finest stays.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-5 w-5 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Featured Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border-primary/10">
                <div className="relative h-64 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2 bg-accent text-accent-foreground">{post.category}</Badge>
                    <h3 className="text-xl font-bold text-white leading-tight">{post.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(post.date).toLocaleDateString("en-KE", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary gap-1 p-0 h-auto">
                      Read <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter + All Posts */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-3 left-3 bg-accent/90 text-accent-foreground text-xs">{post.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(post.date).toLocaleDateString("en-KE", { month: "short", day: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Never Miss a Story</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Subscribe to our newsletter for weekly travel tips, exclusive deals, and the latest hospitality news from Kenya.</p>
          <Button variant="accent" size="lg" onClick={() => navigate("/")}>
            Subscribe Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
