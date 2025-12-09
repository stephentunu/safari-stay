import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, Mail } from "lucide-react";

const Press = () => {
  const pressReleases = [
    {
      date: "December 2024",
      title: "McDone Launches Expansion to East Africa",
      summary: "McDone announces plans to expand operations to Tanzania and Uganda in Q1 2025.",
      isNew: true
    },
    {
      date: "November 2024",
      title: "McDone Surpasses 10,000 Bookings Milestone",
      summary: "Platform celebrates reaching 10,000 successful bookings with 98% satisfaction rate.",
      isNew: true
    },
    {
      date: "October 2024",
      title: "Partnership with Safaricom Enhances M-Pesa Integration",
      summary: "New partnership enables even faster M-Pesa payments with enhanced security features.",
      isNew: false
    },
    {
      date: "September 2024",
      title: "McDone Introduces AI-Powered Travel Assistant",
      summary: "New chatbot feature helps travelers find perfect accommodations in seconds.",
      isNew: false
    },
    {
      date: "August 2024",
      title: "Series A Funding Round Success",
      summary: "McDone secures $5M in Series A funding to fuel African expansion.",
      isNew: false
    },
  ];

  const mediaKit = [
    { name: "Brand Guidelines", format: "PDF", size: "2.4 MB" },
    { name: "Logo Pack", format: "ZIP", size: "5.1 MB" },
    { name: "Product Screenshots", format: "ZIP", size: "8.7 MB" },
    { name: "Executive Photos", format: "ZIP", size: "12.3 MB" },
    { name: "Company Fact Sheet", format: "PDF", size: "450 KB" },
  ];

  const coverage = [
    { publication: "Business Daily Africa", title: "How McDone is revolutionizing travel booking in Kenya" },
    { publication: "TechCabal", title: "The startup bringing modern booking to Africa" },
    { publication: "The Standard", title: "Local platform takes on global giants with M-Pesa integration" },
    { publication: "Disrupt Africa", title: "McDone raises Series A to expand across East Africa" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Press & Media</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The latest news, announcements, and media resources from McDone.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Press Releases */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Press Releases</h2>
            {pressReleases.map((release, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">{release.date}</span>
                    {release.isNew && <Badge>New</Badge>}
                  </div>
                  <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors">
                    {release.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{release.summary}</p>
                  <Button variant="link" className="px-0 mt-2">
                    Read More <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Media Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Media Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  For press inquiries, interviews, and media requests:
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href="mailto:press@mcdone.co.ke" className="text-primary hover:underline">
                    press@mcdone.co.ke
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  Response time: Within 24 hours
                </p>
              </CardContent>
            </Card>

            {/* Media Kit */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Media Kit</CardTitle>
                <CardDescription>Download brand assets and resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mediaKit.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span>{item.name}</span>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <Download className="h-4 w-4" />
                      {item.format}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Media Coverage */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">In the News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coverage.map((item, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <p className="text-sm text-primary font-medium mb-2">{item.publication}</p>
                  <p className="text-sm">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Company Facts */}
        <section className="mt-16 bg-muted/50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Facts</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">2024</p>
              <p className="text-muted-foreground">Founded</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">Nairobi</p>
              <p className="text-muted-foreground">Headquarters</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-muted-foreground">Team Members</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">$5M</p>
              <p className="text-muted-foreground">Total Funding</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Press;
