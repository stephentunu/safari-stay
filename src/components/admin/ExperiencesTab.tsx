import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Experience {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  image_url: string | null;
  category: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

const CATEGORIES = ["Wildlife", "Adventure", "Beach", "Cultural", "Nature", "City"];

const ExperiencesTab = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    location: "",
    duration: "",
    price: "",
    rating: 0,
    reviews: 0,
    image_url: "",
    category: "Wildlife",
    description: "",
  });

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setExperiences(data as Experience[]);
    setLoading(false);
  };

  useEffect(() => { fetchExperiences(); }, []);

  const resetForm = () => {
    setForm({ title: "", location: "", duration: "", price: "", rating: 0, reviews: 0, image_url: "", category: "Wildlife", description: "" });
    setEditingId(null);
  };

  const openEdit = (exp: Experience) => {
    setForm({
      title: exp.title,
      location: exp.location,
      duration: exp.duration,
      price: exp.price,
      rating: exp.rating,
      reviews: exp.reviews,
      image_url: exp.image_url || "",
      category: exp.category,
      description: exp.description,
    });
    setEditingId(exp.id);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.location || !form.description) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const payload = {
      title: form.title,
      location: form.location,
      duration: form.duration,
      price: form.price,
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      image_url: form.image_url || null,
      category: form.category,
      description: form.description,
    };

    if (editingId) {
      const { error } = await supabase.from("experiences").update(payload).eq("id", editingId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Updated", description: "Experience updated successfully" });
    } else {
      const { error } = await supabase.from("experiences").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Created", description: "Experience created successfully" });
    }

    setDialogOpen(false);
    resetForm();
    fetchExperiences();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("experiences").update({ is_active: !current }).eq("id", id);
    fetchExperiences();
    toast({ title: current ? "Hidden" : "Activated", description: `Experience ${current ? "hidden" : "activated"}` });
  };

  const deleteExperience = async (id: string) => {
    if (!confirm("Delete this experience permanently?")) return;
    await supabase.from("experiences").delete().eq("id", id);
    fetchExperiences();
    toast({ title: "Deleted", description: "Experience deleted" });
  };

  if (loading) return <p className="text-muted-foreground p-4">Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Manage Experiences ({experiences.length})</h3>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Experience</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit" : "Add"} Experience</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Maasai Mara Safari" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Location *</Label>
                  <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Narok County" />
                </div>
                <div className="grid gap-2">
                  <Label>Duration</Label>
                  <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 3 Days" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Price</Label>
                  <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. From KES 45,000" />
                </div>
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Rating</Label>
                  <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
                </div>
                <div className="grid gap-2">
                  <Label>Reviews Count</Label>
                  <Input type="number" min="0" value={form.reviews} onChange={(e) => setForm({ ...form, reviews: Number(e.target.value) })} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Image URL</Label>
                <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
              </div>
              <div className="grid gap-2">
                <Label>Description *</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <Button onClick={handleSubmit} className="w-full">{editingId ? "Update" : "Create"} Experience</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiences.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell className="font-medium">{exp.title}</TableCell>
              <TableCell>{exp.location}</TableCell>
              <TableCell><Badge variant="secondary">{exp.category}</Badge></TableCell>
              <TableCell>{exp.price}</TableCell>
              <TableCell>
                <Badge variant={exp.is_active ? "default" : "outline"}>
                  {exp.is_active ? "Active" : "Hidden"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(exp)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => toggleActive(exp.id, exp.is_active)}>
                    {exp.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteExperience(exp.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {experiences.length === 0 && (
            <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No experiences yet</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExperiencesTab;
