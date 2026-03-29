import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import ShareProperty from "@/components/ShareProperty";
import PropertyReviews from "@/components/PropertyReviews";
import SimilarProperties from "@/components/SimilarProperties";
import FavoriteButton from "@/components/FavoriteButton";
import ImageGallery from "@/components/ImageGallery";
import CurrencyConverter from "@/components/CurrencyConverter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, BedDouble, Bath, Star, Wifi, Coffee, CarFront, Shield, Calendar as CalendarIcon, Utensils, Briefcase, CreditCard, Smartphone, Navigation, Landmark, Car, Bed, UtensilsCrossed, Gift } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { BOARD_TYPES, ROOM_CATEGORIES, BED_TYPES } from "@/data/propertyOptions";

interface RoomCategoryPrice {
  category: string;
  label: string;
  single_price: number;
  double_price: number;
}

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
  food_types?: string[];
  services?: string[];
  nearby_attractions?: string[];
  transport_modes?: string[];
  image_labels?: string[];
  host_id: string;
  latitude?: number;
  longitude?: number;
  property_type: string;
  board_type?: string;
  room_categories?: RoomCategoryPrice[];
  bed_types?: string[];
  child_free_age?: number;
  attraction_details?: Record<string, string>;
  custom_board_types?: CustomBoardType[];
  property_rules?: string[];
}

