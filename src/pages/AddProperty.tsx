import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Upload, X, MapPin, Car } from "lucide-react";
import { z } from "zod";
import { KENYA_COUNTIES } from "@/data/kenyaLocations";
import { useLanguage } from "@/contexts/LanguageContext";
import { NEARBY_ATTRACTIONS, TRANSPORT_MODES, IMAGE_LABELS, PROPERTY_TYPES } from "@/data/propertyOptions";

const propertySchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().trim().min(20, "Description must be at least 20 characters").max(2000),
  location: z.string().trim().min(3, "Location is required").max(100),
  address: z.string().trim().min(5, "Address is required").max(200),
  property_type: z.enum(["hotel", "apartment", "house", "villa", "guesthouse", "airbnb", "rental", "resort", "motel", "restaurant"]),
  price_per_night: z.number().min(1, "Price must be at least 1"),
  max_guests: z.number().min(1, "Must accommodate at least 1 guest").max(50),
  bedrooms: z.number().min(0).max(50),
  bathrooms: z.number().min(1, "Must have at least 1 bathroom").max(50),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
});

type PropertyFormData = z.infer<typeof propertySchema>;

const AMENITIES_LIST = [
  "WiFi", "Parking", "Air Conditioning", "Kitchen", "TV", "Washer", 
  "Pool", "Hot Water", "Gym", "Security", "Backup Generator", "Garden"
];

const FOOD_TYPES_LIST = [
  "Continental", "African", "Indian", "Chinese", "Italian", "Fast Food",
  "Vegetarian", "Vegan", "Halal", "Seafood", "BBQ", "Breakfast Buffet"
];

const SERVICES_LIST = [
  "Room Service", "Laundry", "Airport Shuttle", "Spa & Massage", "Conference Room",
  "Tour Desk", "24hr Reception", "Currency Exchange", "Childcare", "Car Rental",
  "Free Breakfast", "Bar & Lounge", "Restaurant", "Business Center", "Concierge"
];

const PROPERTY_CATEGORIES = [
  { value: "luxury", label: "category.luxury" },
  { value: "budget", label: "category.budget" },
  { value: "business", label: "category.business" },
  { value: "vacation", label: "category.vacation" },
  { value: "eco", label: "category.eco" },
  { value: "heritage", label: "category.heritage" },
];

