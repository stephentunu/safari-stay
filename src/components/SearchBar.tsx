import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Users, Search, Building, DollarSign } from "lucide-react";
import { KENYA_COUNTIES } from "@/data/kenyaLocations";
import { PROPERTY_TYPES } from "@/data/propertyOptions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const selectedCountyData = KENYA_COUNTIES.find(c => c.name === selectedCounty);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (keyword) params.append("keyword", keyword);
    const location = selectedSubCounty || selectedCounty;
    if (location) params.append("location", location);
    if (propertyType) params.append("types", propertyType);
    if (checkInDate) params.append("checkIn", checkInDate);
    if (checkOutDate) params.append("checkOut", checkOutDate);
    if (guests) params.append("guests", guests);
    if (maxPrice) params.append("maxPrice", maxPrice);

    navigate(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 w-full max-w-6xl mx-auto border-2 border-primary/30 ring-1 ring-primary/10">
      {/* Row 1: Keyword search */}
      <div className="flex items-center gap-3 px-5 py-4 mb-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <Search className="h-6 w-6 text-primary shrink-0" />
        <Input
          type="text"
          placeholder="Search by property name, keyword, or description..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-0 p-0 h-auto focus-visible:ring-0 font-semibold bg-transparent text-lg placeholder:text-muted-foreground/70"
        />
      </div>

      {/* Row 2: Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* County & Sub-County */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors border border-border/50">
          <MapPin className="h-5 w-5 text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-xs font-bold text-primary uppercase tracking-wide">Location</label>
            <Select value={selectedCounty} onValueChange={(value) => {
              setSelectedCounty(value);
              setSelectedSubCounty("");
            }}>
              <SelectTrigger className="border-0 p-0 h-auto focus:ring-0 font-medium text-sm">
                <SelectValue placeholder="County" />
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
              <Select value={selectedSubCounty} onValueChange={setSelectedSubCounty}>
                <SelectTrigger className="border-0 p-0 h-auto focus:ring-0 font-medium text-sm mt-1">
                  <SelectValue placeholder="Sub-county" />
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
            )}
          </div>
        </div>

        {/* Property Type */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors border border-border/50">
          <Building className="h-5 w-5 text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-xs font-bold text-primary uppercase tracking-wide">Type</label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="border-0 p-0 h-auto focus:ring-0 font-medium text-sm">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Check-in */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors border border-border/50">
          <Calendar className="h-5 w-5 text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-xs font-bold text-primary uppercase tracking-wide">Check-in</label>
            <Input 
              type="date" 
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="border-0 p-0 h-auto focus-visible:ring-0 font-medium text-sm"
            />
          </div>
        </div>
        
        {/* Check-out */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors border border-border/50">
          <Calendar className="h-5 w-5 text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-xs font-bold text-primary uppercase tracking-wide">Check-out</label>
            <Input 
              type="date" 
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={checkInDate}
              className="border-0 p-0 h-auto focus-visible:ring-0 font-medium text-sm"
            />
          </div>
        </div>

        {/* Max Price */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 transition-colors border border-border/50">
          <DollarSign className="h-5 w-5 text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-xs font-bold text-primary uppercase tracking-wide">Max Price</label>
            <Input 
              type="number" 
              placeholder="KES"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 p-0 h-auto focus-visible:ring-0 font-medium text-sm"
              min="0"
            />
          </div>
        </div>
        
        {/* Guests + Search Button */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/40 border border-border/50">
          <Users className="h-5 w-5 text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="text-xs font-bold text-primary uppercase tracking-wide">Guests</label>
            <Input 
              type="number" 
              placeholder="Add"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 p-0 h-auto focus-visible:ring-0 font-medium text-sm"
              min="1"
            />
          </div>
          <Button size="lg" variant="accent" className="rounded-xl ml-2 shrink-0 px-6 shadow-lg hover:shadow-xl text-base font-bold" onClick={handleSearch}>
            <Search className="h-5 w-5 mr-1" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
