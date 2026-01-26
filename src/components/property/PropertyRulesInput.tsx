import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, AlertCircle } from "lucide-react";

interface PropertyRulesInputProps {
  rules: string[];
  onRulesChange: (rules: string[]) => void;
}

const SUGGESTED_RULES = [
  "No smoking inside the property",
  "No pets allowed",
  "Quiet hours from 10 PM to 7 AM",
  "No parties or events",
  "Check-in after 2 PM, Check-out by 10 AM",
  "Valid ID required at check-in",
  "Children must be supervised at all times",
  "No outside food in dining areas",
  "Pool use at own risk",
  "Maximum occupancy must not be exceeded",
];

const PropertyRulesInput = ({ rules, onRulesChange }: PropertyRulesInputProps) => {
  const [newRule, setNewRule] = useState("");

  const addRule = (rule: string) => {
    if (rule.trim() && !rules.includes(rule.trim())) {
      onRulesChange([...rules, rule.trim()]);
    }
    setNewRule("");
  };

  const removeRule = (index: number) => {
    onRulesChange(rules.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addRule(newRule);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-orange-500" />
        <Label className="font-semibold">Property Rules & Regulations</Label>
      </div>

      <p className="text-xs text-muted-foreground">
        Define your property rules. Guests will see these before booking.
      </p>

      {/* Current Rules */}
      {rules.length > 0 && (
        <div className="space-y-2">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-background rounded border">
              <span className="flex-1 text-sm">{rule}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeRule(index)}
                className="h-6 w-6 text-destructive hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add Custom Rule */}
      <div className="flex gap-2">
        <Input
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a custom rule..."
          className="flex-1 h-9"
        />
        <Button
          type="button"
          size="sm"
          onClick={() => addRule(newRule)}
          disabled={!newRule.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Suggested Rules */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Quick Add (click to add):</Label>
        <div className="flex flex-wrap gap-1">
          {SUGGESTED_RULES.filter(r => !rules.includes(r)).slice(0, 6).map((rule) => (
            <Button
              key={rule}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addRule(rule)}
              className="text-xs h-7"
            >
              + {rule.length > 30 ? rule.slice(0, 30) + "..." : rule}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyRulesInput;
