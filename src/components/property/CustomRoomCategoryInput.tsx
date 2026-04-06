import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Bed } from "lucide-react";
import { BED_TYPES } from "@/data/propertyOptions";

export interface RoomCategory {
  id: string;
  name: string;
  tier: string;
  prices: Record<string, number>; // bed_type_value -> price
}

interface CustomRoomCategoryInputProps {
  roomCategories: RoomCategory[];
  selectedBedTypes: string[];
  onAdd: (category: RoomCategory) => void;
  onRemove: (id: string) => void;
  onUpdatePrice: (id: string, bedType: string, price: number) => void;
}

const TIER_OPTIONS = [
  { value: "executive", label: "Executive" },
  { value: "deluxe", label: "Deluxe" },
  { value: "superior", label: "Superior" },
  { value: "standard", label: "Standard" },
  { value: "economy", label: "Economy" },
  { value: "premium", label: "Premium" },
  { value: "suite", label: "Suite" },
  { value: "other", label: "Other" },
];

const CustomRoomCategoryInput = ({
  roomCategories,
  selectedBedTypes,
  onAdd,
  onRemove,
  onUpdatePrice,
}: CustomRoomCategoryInputProps) => {
  const [showForm, setShowForm] = useState(false);
  const [newRoom, setNewRoom] = useState({ name: "", tier: "standard" });

  const handleAdd = () => {
    if (!newRoom.name.trim()) return;

    const prices: Record<string, number> = {};
    selectedBedTypes.forEach((bt) => {
      prices[bt] = 0;
    });

    onAdd({
      id: `room_${Date.now()}`,
      name: newRoom.name.trim(),
      tier: newRoom.tier,
      prices,
    });

    setNewRoom({ name: "", tier: "standard" });
    setShowForm(false);
  };

  const getBedLabel = (value: string) =>
    BED_TYPES.find((b) => b.value === value)?.label || value;

  const activeBedTypes = selectedBedTypes.length > 0 ? selectedBedTypes : ["single", "double"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <Bed className="h-4 w-4" />
          Room Categories & Pricing
        </Label>
        {!showForm && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowForm(true)}
            className="gap-1"
          >
            <Plus className="h-3 w-3" />
            Add Room Type
          </Button>
        )}
      </div>

      {selectedBedTypes.length === 0 && (
        <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md">
          Please select at least one bed type above to set room pricing.
        </p>
      )}

      {showForm && (
        <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">Room Type Name *</Label>
              <Input
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                placeholder="e.g., Presidential Suite, Deluxe Room"
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Tier / Category</Label>
              <Select value={newRoom.tier} onValueChange={(v) => setNewRoom({ ...newRoom, tier: v })}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {TIER_OPTIONS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={handleAdd} disabled={!newRoom.name.trim()}>
              Add Room Type
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {roomCategories.length > 0 && (
        <div className="space-y-3">
          {roomCategories.map((room) => (
            <div key={room.id} className="p-4 border rounded-lg bg-background space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{room.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{room.tier} tier</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(room.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {activeBedTypes.map((bt) => (
                  <div key={bt} className="space-y-1">
                    <Label className="text-xs text-muted-foreground">{getBedLabel(bt)}</Label>
                    <Input
                      type="number"
                      min="0"
                      value={room.prices[bt] || ""}
                      onChange={(e) => onUpdatePrice(room.id, bt, Number(e.target.value))}
                      placeholder="KES"
                      className="h-8 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {roomCategories.length === 0 && !showForm && (
        <p className="text-sm text-muted-foreground">
          No room categories added yet. Add custom room types with pricing for each bed type.
        </p>
      )}
    </div>
  );
};

export default CustomRoomCategoryInput;
