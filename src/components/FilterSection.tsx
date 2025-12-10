import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";

interface FilterSectionProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  propertyTypes: string[];
  amenities: string[];
}

const FilterSection = ({ onFilterChange }: FilterSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 250000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const propertyTypes = ["Hotel", "Apartment", "House", "Villa", "Guesthouse", "Hostel"];
  const amenities = ["WiFi", "Pool", "Parking", "Restaurant", "Gym"];

  const handleTypeChange = (type: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type);
    setSelectedTypes(updated);
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedAmenities, amenity]
      : selectedAmenities.filter(a => a !== amenity);
    setSelectedAmenities(updated);
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    
    if (selectedTypes.length > 0) {
      params.set("types", selectedTypes.join(","));
    } else {
      params.delete("types");
    }
    
    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join(","));
    } else {
      params.delete("amenities");
    }
    
    setSearchParams(params);
    
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        propertyTypes: selectedTypes,
        amenities: selectedAmenities,
      });
    }
  };

  const clearFilters = () => {
    setPriceRange([500, 250000]);
    setSelectedTypes([]);
    setSelectedAmenities([]);
    
    const params = new URLSearchParams(searchParams);
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("types");
    params.delete("amenities");
    setSearchParams(params);
    
    if (onFilterChange) {
      onFilterChange({
        priceRange: [500, 250000],
        propertyTypes: [],
        amenities: [],
      });
    }
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Price Range (per night)</Label>
          <Slider 
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={500000} 
            min={500}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>KES {priceRange[0].toLocaleString()}</span>
            <span>KES {priceRange[1].toLocaleString()}+</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Property Type</Label>
          <div className="space-y-2">
            {propertyTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox 
                  id={type} 
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                />
                <label
                  htmlFor={type}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Amenities</Label>
          <div className="space-y-2">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox 
                  id={amenity} 
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <label
                  htmlFor={amenity}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full" variant="default" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button className="w-full" variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSection;
