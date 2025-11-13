import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { KENYA_COUNTIES } from "@/data/kenyaLocations";
import { useState } from "react";

const SearchBar = () => {
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>("");

  const selectedCountyData = KENYA_COUNTIES.find(c => c.name === selectedCounty);

  return (
    <div className="bg-card rounded-xl shadow-xl p-2 w-full max-w-4xl mx-auto border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors">
          <MapPin className="h-5 w-5 text-primary" />
          <div className="flex-1 space-y-2">
            <label className="text-xs font-medium text-muted-foreground">County</label>
            <Select value={selectedCounty} onValueChange={(value) => {
              setSelectedCounty(value);
              setSelectedSubCounty("");
            }}>
              <SelectTrigger className="border-0 p-0 h-auto focus:ring-0 font-medium">
                <SelectValue placeholder="Select county" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectGroup>
                  {KENYA_COUNTIES.map((county) => (
                    <SelectItem key={county.name} value={county.name}>
                      {county.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedCounty && (
              <>
                <label className="text-xs font-medium text-muted-foreground">Sub-County</label>
                <Select value={selectedSubCounty} onValueChange={setSelectedSubCounty}>
                  <SelectTrigger className="border-0 p-0 h-auto focus:ring-0 font-medium">
                    <SelectValue placeholder="Select sub-county" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    <SelectGroup>
                      {selectedCountyData?.subCounties.map((subCounty) => (
                        <SelectItem key={subCounty} value={subCounty}>
                          {subCounty}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
          <Calendar className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground">Check-in</label>
            <Input 
              type="date" 
              className="border-0 p-0 h-auto focus-visible:ring-0 font-medium"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
          <Calendar className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground">Check-out</label>
            <Input 
              type="date" 
              className="border-0 p-0 h-auto focus-visible:ring-0 font-medium"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-3">
          <Users className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground">Guests</label>
            <Input 
              type="number" 
              placeholder="Add guests" 
              className="border-0 p-0 h-auto focus-visible:ring-0 font-medium"
              min="1"
            />
          </div>
          <Button size="icon" variant="accent" className="rounded-lg ml-2">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
