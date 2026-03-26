import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle, XCircle, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FraudFlag {
  id: string;
  flag_type: string;
  reference_id: string;
  reason: string;
  severity: string;
  status: string;
  review_notes: string | null;
  created_at: string;
}

const severityColor = (s: string) => {
  switch (s) {
    case "high": return "destructive";
    case "medium": return "default";
    case "low": return "secondary";
    default: return "outline";
  }
};

const statusColor = (s: string) => {
  switch (s) {
    case "pending": return "destructive";
    case "confirmed": return "default";
    case "dismissed": return "secondary";
    case "reviewed": return "outline";
    default: return "outline";
  }
};

const FraudFlagsTab = () => {
  const [flags, setFlags] = useState<FraudFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlag, setSelectedFlag] = useState<FraudFlag | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("fraud_flags")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load fraud flags");
    } else {
      setFlags(data || []);
    }
    setLoading(false);
  };

  const handleReview = async (flagId: string, newStatus: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("fraud_flags")
      .update({
        status: newStatus,
        review_notes: reviewNotes || null,
        reviewed_by: user?.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", flagId);

    if (error) {
      toast.error("Failed to update flag");
    } else {
      toast.success(`Flag marked as ${newStatus}`);
      setSelectedFlag(null);
      setReviewNotes("");
      fetchFlags();
    }
  };

  const pendingCount = flags.filter(f => f.status === "pending").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-destructive" />
          Fraud Flags ({pendingCount} pending)
        </CardTitle>
        <CardDescription>Auto-detected suspicious bookings and listings for review</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading...</p>
        ) : flags.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No fraud flags detected — all clear!</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Detected</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flags.map((flag) => (
                <TableRow key={flag.id}>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{flag.flag_type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">{flag.reason}</TableCell>
                  <TableCell>
                    <Badge variant={severityColor(flag.severity) as any} className="capitalize">
                      {flag.severity === "high" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {flag.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColor(flag.status) as any} className="capitalize">
                      {flag.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(flag.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {flag.status === "pending" ? (
                      <Button size="sm" variant="outline" onClick={() => { setSelectedFlag(flag); setReviewNotes(""); }}>
                        Review
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">{flag.review_notes || "—"}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={!!selectedFlag} onOpenChange={() => setSelectedFlag(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review Fraud Flag</DialogTitle>
              <DialogDescription>{selectedFlag?.reason}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Type: <span className="capitalize">{selectedFlag?.flag_type}</span></p>
                <p className="text-sm font-medium">Severity: <span className="capitalize">{selectedFlag?.severity}</span></p>
              </div>
              <Textarea
                placeholder="Add review notes (optional)..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  className="bg-red-600 hover:bg-red-700 flex-1"
                  onClick={() => selectedFlag && handleReview(selectedFlag.id, "confirmed")}
                >
                  <AlertTriangle className="w-4 h-4 mr-1" /> Confirm Fraud
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => selectedFlag && handleReview(selectedFlag.id, "dismissed")}
                >
                  <XCircle className="w-4 h-4 mr-1" /> Dismiss
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default FraudFlagsTab;
