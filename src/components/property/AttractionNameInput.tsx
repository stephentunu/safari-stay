import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AttractionNameInputProps {
  attraction: string;
  name: string;
  onNameChange: (attraction: string, name: string) => void;
  onRemove: (attraction: string) => void;
}

const AttractionNameInput = ({ attraction, name, onNameChange, onRemove }: AttractionNameInputProps) => {
  return (
    <div className="flex items-center gap-2 p-3 border rounded-lg bg-background">
      <div className="flex-1 space-y-1">
        <Label className="text-xs text-muted-foreground">{attraction}</Label>
        <Input
          value={name}
          onChange={(e) => onNameChange(attraction, e.target.value)}
          placeholder={`Enter ${attraction.toLowerCase()} name (e.g., ${getPlaceholder(attraction)})`}
          className="h-8 text-sm"
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onRemove(attraction)}
        className="h-8 w-8 text-destructive hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

const getPlaceholder = (attraction: string): string => {
  const placeholders: Record<string, string> = {
    "Library": "Kenya National Library",
    "Museum": "National Museum of Kenya",
    "Game Park/Reserve": "Nairobi National Park",
    "Police Station": "Central Police Station",
    "Fire Station": "Nairobi Fire Station",
    "Hospital/Clinic": "Kenyatta National Hospital",
    "University": "University of Nairobi",
    "River/Lake": "Lake Victoria",
    "Island": "Lamu Island",
    "Mountain": "Mount Kenya",
    "Airport": "JKIA",
    "Port": "Mombasa Port",
    "Railway Station": "Nairobi SGR Terminus",
    "Forest": "Karura Forest",
    "Shopping Mall": "Two Rivers Mall",
    "Beach": "Diani Beach",
    "National Park": "Maasai Mara",
    "Cultural Center": "Bomas of Kenya",
    "Sports Stadium": "Moi International Sports Centre",
    "Convention Center": "KICC",
  };
  return placeholders[attraction] || `Name of ${attraction.toLowerCase()}`;
};

export default AttractionNameInput;
