import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import ShareProperty from "@/components/ShareProperty";
import PropertyReviews from "@/components/PropertyReviews";
import SimilarProperties from "@/components/SimilarProperties";
import FavoriteButton from "@/components/FavoriteButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Users, BedDouble, Bath, Star, Wifi, Coffee, CarFront, Shield, Calendar as CalendarIcon } from "lucide-react";
import { format, differenceInDays } from "date-fns";

interface Property {
  id: string;
  title: string;
  location: string;
  address: string;
  description: string;
  price_per_night: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  amenities: string[];
  host_id: string;
  latitude?: number;
  longitude?: number;
  property_type: string;
}

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error: any) {
      console.error("Error fetching property:", error);
      toast({
        title: "Error",
        description: "Failed to load property details",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Error",
        description: "Please select check-in and check-out dates",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number for M-Pesa payment",
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to make a booking",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setBooking(true);

    try {
      const nights = differenceInDays(checkOutDate, checkInDate);
      const totalPrice = nights * (property?.price_per_night || 0);

      // Create booking
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          property_id: property?.id,
          traveler_id: user.id,
          host_id: property?.host_id,
          check_in_date: format(checkInDate, "yyyy-MM-dd"),
          check_out_date: format(checkOutDate, "yyyy-MM-dd"),
          guests,
          total_price: totalPrice,
          special_requests: specialRequests,
          status: "pending",
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Create payment record
      const { data: paymentData, error: paymentError } = await supabase
        .from("payments")
        .insert({
          booking_id: bookingData.id,
          amount: totalPrice,
          payment_method: "mpesa",
          payment_status: "pending",
        })
        .select()
        .single();

      if (paymentError) throw paymentError;

      // Initiate M-Pesa payment
      const { data: mpesaResponse, error: mpesaError } = await supabase.functions.invoke(
        "initiate-mpesa-payment",
        {
          body: {
            phone_number: phoneNumber,
            amount: totalPrice,
            booking_id: bookingData.id,
            payment_id: paymentData.id,
          },
        }
      );

      if (mpesaError) throw mpesaError;

      toast({
        title: "Payment Initiated",
        description: "Please check your phone for M-Pesa prompt",
      });

      // Poll for payment status
      pollPaymentStatus(paymentData.id, bookingData.id);
    } catch (error: any) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking",
        variant: "destructive",
      });
      setBooking(false);
    }
  };

  const pollPaymentStatus = async (paymentId: string, bookingId: string) => {
    const maxAttempts = 60; // Poll for 60 seconds
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      const { data, error } = await supabase
        .from("payments")
        .select("payment_status, mpesa_receipt_number")
        .eq("id", paymentId)
        .single();

      if (error) {
        clearInterval(interval);
        setBooking(false);
        return;
      }

      if (data.payment_status === "completed") {
        clearInterval(interval);
        toast({
          title: "Payment Successful",
          description: "Your booking is confirmed!",
        });
        navigate(`/receipt/${bookingId}`);
      } else if (data.payment_status === "failed" || attempts >= maxAttempts) {
        clearInterval(interval);
        setBooking(false);
        toast({
          title: "Payment Failed",
          description: "Payment was not completed. Please try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !property) return 0;
    const nights = differenceInDays(checkOutDate, checkInDate);
    return nights * property.price_per_night;
  };

  const amenityIcons: { [key: string]: any } = {
    wifi: Wifi,
    parking: CarFront,
    breakfast: Coffee,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{property.property_type}</Badge>
            <Badge variant="outline" className="gap-1">
              <Shield className="h-3 w-3" />
              Verified
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <ShareProperty 
              propertyTitle={property.title} 
              propertyUrl={`/property/${property.id}`} 
            />
            <FavoriteButton propertyId={property.id} />
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="col-span-4 md:col-span-2 md:row-span-2">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>
          {property.images.slice(1, 5).map((image, index) => (
            <div key={index} className="col-span-2 md:col-span-1">
              <img
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{property.max_guests} guests</span>
              </div>
              <div className="flex items-center gap-2">
                <BedDouble className="h-4 w-4" />
                <span>{property.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms} bathrooms</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">About this property</h2>
              <p className="text-muted-foreground">{property.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, index) => {
                  const Icon = amenityIcons[amenity.toLowerCase()];
                  return (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {Icon && <Icon className="h-3 w-3" />}
                      {amenity}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* House Rules */}
            <div>
              <h2 className="text-xl font-semibold mb-4">House Rules</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Check-in: After 2:00 PM
                </li>
                <li className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Check-out: Before 11:00 AM
                </li>
                <li>• No smoking inside the property</li>
                <li>• No parties or events without permission</li>
                <li>• Pets may be allowed (contact host)</li>
              </ul>
            </div>

            <Separator />

            {/* Location Map */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <p className="text-muted-foreground mb-4">{property.address}</p>
              <Map 
                latitude={property.latitude} 
                longitude={property.longitude} 
                location={property.location}
              />
            </div>

            <Separator />

            {/* Reviews */}
            <PropertyReviews propertyId={property.id} />
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-2xl">
                  KES {property.price_per_night.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground"> / night</span>
                </CardTitle>
                <CardDescription>Book your stay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Check-in Date</Label>
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Check-out Date</Label>
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    disabled={(date) => !checkInDate || date <= checkInDate}
                    className="rounded-md border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max={property.max_guests}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">M-Pesa Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="254XXXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Special Requests (Optional)</Label>
                  <Textarea
                    id="requests"
                    placeholder="Any special requirements?"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>

                {nights > 0 && (
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>KES {property.price_per_night.toLocaleString()} x {nights} nights</span>
                      <span>KES {(property.price_per_night * nights).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>KES {calculateTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleBooking}
                  disabled={booking || !checkInDate || !checkOutDate || !phoneNumber}
                >
                  {booking ? "Processing..." : "Book Now"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Properties */}
        <SimilarProperties 
          currentPropertyId={property.id}
          location={property.location}
          priceRange={property.price_per_night}
        />
      </div>
    </div>
  );
};

export default PropertyDetails;