interface CustomBoardType {
  id: string;
  name: string;
  description: string;
  price_adjustment: number;
}

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState<{ age: number }[]>([]);
  const [specialRequests, setSpecialRequests] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [booking, setBooking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  // New states for room/board selection
  const [selectedBoardType, setSelectedBoardType] = useState<string>("");
  const [selectedRoomCategory, setSelectedRoomCategory] = useState<string>("");
  const [selectedBedType, setSelectedBedType] = useState<string>("");
  const [loyaltyDiscount, setLoyaltyDiscount] = useState<number>(0);
  const isHotelType = property ? ["hotel", "guesthouse", "resort", "motel"].includes(property.property_type) : false;
  const childFreeAge = property?.child_free_age || 10;

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  // Fetch loyalty discount for current user
  useEffect(() => {
    const fetchLoyaltyDiscount = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.rpc("get_loyalty_discount", { _user_id: user.id });
        if (!error && data !== null) {
          setLoyaltyDiscount(Number(data));
        }
      }
    };
    fetchLoyaltyDiscount();
  }, []);

  useEffect(() => {
    if (checkInDate && checkOutDate && id) {
      checkAvailability();
    }
  }, [checkInDate, checkOutDate, id]);

  // Set default board type when property loads
  useEffect(() => {
    if (property && isHotelType) {
      setSelectedBoardType(property.board_type || "standard");
      if (property.bed_types && property.bed_types.length > 0) {
        setSelectedBedType(property.bed_types[0]);
      }
      if (property.room_categories && property.room_categories.length > 0) {
        setSelectedRoomCategory(property.room_categories[0].category);
      }
    }
  }, [property, isHotelType]);

  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) return;

    setCheckingAvailability(true);
    try {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("id")
        .eq("property_id", id)
        .in("status", ["pending", "confirmed"])
        .or(`and(check_in_date.lte.${format(checkOutDate, "yyyy-MM-dd")},check_out_date.gte.${format(checkInDate, "yyyy-MM-dd")})`);

      if (error) throw error;

      setIsAvailable(!bookings || bookings.length === 0);
    } catch (error: any) {
      console.error("Error checking availability:", error);
    } finally {
      setCheckingAvailability(false);
    }
  };

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      
      // Parse JSON fields if they're strings
      const parsedData = {
        ...data,
        room_categories: typeof data.room_categories === 'string' 
          ? JSON.parse(data.room_categories) 
          : data.room_categories || [],
        attraction_details: (typeof data.attraction_details === 'object' && data.attraction_details !== null)
          ? data.attraction_details as Record<string, string>
          : {},
        custom_board_types: typeof data.custom_board_types === 'string'
          ? JSON.parse(data.custom_board_types)
          : (Array.isArray(data.custom_board_types) ? data.custom_board_types : []),
        property_rules: data.property_rules || [],
      } as Property;
      
      setProperty(parsedData);
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

    if (paymentMethod === "mpesa" && (!phoneNumber || phoneNumber.length < 10)) {
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
      const totalPrice = calculateTotalPrice();
      const totalGuests = adults + children.length;

      // Create booking with room/board details
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          property_id: property?.id,
          traveler_id: user.id,
          host_id: property?.host_id,
          check_in_date: format(checkInDate, "yyyy-MM-dd"),
          check_out_date: format(checkOutDate, "yyyy-MM-dd"),
          guests: totalGuests,
          total_price: totalPrice,
          original_price: loyaltyDiscount > 0 ? getSubtotalBeforeDiscount() : null,
          loyalty_discount_percent: loyaltyDiscount,
          special_requests: specialRequests,
          status: "pending",
          board_type: isHotelType ? selectedBoardType : null,
          room_category: isHotelType && selectedRoomCategory ? selectedRoomCategory : null,
          bed_type: isHotelType && selectedBedType ? selectedBedType : null,
          adults: adults,
          children_details: children,
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
          payment_method: paymentMethod,
          payment_status: "pending",
        })
        .select()
        .single();

      if (paymentError) throw paymentError;

      if (paymentMethod === "mpesa") {
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

        pollPaymentStatus(paymentData.id, bookingData.id);
      } else {
        // Initiate Stripe payment
        const { data: stripeResponse, error: stripeError } = await supabase.functions.invoke(
          "create-stripe-checkout",
          {
            body: {
              booking_id: bookingData.id,
              payment_id: paymentData.id,
              amount: totalPrice,
              property_title: property?.title,
              success_url: `${window.location.origin}/receipt/${bookingData.id}`,
              cancel_url: window.location.href,
            },
          }
        );

        if (stripeError) throw stripeError;

        if (stripeResponse?.url) {
          window.location.href = stripeResponse.url;
        } else {
          throw new Error("Failed to create checkout session");
        }
      }
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
    const maxAttempts = 60;
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

  const getSelectedRoomPrice = (): number => {
    if (!property) return 0;
    
    // If room categories are enabled and selected
    if (isHotelType && property.room_categories && property.room_categories.length > 0 && selectedRoomCategory) {
      const roomCat = property.room_categories.find(rc => rc.category === selectedRoomCategory);
      if (roomCat) {
        if (selectedBedType === "single") {
          return roomCat.single_price || property.price_per_night;
        } else if (selectedBedType === "double") {
          return roomCat.double_price || property.price_per_night;
        }
      }
    }
    
    return property.price_per_night;
  };

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !property) return 0;
    
    const nights = differenceInDays(checkOutDate, checkInDate);
    let pricePerNight = getSelectedRoomPrice();
    
    // Add custom board type price adjustment if applicable
    if (isHotelType && selectedBoardType && property.custom_board_types) {
      const customBoard = property.custom_board_types.find(c => c.id === selectedBoardType);
      if (customBoard && customBoard.price_adjustment) {
        pricePerNight += customBoard.price_adjustment;
      }
    }
    
    // Children below childFreeAge are free
    const payingChildren = children.filter(c => c.age >= childFreeAge).length;
    const payingGuests = adults + payingChildren;
    
    const subtotal = nights * pricePerNight * payingGuests;
    
    // Apply loyalty discount
    if (loyaltyDiscount > 0) {
      return Math.round(subtotal * (1 - loyaltyDiscount / 100));
    }
    
    return subtotal;
  };

  const addChild = () => {
    setChildren([...children, { age: 0 }]);
  };

  const removeChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const updateChildAge = (index: number, age: number) => {
    const updated = [...children];
    updated[index] = { age };
    setChildren(updated);
  };

  const getSubtotalBeforeDiscount = () => {
    if (!checkInDate || !checkOutDate || !property) return 0;
    const nights = differenceInDays(checkOutDate, checkInDate);
    let pricePerNight = getSelectedRoomPrice();
    if (isHotelType && selectedBoardType && property.custom_board_types) {
      const customBoard = property.custom_board_types.find(c => c.id === selectedBoardType);
      if (customBoard && customBoard.price_adjustment) {
        pricePerNight += customBoard.price_adjustment;
      }
    }
    const payingChildren = children.filter(c => c.age >= childFreeAge).length;
    const payingGuests = adults + payingChildren;
    return nights * pricePerNight * payingGuests;
  };

  const getFreeChildrenCount = () => children.filter(c => c.age < childFreeAge).length;
  const getPayingChildrenCount = () => children.filter(c => c.age >= childFreeAge).length;

  const getBoardTypeLabel = (value: string) => {
    // Check standard board types first
    const standardBoard = BOARD_TYPES.find(b => b.value === value);
    if (standardBoard) return standardBoard.label;
    
    // Check custom board types
    if (property?.custom_board_types) {
      const customBoard = property.custom_board_types.find(c => c.id === value);
      if (customBoard) return customBoard.name;
    }
    
    return value;
  };

  const getRoomCategoryLabel = (value: string) => {
    return ROOM_CATEGORIES.find(r => r.value === value)?.label || value;
  };

  const getBedTypeLabel = (value: string) => {
    return BED_TYPES.find(b => b.value === value)?.label || value;
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
  const pricePerNight = getSelectedRoomPrice();

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
            {property.board_type && isHotelType && (
              <Badge variant="outline" className="gap-1 bg-orange-50 text-orange-700 border-orange-200">
                <UtensilsCrossed className="h-3 w-3" />
                {getBoardTypeLabel(property.board_type)}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ShareProperty 
              propertyTitle={property.title} 
              propertyUrl={`/property/${property.id}`} 
            />
            <FavoriteButton propertyId={property.id} />
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery 
          images={property.images} 
          labels={property.image_labels} 
          title={property.title} 
        />

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

            {property.services && property.services.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Services Offered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {property.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {property.food_types && property.food_types.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Food & Cuisine
                </h2>
                <div className="flex flex-wrap gap-2">
                  {property.food_types.map((food, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 bg-orange-50 text-orange-700 border-orange-200">
                      {food}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Attractions */}
            {property.nearby_attractions && property.nearby_attractions.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Landmark className="h-5 w-5" />
                  Nearby Attractions
                </h2>
                <div className="space-y-2">
                  {property.nearby_attractions.map((attraction, index) => {
                    const specificName = property.attraction_details?.[attraction];
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <MapPin className="h-4 w-4 mt-1 text-primary" />
                        <div>
                          <span className="font-medium">{attraction}</span>
                          {specificName && (
                            <span className="text-muted-foreground"> - {specificName}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Transport Modes */}
            {property.transport_modes && property.transport_modes.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Available Transport
                </h2>
                <div className="flex flex-wrap gap-2">
                  {property.transport_modes.map((mode, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                      <Navigation className="h-3 w-3" />
                      {mode}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Available Room Types for Hotels */}
            {isHotelType && property.room_categories && property.room_categories.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  Available Room Types
                </h2>
                <div className="grid gap-3">
                  {property.room_categories.map((room, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-muted/30">
                      <h3 className="font-medium">{room.label}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        {room.single_price > 0 && (
                          <span>Single: KES {room.single_price.toLocaleString()}/night</span>
                        )}
                        {room.double_price > 0 && (
                          <span>Double: KES {room.double_price.toLocaleString()}/night</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* House Rules */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Property Rules & Regulations</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Check-in: After 2:00 PM
                </li>
                <li className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Check-out: Before 11:00 AM
                </li>
                {/* Property-specific rules */}
                {property.property_rules && property.property_rules.length > 0 ? (
                  property.property_rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {rule}
                    </li>
                  ))
                ) : (
                  <>
                    <li>• No smoking inside the property</li>
                    <li>• No parties or events without permission</li>
                    <li>• Pets may be allowed (contact host)</li>
                  </>
                )}
                <li className="text-green-600 font-medium">• Children under {childFreeAge} years stay FREE!</li>
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
                  KES {pricePerNight.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground"> / night</span>
                </CardTitle>
                <CurrencyConverter priceKES={pricePerNight} className="mt-2" />
                <CardDescription>Book your stay</CardDescription>
                {loyaltyDiscount > 0 && (
                  <div className="flex items-center gap-2 mt-2 p-2 rounded-md bg-primary/10 border border-primary/20">
                    <Gift className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {loyaltyDiscount}% loyalty discount applied!
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Room/Board Selection for Hotels */}
                {isHotelType && (
                  <div className="space-y-4 p-3 border rounded-lg bg-muted/30">
                    <h4 className="font-medium flex items-center gap-2">
                      <UtensilsCrossed className="h-4 w-4" />
                      Room & Board Options
                    </h4>
                    
                    {/* Board Type Selection */}
                    <div className="space-y-2">
                      <Label className="text-sm">Board Type</Label>
                      <Select value={selectedBoardType} onValueChange={setSelectedBoardType}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select board type" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          {/* Standard board types */}
                          {BOARD_TYPES.map((board) => (
                            <SelectItem key={board.value} value={board.value}>
                              {board.label}
                            </SelectItem>
                          ))}
                          {/* Custom board types from property */}
                          {property.custom_board_types && property.custom_board_types.length > 0 && (
                            <>
                              {property.custom_board_types.map((custom) => (
                                <SelectItem key={custom.id} value={custom.id}>
                                  {custom.name} {custom.price_adjustment !== 0 && (
                                    <span className="text-xs text-muted-foreground">
                                      ({custom.price_adjustment > 0 ? '+' : ''}KES {custom.price_adjustment.toLocaleString()})
                                    </span>
                                  )}
                                </SelectItem>
                              ))}
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      {/* Show custom board type description if selected */}
                      {property.custom_board_types?.find(c => c.id === selectedBoardType)?.description && (
                        <p className="text-xs text-muted-foreground">
                          {property.custom_board_types.find(c => c.id === selectedBoardType)?.description}
                        </p>
                      )}
                    </div>

                    {/* Room Category Selection */}
                    {property.room_categories && property.room_categories.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm">Room Category</Label>
                        <Select value={selectedRoomCategory} onValueChange={setSelectedRoomCategory}>
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select room category" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover z-50">
                            {property.room_categories.map((room) => (
                              <SelectItem key={room.category} value={room.category}>
                                {room.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Bed Type Selection */}
                    {property.bed_types && property.bed_types.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm">Bed Type</Label>
                        <Select value={selectedBedType} onValueChange={setSelectedBedType}>
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select bed type" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover z-50">
                            {property.bed_types.map((bed) => (
                              <SelectItem key={bed} value={bed}>
                                {getBedTypeLabel(bed)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )}

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
                  <Label htmlFor="adults">Adults</Label>
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    max={property.max_guests}
                    value={adults}
                    onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Children</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addChild}
                      disabled={adults + children.length >= property.max_guests}
                    >
                      + Add Child
                    </Button>
                  </div>
                  {children.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No children added</p>
                  ) : (
                    <div className="space-y-2">
                      {children.map((child, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="17"
                            value={child.age}
                            onChange={(e) => updateChildAge(index, parseInt(e.target.value) || 0)}
                            className="w-20"
                            placeholder="Age"
                          />
                          <span className="text-sm text-muted-foreground">years</span>
                          {child.age < childFreeAge && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">FREE</Badge>
                          )}
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeChild(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">Children under {childFreeAge} years stay free!</p>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={(value: "mpesa" | "card") => setPaymentMethod(value)}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Smartphone className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="font-medium">M-Pesa</p>
                          <p className="text-xs text-muted-foreground">Pay via mobile money</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="font-medium">Card Payment</p>
                          <p className="text-xs text-muted-foreground">Visa, Mastercard (International)</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "mpesa" && (
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
                )}

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
                    {isHotelType && selectedBoardType && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Board: {getBoardTypeLabel(selectedBoardType)}</span>
                      </div>
                    )}
                    {isHotelType && selectedRoomCategory && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Room: {getRoomCategoryLabel(selectedRoomCategory)}</span>
                      </div>
                    )}
                    {isHotelType && selectedBedType && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Bed: {getBedTypeLabel(selectedBedType)}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm">
                      <span>{adults} adult{adults > 1 ? 's' : ''} x {nights} nights @ KES {pricePerNight.toLocaleString()}</span>
                      <span>KES {(pricePerNight * nights * adults).toLocaleString()}</span>
                    </div>
                    {getPayingChildrenCount() > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>{getPayingChildrenCount()} child{getPayingChildrenCount() > 1 ? 'ren' : ''} ({childFreeAge}+ yrs) x {nights} nights</span>
                        <span>KES {(pricePerNight * nights * getPayingChildrenCount()).toLocaleString()}</span>
                      </div>
                    )}
                    {getFreeChildrenCount() > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>{getFreeChildrenCount()} child{getFreeChildrenCount() > 1 ? 'ren' : ''} (under {childFreeAge} yrs)</span>
                        <span>FREE</span>
                      </div>
                    )}
                    <Separator />
                    {loyaltyDiscount > 0 && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>KES {getSubtotalBeforeDiscount().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-primary font-medium">
                          <span className="flex items-center gap-1">
                            <Gift className="h-3 w-3" />
                            Loyalty Discount ({loyaltyDiscount}%)
                          </span>
                          <span>- KES {(getSubtotalBeforeDiscount() - calculateTotalPrice()).toLocaleString()}</span>
                        </div>
                        <Separator />
                      </>
                    )}
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>KES {calculateTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {checkInDate && checkOutDate && (
                  <div className="rounded-lg p-3 bg-muted">
                    {checkingAvailability ? (
                      <p className="text-sm text-muted-foreground">Checking availability...</p>
                    ) : isAvailable ? (
                      <p className="text-sm text-green-600 font-medium">✓ Available for selected dates</p>
                    ) : (
                      <p className="text-sm text-destructive font-medium">✗ Unavailable for booking - property is already booked for these dates</p>
                    )}
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleBooking}
                  disabled={booking || !isAvailable || checkingAvailability}
                >
                  {booking ? "Processing..." : !isAvailable ? "Unavailable" : paymentMethod === "mpesa" ? "Pay with M-Pesa" : "Pay with Card"}
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

      <Footer />
    </div>
  );
};

export default PropertyDetails;
