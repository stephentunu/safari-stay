import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Copy, Gift, Users, Share2, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Referrals = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
    if (user) {
      fetchReferralData();
    }
  }, [user, authLoading]);

  const generateCode = (userId: string) => {
    return "MCDONE-" + userId.substring(0, 8).toUpperCase();
  };

  const fetchReferralData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Get or create referral code
      const { data: existingCode } = await supabase
        .from("referral_codes")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingCode) {
        setReferralCode(existingCode.code);
      } else {
        const code = generateCode(user.id);
        const { data: newCode, error } = await supabase
          .from("referral_codes")
          .insert({ user_id: user.id, code })
          .select()
          .single();

        if (!error && newCode) {
          setReferralCode(newCode.code);
        }
      }

      // Get referral count
      const { count } = await supabase
        .from("referrals")
        .select("*", { count: "exact", head: true })
        .eq("referrer_id", user.id);

      setReferralCount(count || 0);

      // Get total credits
      const { data: credits } = await supabase
        .from("user_credits")
        .select("amount")
        .eq("user_id", user.id);

      const total = credits?.reduce((sum, c) => sum + Number(c.amount), 0) || 0;
      setTotalCredits(total);
    } catch (error) {
      console.error("Error fetching referral data:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({ title: "Copied!", description: "Referral code copied to clipboard" });
  };

  const shareReferral = () => {
    const text = `Join McDone Bookings and discover Kenya's finest stays! Use my referral code: ${referralCode}`;
    const url = `${window.location.origin}/auth?ref=${referralCode}`;

    if (navigator.share) {
      navigator.share({ title: "Join McDone Bookings", text, url });
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`);
      toast({ title: "Link copied!", description: "Share link copied to clipboard" });
    }
  };

  const progressToNextMilestone = ((referralCount % 10) / 10) * 100;
  const milestonesReached = Math.floor(referralCount / 10);
  const referralsToNext = 10 - (referralCount % 10);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
          <p className="text-muted-foreground">
            Invite friends and earn KES 500 credits for every 10 successful referrals!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold">{referralCount}</p>
              <p className="text-sm text-muted-foreground">Friends Referred</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold">{milestonesReached}</p>
              <p className="text-sm text-muted-foreground">Milestones Reached</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Gift className="h-8 w-8 mx-auto mb-2 text-accent-foreground" />
              <p className="text-3xl font-bold">KES {totalCredits.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Credits Earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Code Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Referral Code</CardTitle>
            <CardDescription>Share this code with friends to earn credits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Input value={referralCode} readOnly className="text-center text-lg font-mono font-bold" />
              <Button size="icon" variant="outline" onClick={copyCode}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button onClick={shareReferral} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Progress to next milestone */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to next reward</span>
                <Badge variant="secondary">{referralsToNext} more to go</Badge>
              </div>
              <Progress value={progressToNextMilestone} className="h-3" />
              <p className="text-xs text-muted-foreground text-center">
                {referralCount % 10} / 10 referrals for next KES 500 credit
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">1. Share Your Code</h3>
                <p className="text-sm text-muted-foreground">
                  Share your unique referral code with friends and family
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">2. Friends Sign Up</h3>
                <p className="text-sm text-muted-foreground">
                  They enter your code when creating their McDone account
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">3. Earn Credits</h3>
                <p className="text-sm text-muted-foreground">
                  Get KES 500 in booking credits for every 10 friends who join
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Referrals;