const AddProperty = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageLabels, setImageLabels] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>("");
  const [propertyCategory, setPropertyCategory] = useState<string>("");
  const [briefHistory, setBriefHistory] = useState<string>("");
  const [nearbyAttractions, setNearbyAttractions] = useState<string>("");
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([]);
  const [selectedTransportModes, setSelectedTransportModes] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    location: "",
    address: "",
    property_type: "apartment",
    price_per_night: 0,
    max_guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in as a host to add properties",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [user, authLoading, navigate, toast]);

  useEffect(() => {
    const checkHostRole = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "host")
          .single();

        if (error && error.code !== "PGRST116") throw error;
        
        if (data) {
          setIsHost(true);
        } else {
          const { error: insertError } = await supabase
            .from("user_roles")
            .insert({ user_id: user.id, role: "host" });
          
          if (insertError) throw insertError;
          setIsHost(true);
        }
      } catch (error: any) {
        console.error("Error checking host role:", error);
        toast({
          title: "Error",
          description: "Failed to verify host status. Please try again.",
          variant: "destructive",
        });
      } finally {
        setCheckingRole(false);
      }
    };

    if (user) {
      checkHostRole();
    }
  }, [user, toast]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + imageFiles.length > 10) {
      toast({
        title: "Too many images",
        description: "You can upload maximum 10 images",
        variant: "destructive",
      });
      return;
    }

    setImageFiles(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImageLabels(prev => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const toggleFoodType = (food: string) => {
    setSelectedFoodTypes(prev => 
      prev.includes(food) 
        ? prev.filter(f => f !== food)
        : [...prev, food]
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const toggleAttraction = (attraction: string) => {
    setSelectedAttractions(prev => 
      prev.includes(attraction) 
        ? prev.filter(a => a !== attraction)
        : [...prev, attraction]
    );
  };

  const toggleTransportMode = (mode: string) => {
    setSelectedTransportModes(prev => 
      prev.includes(mode) 
        ? prev.filter(m => m !== mode)
        : [...prev, mode]
    );
  };

  const updateImageLabel = (index: number, label: string) => {
    setImageLabels(prev => {
      const updated = [...prev];
      updated[index] = label;
      return updated;
    });
  };

  const uploadImages = async (propertyId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user!.id}/${propertyId}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);
      
      uploadedUrls.push(publicUrl);
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setLoading(true);

      // Build full description with additional info
      let fullDescription = formData.description;
      if (propertyCategory) {
        fullDescription = `[Category: ${propertyCategory}]\n\n${fullDescription}`;
      }
      if (briefHistory) {
        fullDescription += `\n\n**History:** ${briefHistory}`;
      }
      if (nearbyAttractions) {
        fullDescription += `\n\n**Nearby:** ${nearbyAttractions}`;
      }

      const validatedData = propertySchema.parse({
        ...formData,
        description: fullDescription,
        amenities: selectedAmenities,
      });

      if (imageFiles.length === 0) {
        toast({
          title: "Images Required",
          description: "Please upload at least one property image",
          variant: "destructive",
        });
        return;
      }

      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .insert({
          host_id: user.id,
          title: validatedData.title,
          description: validatedData.description,
          location: validatedData.location,
          address: validatedData.address,
          property_type: validatedData.property_type,
          price_per_night: validatedData.price_per_night,
          max_guests: validatedData.max_guests,
          bedrooms: validatedData.bedrooms,
          bathrooms: validatedData.bathrooms,
          amenities: validatedData.amenities,
          food_types: selectedFoodTypes,
          services: selectedServices,
          nearby_attractions: selectedAttractions,
          transport_modes: selectedTransportModes,
          image_labels: imageLabels,
          images: [],
        })
        .select()
        .single();

      if (propertyError) throw propertyError;

      const imageUrls = await uploadImages(property.id);

      const { error: updateError } = await supabase
        .from("properties")
        .update({ images: imageUrls })
        .eq("id", property.id);

      if (updateError) throw updateError;

      toast({
        title: t("common.success"),
        description: "Your property has been submitted for review. You'll be notified once it's approved.",
      });

      navigate("/");
    } catch (error: any) {
      console.error("Error creating property:", error);
      
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t("common.error"),
          description: error.message || "Failed to create property. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || checkingRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isHost) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{t("nav.listProperty")}</CardTitle>
            <CardDescription>
              Fill in the details below to list your property on McDone. Your listing will be reviewed before going live.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t("property.title")} *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Beautiful 2BR Apartment in Westlands"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">{t("property.category")} *</Label>
                  <Select value={propertyCategory} onValueChange={setPropertyCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {PROPERTY_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {t(cat.label)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property_type">{t("property.type")} *</Label>
                  <Select
                    value={formData.property_type}
                    onValueChange={(value: any) => setFormData({ ...formData, property_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("property.description")} *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your property, its features, and what makes it special..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="history">{t("property.history")}</Label>
                <Textarea
                  id="history"
                  value={briefHistory}
                  onChange={(e) => setBriefHistory(e.target.value)}
                  placeholder="Share any interesting history about this property..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attractions">{t("property.nearbyAttractions")} (Additional notes)</Label>
                <Textarea
                  id="attractions"
                  value={nearbyAttractions}
                  onChange={(e) => setNearbyAttractions(e.target.value)}
                  placeholder="e.g., 5 min walk to Uhuru Park, Near Moi Avenue, Close to KICC..."
                  rows={2}
                />
              </div>

              {/* Nearby Attractions Selection */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Nearby Attractions (Select all that apply)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {NEARBY_ATTRACTIONS.map((attraction) => (
                    <Button
                      key={attraction}
                      type="button"
                      variant={selectedAttractions.includes(attraction) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleAttraction(attraction)}
                      className="justify-start text-xs"
                    >
                      {attraction}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Transport Modes Selection */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Available Transport Modes
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {TRANSPORT_MODES.map((mode) => (
                    <Button
                      key={mode}
                      type="button"
                      variant={selectedTransportModes.includes(mode) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTransportMode(mode)}
                      className="justify-start text-xs"
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="county">{t("property.county")} *</Label>
                  <Select 
                    value={selectedCounty} 
                    onValueChange={(value) => {
                      setSelectedCounty(value);
                      setSelectedSubCounty("");
                      setFormData({ ...formData, location: value });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] bg-popover z-50">
                      <SelectGroup>
                        {KENYA_COUNTIES.map((county) => (
                          <SelectItem key={county.name} value={county.name}>
                            {county.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcounty">{t("property.subcounty")} {selectedCounty && "*"}</Label>
                  <Select 
                    value={selectedSubCounty} 
                    onValueChange={(value) => {
                      setSelectedSubCounty(value);
                      setFormData({ ...formData, location: `${value}, ${selectedCounty}` });
                    }}
                    disabled={!selectedCounty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedCounty ? "Select sub-county" : "Select county first"} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] bg-popover z-50">
                      <SelectGroup>
                        {KENYA_COUNTIES.find(c => c.name === selectedCounty)?.subCounties.map((subCounty) => (
                          <SelectItem key={subCounty} value={subCounty}>
                            {subCounty}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t("property.address")} *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">{t("property.price")} *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    value={formData.price_per_night || ""}
                    onChange={(e) => setFormData({ ...formData, price_per_night: Number(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">{t("property.guests")} *</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    value={formData.max_guests}
                    onChange={(e) => setFormData({ ...formData, max_guests: Number(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">{t("property.bedrooms")} *</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="0"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">{t("property.bathrooms")} *</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("property.amenities")} * (Select at least one)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {AMENITIES_LIST.map((amenity) => (
                    <Button
                      key={amenity}
                      type="button"
                      variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleAmenity(amenity)}
                      className="justify-start"
                    >
                      {amenity}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("property.services")} (Optional)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {SERVICES_LIST.map((service) => (
                    <Button
                      key={service}
                      type="button"
                      variant={selectedServices.includes(service) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleService(service)}
                      className="justify-start"
                    >
                      {service}
                    </Button>
                  ))}
                </div>
              </div>

              {(formData.property_type === "hotel" || formData.property_type === "guesthouse") && (
                <div className="space-y-2">
                  <Label>{t("property.foodTypes")} (Optional - for hotels/restaurants)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {FOOD_TYPES_LIST.map((food) => (
                      <Button
                        key={food}
                        type="button"
                        variant={selectedFoodTypes.includes(food) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFoodType(food)}
                        className="justify-start"
                      >
                        {food}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>{t("property.images")} * (Max 10 - Label each room/area)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload images (Bedroom, Kitchen, Dining, Parking, etc.)
                    </p>
                  </label>
                </div>
                
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative space-y-2">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Select
                          value={imageLabels[index] || ""}
                          onValueChange={(value) => updateImageLabel(index, value)}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select room/area" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover z-50">
                            {IMAGE_LABELS.map((label) => (
                              <SelectItem key={label} value={label} className="text-xs">
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("property.submit")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  disabled={loading}
                >
                  {t("property.cancel")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AddProperty;
