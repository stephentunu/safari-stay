import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, Heart, Zap, Users, Coffee } from "lucide-react";

const Careers = () => {
  const jobs = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Nairobi, Kenya",
      type: "Full-time",
      description: "Build and scale our platform serving thousands of users across Africa."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Nairobi, Kenya",
      type: "Full-time",
      description: "Create beautiful, intuitive experiences for our mobile and web platforms."
    },
    {
      title: "Customer Success Manager",
      department: "Operations",
      location: "Nairobi, Kenya",
      type: "Full-time",
      description: "Help our hosts succeed and ensure travelers have amazing experiences."
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Drive growth through creative campaigns and partnerships."
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Nairobi, Kenya",
      type: "Full-time",
      description: "Turn data into insights that drive business decisions."
    },
    {
      title: "Host Relations Coordinator",
      department: "Operations",
      location: "Mombasa, Kenya",
      type: "Full-time",
      description: "Build relationships with hosts in the coastal region."
    },
  ];

  const benefits = [
    { icon: Heart, title: "Health Insurance", description: "Comprehensive medical cover for you and your family" },
    { icon: Zap, title: "Learning Budget", description: "KES 100,000 annual budget for courses and conferences" },
    { icon: Users, title: "Team Events", description: "Monthly team activities and annual company retreats" },
    { icon: Coffee, title: "Flexible Work", description: "Hybrid work options with flexible hours" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Help us build the future of travel in Africa. We're looking for passionate people 
            who want to make a difference.
          </p>
        </div>

        {/* Why Join Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Work at McDone?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 text-center">
                  <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Culture */}
        <section className="mb-16 bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
            <p className="text-muted-foreground mb-6">
              At McDone, we believe great work happens when talented people feel supported and empowered. 
              We foster an environment of collaboration, continuous learning, and innovation. 
              We celebrate diversity and believe that different perspectives make us stronger.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-sm py-2 px-4">Innovation First</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">Customer Obsessed</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">Inclusive</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">Growth Mindset</Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">Ownership</Badge>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {jobs.map((job, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" /> {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> {job.type}
                        </span>
                      </CardDescription>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* No Position Fits */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Don't See Your Role?</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented people. Send us your CV and tell us how you'd like to contribute.
              </p>
              <Button variant="outline" size="lg">
                Send Open Application
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;
