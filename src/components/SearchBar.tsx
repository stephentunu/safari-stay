import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Calendar, Users, Search, Building, DollarSign, SlidersHorizontal } from "lucide-react";
import { KENYA_COUNTIES } from "@/data/kenyaLocations";
import { PROPERTY_TYPES } from "@/data/propertyOptions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onSearch?: (params: URLSearchParams) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps = {}) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const selectedCountyData = KENYA_COUNTIES.find(c => c.name === selectedCounty);

  const activeFilterCount = [selectedCounty, propertyType, checkInDate, checkOutDate, maxPrice, guests].filter(Boolean).length;

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

    setFiltersOpen(false);

    if (onSearch) {
      onSearch(params);
    } else {
      navigate(`/search?${params.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Compact search row */}
      <div className="flex items-center gap-2 bg-card/95 backdrop-blur-md rounded-full shadow-2xl px-3 py-2 border-2 border-primary/30 ring-1 ring-primary/10">
        <Search className="h-5 w-5 text-primary shrink-0 ml-2" />
        <Input
          type="text"
          placeholder="Search by name, location or price range"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-0 p-0 h-auto focus-visible:ring-0 font-semibold bg-transparent text-base placeholder:text-muted-foreground/70 flex-1"
        />

        {/* Filters dropdown trigger */}
        <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="rounded-full gap-1.5 text-muted-foreground hover:text-primary relative">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 sm:w-96 p-4" align="end" sideOffset={8}>
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-primary">Search Filters</h4>

              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent shrink-0" />
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-bold text-primary uppercase tracking-wide">Location</label>
                  <Select value={selectedCounty} onValueChange={(value) => { setSelectedCounty(value); setSelectedSubCounty(""); }}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="County" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectGroup>
                        {KENYA_COUNTIES.map((county) => (
                          <SelectItem key={county.name} value={county.name}>{county.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {selectedCounty && (
                    <Select value={selectedSubCounty} onValueChange={setSelectedSubCounty}>
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Sub-county" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        <SelectGroup>
                          {selectedCountyData?.subCounties.map((sc) => (
                            <SelectItem key={sc} value={sc}>{sc}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Property Type */}
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-accent shrink-0" />
                <div className="flex-1">
                  <label className="text-xs font-bold text-primary uppercase tracking-wide">Type</label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {PROPERTY_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dates row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent shrink-0" />
                  <div className="flex-1">
                    <label className="text-xs font-bold text-primary uppercase tracking-wide">Check-in</label>
                    <Input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="h-8 text-sm" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent shrink-0" />
                  <div className="flex-1">
                    <label className="text-xs font-bold text-primary uppercase tracking-wide">Check-out</label>
                    <Input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate} className="h-8 text-sm" />
                  </div>
                </div>
              </div>

              {/* Price & Guests row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-accent shrink-0" />
                  <div className="flex-1">
                    <label className="text-xs font-bold text-primary uppercase tracking-wide">Max Price</label>
                    <Input type="number" placeholder="KES" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="h-8 text-sm" min="0" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent shrink-0" />
                  <div className="flex-1">
                    <label className="text-xs font-bold text-primary uppercase tracking-wide">Guests</label>
                    <Input type="number" placeholder="Add" value={guests} onChange={(e) => setGuests(e.target.value)} className="h-8 text-sm" min="1" />
                  </div>
                </div>
              </div>

              {/* Search button inside dropdown */}
              <Button className="w-full rounded-lg font-bold" variant="accent" onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Main search button */}
        <Button size="sm" variant="accent" className="rounded-full px-5 shadow-lg font-bold" onClick={handleSearch}>
          <Search className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
