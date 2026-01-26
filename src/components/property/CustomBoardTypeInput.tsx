import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

interface CustomBoardType {
  id: string;
  name: string;
  description: string;
  price_adjustment: number;
}

interface CustomBoardTypeInputProps {
  customBoardTypes: CustomBoardType[];
  onAdd: (boardType: CustomBoardType) => void;
  onRemove: (id: string) => void;
}

const CustomBoardTypeInput = ({ customBoardTypes, onAdd, onRemove }: CustomBoardTypeInputProps) => {
  const [showForm, setShowForm] = useState(false);
  const [newBoardType, setNewBoardType] = useState({
    name: "",
    description: "",
    price_adjustment: 0,
  });

  const handleAdd = () => {
    if (!newBoardType.name.trim()) return;
    
    onAdd({
      id: `custom_${Date.now()}`,
      name: newBoardType.name.trim(),
      description: newBoardType.description.trim(),
      price_adjustment: newBoardType.price_adjustment,
    });

    setNewBoardType({ name: "", description: "", price_adjustment: 0 });
    setShowForm(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Custom Board Types</Label>
        {!showForm && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowForm(true)}
            className="gap-1"
          >
            <Plus className="h-3 w-3" />
            Add Custom
          </Button>
        )}
      </div>

      {showForm && (
        <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
          <div className="space-y-2">
            <Label className="text-xs">Board Type Name *</Label>
            <Input
              value={newBoardType.name}
              onChange={(e) => setNewBoardType({ ...newBoardType, name: e.target.value })}
              placeholder="e.g., All Inclusive, Bed Only, Room Only"
              className="h-8"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Description (meals included)</Label>
            <Textarea
              value={newBoardType.description}
              onChange={(e) => setNewBoardType({ ...newBoardType, description: e.target.value })}
              placeholder="e.g., Breakfast + Lunch + Dinner + Drinks + Snacks"
              rows={2}
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Price Adjustment (KES per night)</Label>
            <Input
              type="number"
              value={newBoardType.price_adjustment || ""}
              onChange={(e) => setNewBoardType({ ...newBoardType, price_adjustment: Number(e.target.value) })}
              placeholder="0 for no adjustment, +500 for extra, -200 for discount"
              className="h-8"
            />
          </div>
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={handleAdd} disabled={!newBoardType.name.trim()}>
              Add Board Type
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {customBoardTypes.length > 0 && (
        <div className="space-y-2">
          {customBoardTypes.map((bt) => (
            <div key={bt.id} className="flex items-center justify-between p-3 border rounded-lg bg-background">
              <div className="space-y-1">
                <p className="font-medium text-sm">{bt.name}</p>
                {bt.description && (
                  <p className="text-xs text-muted-foreground">{bt.description}</p>
                )}
                {bt.price_adjustment !== 0 && (
                  <p className="text-xs text-primary">
                    {bt.price_adjustment > 0 ? "+" : ""}KES {bt.price_adjustment.toLocaleString()}/night
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(bt.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomBoardTypeInput;
