import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { format } from "date-fns";
import ReviewScoreBreakdown from "@/components/ReviewScoreBreakdown";
import ReviewForm from "@/components/ReviewForm";

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer_name: string;
  cleanliness_score: number | null;
  location_score: number | null;
  value_score: number | null;
  service_score: number | null;
  facilities_score: number | null;
}

interface EligibleBooking {
  id: string;
  check_out_date: string;
}

interface PropertyReviewsProps {
  propertyId: string;
}

const PropertyReviews = ({ propertyId }: PropertyReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [eligibleBookings, setEligibleBookings] = useState<EligibleBooking[]>([]);

  useEffect(() => {
    fetchReviews();
    fetchEligibleBookings();
  }, [propertyId]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, rating, comment, created_at, reviewer_id, cleanliness_score, location_score, value_score, service_score, facilities_score")
        .eq("property_id", propertyId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      if (data && data.length > 0) {
        const reviewsWithNames = await Promise.all(
          data.map(async (review) => {
            const { data: profile } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", review.reviewer_id)
              .single();

            return {
              ...review,
              reviewer_name: profile?.full_name || "Anonymous Guest",
            };
          })
        );
        setReviews(reviewsWithNames);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEligibleBookings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get completed bookings that haven't been reviewed yet
      const { data: bookings } = await supabase
        .from("bookings")
        .select("id, check_out_date")
        .eq("property_id", propertyId)
        .eq("traveler_id", user.id)
        .eq("status", "completed");

      if (!bookings || bookings.length === 0) return;

      // Check which bookings already have reviews
      const { data: existingReviews } = await supabase
        .from("reviews")
        .select("booking_id")
        .eq("property_id", propertyId)
        .eq("reviewer_id", user.id);

      const reviewedBookingIds = new Set(existingReviews?.map(r => r.booking_id) || []);
      setEligibleBookings(bookings.filter(b => !reviewedBookingIds.has(b.id)));
    } catch (error) {
      console.error("Error checking eligible bookings:", error);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const getScoreAverage = (key: keyof Review) => {
    const scored = reviews.filter((r) => r[key] != null);
    if (scored.length === 0) return averageRating;
    return scored.reduce((sum, r) => sum + (r[key] as number), 0) / scored.length;
  };

  const scoreCategories = [
    { label: "Cleanliness", score: getScoreAverage("cleanliness_score") },
    { label: "Location", score: getScoreAverage("location_score") },
    { label: "Value for Money", score: getScoreAverage("value_score") },
    { label: "Service", score: getScoreAverage("service_score") },
    { label: "Facilities", score: getScoreAverage("facilities_score") },
  ];

  const handleReviewSubmitted = () => {
    fetchReviews();
    fetchEligibleBookings();
  };

  if (loading) {
    return <div className="text-muted-foreground">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Guest Reviews</h2>

      {reviews.length > 0 ? (
        <ReviewScoreBreakdown
          categories={scoreCategories}
          totalReviews={reviews.length}
          overallRating={averageRating}
        />
      ) : (
        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{review.reviewer_name?.charAt(0) || "G"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">{review.reviewer_name}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                      />
                    ))}
                    <span className="ml-2">{format(new Date(review.created_at), "MMM yyyy")}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            {review.comment && (
              <CardContent>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PropertyReviews;
