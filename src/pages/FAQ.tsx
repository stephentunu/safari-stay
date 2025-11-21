import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      category: "Booking & Payments",
      questions: [
        {
          q: "How do I make a booking?",
          a: "Select your desired property, choose check-in and check-out dates, enter the number of guests, and click 'Book Now'. You'll be prompted to pay via M-Pesa or card to confirm your booking."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept M-Pesa (primary payment method), Visa, and Mastercard. M-Pesa payments are instant and secure using the STK Push feature."
        },
        {
          q: "When will I receive my booking confirmation?",
          a: "You'll receive an instant confirmation via email and SMS once your payment is successful. A receipt with all booking details will be generated immediately."
        },
        {
          q: "Can I modify or cancel my booking?",
          a: "Yes, you can modify or cancel your booking from your account dashboard. Cancellation policies vary by property. Check the property's cancellation policy before booking."
        },
        {
          q: "Is my payment secure?",
          a: "Absolutely. All payments are encrypted and processed securely. We use industry-standard security protocols to protect your financial information."
        }
      ]
    },
    {
      category: "Properties & Hosts",
      questions: [
        {
          q: "Are all properties verified?",
          a: "Yes, all properties listed on McDone are verified by our team before they're published. We ensure hosts provide accurate information and photos."
        },
        {
          q: "How do I become a host?",
          a: "Click 'Become a Host Today' on our homepage, create an account, and submit your property listing. Our team will review and approve it within 24-48 hours."
        },
        {
          q: "What are the hosting fees?",
          a: "We charge a small commission on each successful booking. The exact percentage depends on your subscription plan. Standard hosts pay 12%, while premium hosts pay 8%."
        },
        {
          q: "Can I list multiple properties?",
          a: "Yes! You can list as many properties as you manage. Each property is listed separately and can have different pricing and availability."
        },
        {
          q: "How do I update my property listing?",
          a: "Log into your host dashboard, select the property you want to update, and click 'Edit Listing'. Changes are reflected immediately after review."
        }
      ]
    },
    {
      category: "Guest Experience",
      questions: [
        {
          q: "What if I have issues during my stay?",
          a: "Contact our 24/7 support team immediately through the chat feature or call our support line. We're here to resolve any issues quickly."
        },
        {
          q: "Can I leave a review?",
          a: "Yes, after your stay is complete, you can leave a review for the property. Reviews help other travelers make informed decisions."
        },
        {
          q: "What amenities are typically included?",
          a: "Amenities vary by property but commonly include WiFi, parking, kitchen facilities, and basic toiletries. Check each property listing for specific amenities."
        },
        {
          q: "Can I communicate with the host before booking?",
          a: "Yes, you can send messages to hosts through our platform to ask questions about the property, amenities, or special requests."
        },
        {
          q: "What is your refund policy?",
          a: "Refund policies vary by property and cancellation timing. Full refunds are typically available for cancellations made 7+ days before check-in. Check specific property policies."
        }
      ]
    },
    {
      category: "Account & Technical",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click 'Sign In/Sign Up' in the navigation menu, enter your email, and create a password. You can also sign up using your Google account."
        },
        {
          q: "I forgot my password. What should I do?",
          a: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a password reset link immediately."
        },
        {
          q: "Is McDone available on mobile?",
          a: "Yes! McDone is fully optimized for mobile browsers. We're also developing native iOS and Android apps coming soon."
        },
        {
          q: "How do I update my profile information?",
          a: "Log into your account, click on your profile icon, select 'Profile Settings', and update your information. Don't forget to save changes."
        },
        {
          q: "Can I save properties to view later?",
          a: "Yes! Click the heart icon on any property to add it to your favorites. Access your saved properties from your account dashboard."
        }
      ]
    },
    {
      category: "Safety & Trust",
      questions: [
        {
          q: "How does McDone ensure guest safety?",
          a: "We verify all hosts, screen properties, use secure payment systems, and offer 24/7 customer support. We also have a comprehensive guest protection policy."
        },
        {
          q: "What if a property doesn't match the listing?",
          a: "Contact us immediately. We have a resolution center to handle disputes. If the property significantly differs from the listing, we'll help you find alternative accommodation or process a refund."
        },
        {
          q: "Are guest details shared with hosts?",
          a: "Hosts only receive guest information necessary for check-in after a confirmed booking. Your payment details are never shared with hosts."
        },
        {
          q: "How do you handle fraudulent listings?",
          a: "We have strict verification processes and monitoring systems. Report any suspicious listings, and our team will investigate immediately."
        },
        {
          q: "What is your privacy policy?",
          a: "We take privacy seriously. Your personal information is encrypted and never sold to third parties. Read our full privacy policy in the footer."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about booking, hosting, and using McDone Bookings.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((category, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-2xl">{category.category}</CardTitle>
                <CardDescription>
                  Common questions about {category.category.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, qIdx) => (
                    <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                      <AccordionTrigger className="text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Still Have Questions?</CardTitle>
              <CardDescription>
                Our support team is available 24/7 to help you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat with Support
                </Button>
                <Button size="lg" variant="outline">
                  Email Us
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Response time: Usually within 2 hours
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-muted mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">McDone</h3>
              <p className="text-sm text-muted-foreground">
                Kenya's leading accommodation booking platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 McDone Bookings. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
