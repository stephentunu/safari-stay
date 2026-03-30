import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ReviewFormProps {
  propertyId: string;
  bookingId: string;
  onReviewSubmitted: () => void;
}

const categories = [
  { key: "cleanliness_score", label: "Cleanliness" },
  { key: "location_score", label: "Location" },
  { key: "value_score", label: "Value for Money" },
  { key: "service_score", label: "Service" },
  { key: "facilities_score", label: "Facilities" },
] as const;

const ReviewForm = ({ propertyId, bookingId, onReviewSubmitted }: ReviewFormProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Error", description: "Please select an overall rating", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("reviews").insert({
        property_id: propertyId,
        booking_id: bookingId,
        reviewer_id: user.id,
        rating,
        comment: comment.trim() || null,
        cleanliness_score: scores.cleanliness_score || null,
        location_score: scores.location_score || null,
        value_score: scores.value_score || null,
        service_score: scores.service_score || null,
        facilities_score: scores.facilities_score || null,
      });

      if (error) throw error;

      toast({ title: "Review Submitted", description: "Thank you for your feedback!" });
      onReviewSubmitted();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to submit review", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange, size = "md" }: { value: number; onChange: (v: number) => void; size?: string }) => {
    const [hover, setHover] = useState(0);
    const starSize = size === "lg" ? "h-7 w-7" : "h-5 w-5";
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${starSize} cursor-pointer transition-colors ${
              i <= (hover || value) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
            }`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(i)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Write a Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="mb-2 block">Overall Rating</Label>
          <StarRating value={rating} onChange={setRating} size="lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <Label className="text-sm">{label}</Label>
              <StarRating value={scores[key] || 0} onChange={(v) => setScores({ ...scores, [key]: v })} />
            </div>
          ))}
        </div>

        <div>
          <Label className="mb-2 block">Comment (optional)</Label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            maxLength={2000}
          />
        </div>

        <Button onClick={handleSubmit} disabled={submitting || rating === 0} className="w-full">
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
