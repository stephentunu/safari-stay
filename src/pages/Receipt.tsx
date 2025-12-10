import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CheckCircle, Download, MapPin, Calendar, Users, CreditCard } from "lucide-react";

interface ReceiptData {
  booking: {
    id: string;
    check_in_date: string;
    check_out_date: string;
    guests: number;
    total_price: number;
    created_at: string;
    property: {
      title: string;
      location: string;
      address: string;
      images: string[];
    };
  };
  payment: {
    id: string;
    amount: number;
    mpesa_receipt_number: string;
    created_at: string;
  };
}

const Receipt = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingId) {
      fetchReceipt();
    }
  }, [bookingId]);

  const fetchReceipt = async () => {
    try {
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select(`
          *,
          property:properties (
            title,
            location,
            address,
            images
          )
        `)
        .eq("id", bookingId)
        .single();

      if (bookingError) throw bookingError;

      const { data: paymentData, error: paymentError } = await supabase
        .from("payments")
        .select("*")
        .eq("booking_id", bookingId)
        .eq("payment_status", "completed")
        .single();

      if (paymentError) throw paymentError;

      setReceipt({
        booking: bookingData,
        payment: paymentData,
      });
    } catch (error: any) {
      console.error("Error fetching receipt:", error);
      toast({
        title: "Error",
        description: "Failed to load receipt",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const calculateNights = () => {
    if (!receipt) return 0;
    const checkIn = new Date(receipt.booking.check_in_date);
    const checkOut = new Date(receipt.booking.check_out_date);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (!receipt) {
    return null;
  }

  const nights = calculateNights();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl">Payment Successful!</CardTitle>
              <p className="text-muted-foreground mt-2">
                Your booking has been confirmed
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Receipt Details */}
            <div className="bg-secondary/30 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Receipt Number</p>
                  <p className="font-mono font-semibold">{receipt.payment.mpesa_receipt_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">
                    {format(new Date(receipt.payment.created_at), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Property Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Property Details</h3>
                <div className="flex gap-4">
                  <img
                    src={receipt.booking.property.images[0]}
                    alt={receipt.booking.property.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{receipt.booking.property.title}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{receipt.booking.property.location}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {receipt.booking.property.address}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Booking Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Booking Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Check-in</p>
                      <p className="font-medium">
                        {format(new Date(receipt.booking.check_in_date), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Check-out</p>
                      <p className="font-medium">
                        {format(new Date(receipt.booking.check_out_date), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Guests: </span>
                    <span className="font-medium">{receipt.booking.guests}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Duration: </span>
                    <span className="font-medium">{nights} {nights === 1 ? 'night' : 'nights'}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Payment Details</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      KES {(receipt.payment.amount / nights).toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}
                    </span>
                    <span>KES {receipt.payment.amount.toLocaleString()}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount Paid</span>
                    <span className="text-primary">KES {receipt.payment.amount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Paid via M-Pesa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Reference */}
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Booking Reference</p>
              <p className="font-mono font-semibold text-lg">{receipt.booking.id}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 print:hidden">
              <Button onClick={handlePrint} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button onClick={() => navigate("/")} className="flex-1">
                Back to Home
              </Button>
            </div>

            {/* Footer Note */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Thank you for booking with McDone!</p>
              <p className="mt-1">For support, contact us at support@mcdone.co.ke</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Receipt;
