import { Progress } from "@/components/ui/progress";

interface ScoreCategory {
  label: string;
  score: number;
}

interface ReviewScoreBreakdownProps {
  categories: ScoreCategory[];
  totalReviews: number;
  overallRating: number;
}

const ReviewScoreBreakdown = ({ categories, totalReviews, overallRating }: ReviewScoreBreakdownProps) => {
  if (totalReviews === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold text-primary">{overallRating.toFixed(1)}</span>
        <div>
          <p className="font-semibold">
            {overallRating >= 4.5 ? "Exceptional" : overallRating >= 4 ? "Very Good" : overallRating >= 3.5 ? "Good" : "Average"}
          </p>
          <p className="text-sm text-muted-foreground">{totalReviews} verified reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {categories.map((cat) => (
          <div key={cat.label} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{cat.label}</span>
              <span className="font-medium">{cat.score.toFixed(1)}</span>
            </div>
            <Progress value={(cat.score / 5) * 100} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewScoreBreakdown;
